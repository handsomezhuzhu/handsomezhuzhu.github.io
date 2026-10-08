/**
 * 微信 JS-SDK 签名接口（Vercel Serverless Function 版）
 *
 * 路由：api/wx-sign.js  →  https://<海外域名>/api/wx-sign?url=<页面地址>
 *
 * Vercel 对 api/ 目录是零配置识别，无需 vercel.json。
 * 环境变量在 Vercel 控制台 → Project Settings → Environment Variables 里加：
 *   WX_APPID          公众号 AppID（必填）
 *   WX_APPSECRET      公众号 AppSecret（必填）
 *   WX_API_BASE       可选。微信 API 代理地址（Vercel 出口 IP 不固定，加白名单时要用）
 *   WX_ALLOWED_HOSTS  可选。额外允许签名的域名，逗号分隔。默认只允许接口自己所在的域名
 *
 * 注意：本文件与 cloud-functions/api/wx-sign.js（EdgeOne 版）逻辑一致，
 *       只是适配了 Vercel 的 (req, res) 写法，改动时请同步两份。
 */
const { createHash, randomUUID } = require('node:crypto')

const WX_DEFAULT_API = 'https://api.weixin.qq.com/cgi-bin'
// 官方有效期 7200s，提前 10 分钟刷新，避免临界点拿到已失效的票据
const CACHE_TTL = 6600 * 1000
const DEFAULT_ALLOWED_HOSTS = ['zhuzihan.com', 'handsomezhu.me', 'localhost', '127.0.0.1']

// Lambda 实例复用时模块级变量会保留，相当于教程里的 Redis 缓存
let tokenCache = { value: '', expiresAt: 0 }
let ticketCache = { value: '', expiresAt: 0 }

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

function readConfig(requestUrl) {
  // 默认只允许「接口自己所在的域名」被签名，海外站（Vercel）因此无需额外配置；
  // 需要给其它域名签时再用 WX_ALLOWED_HOSTS 追加
  const requestHost = safeHost(requestUrl)
  const extraHosts = (process.env.WX_ALLOWED_HOSTS || '')
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean)
  const allowedHosts = [...new Set([...DEFAULT_ALLOWED_HOSTS, ...extraHosts, requestHost])].filter(Boolean)

  return {
    appId: process.env.WX_APPID || '',
    appSecret: process.env.WX_APPSECRET || '',
    apiBase: (process.env.WX_API_BASE || WX_DEFAULT_API).replace(/\/+$/, ''),
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

/** 拼出当前请求的完整地址（Vercel 里 req.url 只有路径，需要自己补 host） */
function fullRequestUrl(req) {
  const host = (req.headers && req.headers.host) || 'localhost'
  const proto = (req.headers && req.headers['x-forwarded-proto']) || 'https'
  return `${proto}://${host}${req.url || '/'}`
}

function send(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=UTF-8')
  // 签名结果有时效性，绝不能被 CDN / 浏览器缓存
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(payload))
}

async function callWxApi(apiBase, path) {
  let response
  try {
    response = await fetch(apiBase + path)
  } catch (error) {
    throw new WxApiError(-1, `请求微信接口失败：${error && error.message}`)
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

/** 签名算法：参数名全部小写、按 ASCII 排序拼成 key=value&...，整体 sha1 */
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

module.exports = async function handler(req, res) {
  const config = readConfig(fullRequestUrl(req))

  if (!config.appId || !config.appSecret) {
    return send(res, 500, {
      code: -1,
      message: '服务端未配置 WX_APPID / WX_APPSECRET 环境变量'
    })
  }

  const rawUrl = (req.query && req.query.url) || ''
  if (!rawUrl) {
    return send(res, 400, { code: 400, message: '缺少 url 参数' })
  }

  let pageUrl
  try {
    pageUrl = new URL(normalizeUrl(rawUrl))
  } catch {
    return send(res, 400, { code: 400, message: 'url 参数不是合法的 http(s) 地址' })
  }

  if (pageUrl.protocol !== 'http:' && pageUrl.protocol !== 'https:') {
    return send(res, 400, { code: 400, message: '只支持 http / https 协议' })
  }

  // 防止别人拿你的公众号去给任意域名签签名
  if (!config.allowedHosts.includes(pageUrl.hostname.toLowerCase())) {
    return send(res, 403, {
      code: 403,
      message: `域名 ${pageUrl.hostname} 不在允许列表，可通过 WX_ALLOWED_HOSTS 添加`
    })
  }

  try {
    const jsapiTicket = await getJsapiTicket(config)
    const signed = createSignature(jsapiTicket, pageUrl.toString())
    return send(res, 200, { appId: config.appId, ...signed })
  } catch (error) {
    if (error instanceof WxApiError && error.errcode === 40164) {
      return send(res, 403, {
        code: 40164,
        message: '调用微信接口的服务器 IP 不在公众号白名单中',
        ip: error.ip,
        hint: error.ip
          ? `请把 IP ${error.ip} 添加到公众号后台「开发 - 基本配置 - IP白名单」；Vercel 出口 IP 不固定，建议配置 WX_API_BASE 指向一台有固定 IP 的代理`
          : '请检查公众号后台的 IP 白名单配置'
      })
    }
    return send(res, 502, {
      code: (error && error.errcode) || -1,
      message: (error && error.message) || '签名失败'
    })
  }
}
