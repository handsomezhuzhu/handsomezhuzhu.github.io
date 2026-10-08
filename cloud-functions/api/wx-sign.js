/**
 * 微信 JS-SDK 签名接口
 *
 * 路由：cloud-functions/api/wx-sign.js  →  https://<你的域名>/api/wx-sign?url=<页面地址>
 *
 * 做的事就是教程里 Java 后端的活：
 *   1. 拿 access_token（有效期 7200s，本文件内缓存，提前 10 分钟刷新）
 *   2. 拿 jsapi_ticket（同样缓存）
 *   3. sha1(jsapi_ticket + noncestr + timestamp + url) 算出 signature
 *
 * 环境变量（EdgeOne Makers 控制台 → 项目设置 → 环境变量）：
 *   WX_SIGN_API       推荐。固定 IP 签名服务的地址，如 http://47.94.166.28:3000/<口令>
 *                     设置后整段签名都委托给它，本文件不再需要 AppID/AppSecret
 *   WX_APPID          公众号 AppID（不配 WX_SIGN_API 时必填）
 *   WX_APPSECRET      公众号 AppSecret（不配 WX_SIGN_API 时必填）
 *   WX_API_BASE       可选。微信 API 代理地址，用于解决"出口 IP 不固定、无法加白名单"的问题
 *   WX_ALLOWED_HOSTS  可选。额外允许签名的域名，逗号分隔。默认只允许接口自己所在的域名
 */
import { createHash, randomUUID } from 'node:crypto'

const WX_DEFAULT_API = 'https://api.weixin.qq.com/cgi-bin'
// 官方有效期 7200s，这里提前 10 分钟刷新，避免临界点拿到已失效的票据
const CACHE_TTL = 6600 * 1000
const DEFAULT_ALLOWED_HOSTS = ['zhuzihan.com', 'handsomezhu.me', 'localhost', '127.0.0.1']
// 模块级缓存：同一个函数实例内的多次请求共享（替代教程里的 Redis）
let tokenCache = { value: '', expiresAt: 0 }
let ticketCache = { value: '', expiresAt: 0 }

/** 微信接口返回的错误码，40164 表示调用方 IP 不在公众号白名单里 */
class WxApiError extends Error {
  constructor(errcode, errmsg) {
    super(errmsg || `微信接口错误 ${errcode}`)
    this.name = 'WxApiError'
    this.errcode = errcode
    this.errmsg = errmsg || ''
  }

  /** 从 "invalid ip 1.2.3.4 not in whitelist" 里把 IP 抠出来，方便直接复制去加白 */
  get ip() {
    const matched = /invalid ip ([\d.:a-fA-F]+)/.exec(this.errmsg)
    return matched ? matched[1] : undefined
  }
}

function readConfig(context) {
  const env = { ...(process.env || {}), ...(context?.env || {}) }

  // 默认只允许「接口自己所在的域名」被签名，海外站（Vercel）因此无需额外配置；
  // 需要给其它域名签时再用 WX_ALLOWED_HOSTS 追加
  const requestHost = safeHost(context?.request?.url)
  const extraHosts = (env.WX_ALLOWED_HOSTS || '')
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean)
  const allowedHosts = [...new Set([...DEFAULT_ALLOWED_HOSTS, ...extraHosts, requestHost])].filter(Boolean)

  return {
    appId: env.WX_APPID || '',
    appSecret: env.WX_APPSECRET || '',
    signApi: (env.WX_SIGN_API || '').replace(/\/+$/, ''),
    apiBase: (env.WX_API_BASE || WX_DEFAULT_API).replace(/\/+$/, ''),
    allowedHosts
  }
}

/** 取出请求 URL 的 host，失败时返回空串 */
function safeHost(requestUrl) {
  try {
    return new URL(requestUrl).host.toLowerCase()
  } catch {
    return ''
  }
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      // 签名结果有时效性，绝不能被 CDN / 浏览器缓存
      'Cache-Control': 'no-store'
    }
  })
}

async function callWxApi(apiBase, path) {
  let response
  try {
    response = await fetch(apiBase + path)
  } catch (error) {
    throw new WxApiError(-1, `请求微信接口失败：${error?.message || error}`)
  }
  const data = await response.json().catch(() => ({}))
  if (data.errcode) {
    throw new WxApiError(data.errcode, data.errmsg)
  }
  return data
}

