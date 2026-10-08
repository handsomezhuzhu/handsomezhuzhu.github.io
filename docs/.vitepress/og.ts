import type { HeadConfig, TransformContext } from 'vitepress'

/**
 * 站点 origin，用于把相对路径补成微信抓取器要求的绝对 URL。
 * 本地/其它域名部署时可用环境变量 SITE_ORIGIN 覆盖。
 */
export const SITE_ORIGIN = (process.env.SITE_ORIGIN || 'https://zhuzihan.com').replace(/\/+$/, '')

export const SITE_NAME = 'SIMON BLOG'

/** 没有封面图时使用的默认分享图（880x880，满足微信 ≥300x300 的要求） */
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/logo.jpg`

const IMG_SRC_RE = /<img\b[^>]*?\ssrc=["']([^"']+)["']/gi
const HEADING_RE = /<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi
const TAG_RE = /<[^>]+>/g
const IMAGE_EXT_RE = /\.(png|jpe?g|gif|webp|avif|svg|bmp)(\?.*)?$/i

/** 把站内相对路径补成绝对地址，已带协议的图片原样返回 */
export function toAbsoluteUrl(path: string): string {
  if (/^([a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) {
    return path
  }
  return SITE_ORIGIN + (path.startsWith('/') ? path : `/${path}`)
}

/** 去掉 HTML 标签 / Markdown 语法，压平空白 */
export function normalizeText(input: unknown, maxLength = 120): string {
  if (typeof input !== 'string') {
    return ''
  }
  let text = input
    .replace(HEADING_RE, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(TAG_RE, ' ')
    .replace(/[*_`>#~|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length > maxLength) {
    text = `${text.slice(0, maxLength - 1)}…`
  }
  return text
}

/** 从渲染后的 HTML 里取第一张正文图片作为封面 */
export function firstImageFromHtml(html: string): string | undefined {
  if (!html) {
    return undefined
  }
  IMG_SRC_RE.lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = IMG_SRC_RE.exec(html))) {
    const src = match[1]?.trim()
    if (src && !src.startsWith('data:')) {
      return src
    }
  }
  return undefined
}

/** 封面图优先级：frontmatter.cover > 正文首图 > 站点默认图 */
export function pickShareImage(frontmatter: any, content: string): string {
  const candidates: string[] = []
  const cover = frontmatter?.cover

  if (typeof cover === 'string') {
    candidates.push(cover)
  } else if (Array.isArray(cover) && typeof cover[0] === 'string') {
    candidates.push(cover[0])
  } else if (cover && typeof cover === 'object' && typeof cover.urls?.[0] === 'string') {
    candidates.push(cover.urls[0])
  }

  const firstImage = firstImageFromHtml(content)
  if (firstImage) {
    candidates.push(firstImage)
  }

  for (const candidate of candidates) {
    // 过滤掉模板里遗留的 `cover: url` 之类的占位值
    if (!IMAGE_EXT_RE.test(candidate)) {
      continue
    }
    const absolute = toAbsoluteUrl(candidate)
    if (/^https?:\/\//i.test(absolute)) {
      return absolute
    }
  }
  return DEFAULT_OG_IMAGE
}

/** `sop/essay/fanghua.md` -> `sop/essay/fanghua.html`，`index.md` -> `` */
function pageToUrlPath(page: string): string {
  return page.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '.html')
}

/**
 * transformHead 拿到的 content 是整页 SSR HTML（含导航、侧栏、友链头像等），
 * 这里截取 <main> 正文区域，避免把站点框架里的图片/文字当成文章内容。
 */
export function extractMainContent(html: string): string {
  if (!html) {
    return ''
  }
  const match = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)
  return match ? match[0] : html
}

/**
 * 为每个页面生成 Open Graph / Twitter Card 标签。
 * 微信、QQ、Telegram、Twitter 等抓取链接时读这些标签渲染分享卡片。
 */
export function createOpenGraphTags(ctx: TransformContext): HeadConfig[] {
  const { page, pageData, description, content } = ctx
  const frontmatter: any = pageData.frontmatter || {}

  const isHome = /(^|\/)index\.md$/.test(page)
  // 首页 / 404 的 content 是整页布局（含导航、友链头像等），不能用来提取描述和封面
  const isSpecialPage = isHome || page === '404.md'
  const url = toAbsoluteUrl(`/${pageToUrlPath(page)}`)

  const title =
    normalizeText(frontmatter.title, 200) ||
    normalizeText(pageData.title, 200) ||
    SITE_NAME

  // 只从正文区域提取描述和封面
  const mainContent = isSpecialPage ? '' : extractMainContent(content)

  const desc =
    normalizeText(frontmatter.description) ||
    normalizeText(frontmatter.descriptionHTML) ||
    normalizeText(mainContent) ||
    normalizeText(description)

  const image = pickShareImage(frontmatter, mainContent)

  const tags: HeadConfig[] = [
    ['meta', { property: 'og:type', content: isHome ? 'website' : 'article' }],
    ['meta', { property: 'og:site_name', content: SITE_NAME }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: desc }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: desc }],
    ['meta', { name: 'twitter:image', content: image }]
  ]

  if (typeof frontmatter.date === 'string' || frontmatter.date instanceof Date) {
    tags.push([
      'meta',
      { property: 'article:published_time', content: new Date(frontmatter.date).toISOString() }
    ])
  }

  return tags
}