async function getAccessToken(config) {
  if (tokenCache.value && Date.now() < tokenCache.expiresAt) {
    return tokenCache.value
  }
  const data = await callWxApi(
    config.apiBase,
    `/token?grant_type=client_credential&appid=${encodeURIComponent(config.appId)}&secret=${encodeURIComponent(config.appSecret)}`
  )
  tokenCache = { value: data.access_token, expiresAt: Date.now() + CACHE_TTL }
  return tokenCache.value
}

async function getJsapiTicket(config) {
  if (ticketCache.value && Date.now() < ticketCache.expiresAt) {
    return ticketCache.value
  }
  const accessToken = await getAccessToken(config)
  const data = await callWxApi(
    config.apiBase,
    `/ticket/getticket?access_token=${encodeURIComponent(accessToken)}&type=jsapi`
  )
  ticketCache = { value: data.ticket, expiresAt: Date.now() + CACHE_TTL }
  return ticketCache.value
}

/** 签名算法：所有参数名小写、按 ASCII 排序后拼成 key=value&...，整体 sha1 */
function createSignature(jsapiTicket, url) {
  const nonceStr = randomUUID().replace(/-/g, '').slice(0, 32)
  const timestamp = String(Math.floor(Date.now() / 1000))
  const raw = `jsapi_ticket=${jsapiTicket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
  return {
    nonceStr,
    timestamp,
    signature: createHash('sha1').update(raw, 'utf8').digest('hex')
  }
}

/** 页面 URL 必须和微信里 location.href 完全一致（不含 # 及之后的部分） */
function normalizeUrl(rawUrl) {
  return String(rawUrl).split('#')[0]
}

async function handleRequest(context) {
  const config = readConfig(context)

  const rawUrl = new URL(context.request.url).searchParams.get('url') || ''
  if (!rawUrl) {
    return json({ code: 400, message: '缺少 url 参数' }, 400)
  }

  let pageUrl
  try {
    pageUrl = new URL(normalizeUrl(rawUrl))
  } catch {
    return json({ code: 400, message: 'url 参数不是合法的 http(s) 地址' }, 400)
  }

  if (pageUrl.protocol !== 'http:' && pageUrl.protocol !== 'https:') {
    return json({ code: 400, message: '只支持 http / https 协议' }, 400)
  }

  // 防止别人拿你的公众号去给任意域名签签名
  if (!config.allowedHosts.includes(pageUrl.hostname.toLowerCase())) {
    return json(
      { code: 403, message: `域名 ${pageUrl.hostname} 不在允许列表，可通过 WX_ALLOWED_HOSTS 添加` },
      403
    )
  }

  // 配了 WX_SIGN_API 就整段委托给固定 IP 的签名服务，本函数不再接触 AppSecret
  if (config.signApi) {
    try {
      const response = await fetch(`${config.signApi}/sign?url=${encodeURIComponent(pageUrl.toString())}`)
      const data = await response.json().catch(() => ({}))
      return json(data, response.status)
    } catch (error) {
      return json(
        { code: -1, message: `签名服务(${config.signApi})请求失败：${error?.message || error}` },
        502
      )
    }
  }

  if (!config.appId || !config.appSecret) {
    return json(
      { code: -1, message: '未配置 WX_SIGN_API，也未配置 WX_APPID / WX_APPSECRET 环境变量' },
      500
    )
  }

  try {
    const jsapiTicket = await getJsapiTicket(config)
    const signed = createSignature(jsapiTicket, pageUrl.toString())
    return json({ appId: config.appId, ...signed })
  } catch (error) {
    if (error instanceof WxApiError && error.errcode === 40164) {
      return json(
        {
          code: 40164,
          message: '调用微信接口的服务器 IP 不在公众号白名单中',
          ip: error.ip,
          hint: error.ip
            ? `请把 IP ${error.ip} 添加到公众号后台「开发 - 基本配置 - IP白名单」；若出口 IP 不固定，请配置 WX_API_BASE 指向一台有固定 IP 的代理`
            : '请检查公众号后台的 IP 白名单配置'
        },
        403
      )
    }
    return json(
      { code: error?.errcode ?? -1, message: error?.message || '签名失败' },
      502
    )
  }
}

export function onRequestGet(context) {
  return handleRequest(context)
}

export function onRequestPost(context) {
  return handleRequest(context)
}
