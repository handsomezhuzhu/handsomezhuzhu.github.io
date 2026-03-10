// 主题独有配置
import { getThemeConfig } from '@sugarat/theme/node'

// 开启RSS支持（RSS配置）
import type { Theme } from '@sugarat/theme'

const baseUrl = 'https://zhuzihan.com'
const RSS: Theme.RSSOptions = {
  title: 'SIMON BLOG',
  baseUrl,
  copyright: 'Copyright (c) 2025-present, SIMON',
  description: '同是天涯沦落人，相逢何必曾相识',
  language: 'zh-cn',
  // image: 'https://your-blog-domain.com/logo.jpg',
  // favicon: 'https://your-blog-domain.com/favicon.ico',
}

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  // 开启RSS支持
  RSS,

  // 搜索
  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
  // search: false,

  // 默认开启 markdown 图表支持（会增加一定的构建耗时）
  mermaid: true,

  // 页脚
  footer: {
    // message 字段支持配置为HTML内容，配置多条可以配置为数组
    message: '<span>联系邮箱：<a href="mailto:zhuzihan@zhuzihan.com">zhuzihan@zhuzihan.com</a></span>',
    copyright: 'MIT License | SIMON',
    version: false,
    icpRecord: {
      name: '滇ICP备2025074424号',
      link: 'https://beian.miit.gov.cn/'
    },
    securityRecord: {
      name: '滇公网安备53250402000233号',
      link: 'https://www.beian.gov.cn/portal/index.do'
    },
  },

  // 主题色修改
  themeColor: 'el-blue',

  // 文章默认作者
  author: 'SIMON',

  // 友链
  friend: [
    {
      nickname: 'NoahのBlog',
      des: '我们生来就是为了成为自己，\n而不是成为某种正确的人',
      avatar: 'Noah.jpg',
      url: 'https://blog.noah0932.top/',
    },
    {
      nickname: 'LINUX DO',
      des: '真诚、友善、团结、专业，\n共建你我引以为荣之社区。',
      avatar:
        'linuxdo.png',
      url: 'https://linux.do/',
    },
  ],

  // 公告
  //  popover: {
  //    title: '公告',
  //    body: [
  //     { type: 'text', content: '👇公众号👇---👇 微信 👇' },
  //      {
  //        type: 'image',
  //        src: 'https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210~fmt.webp'
  //      },
  //     {
  //        type: 'text',
  //        content: '欢迎大家加群&私信交流'
  //      },
  //      {
  //        type: 'text',
  //        content: '文章首/文尾有群二维码',
  //        style: 'padding-top:0'
  //      },
  //      {
  //      type: 'button',
  //      content: '作者博客',
  //      link: 'https://sugarat.top'
  //    },
  //    {
  //      type: 'button',
  //      content: '加群交流',
  //      props: {
  //        type: 'success'
  //      },
  //      link: 'https://theme.sugarat.top/group.html',
  //    }
  //  ],
  //  duration: 0
  //},

  comment: {
    type: 'giscus',
    options: {
      repo: 'handsomezhuzhu/handsomezhuzhu.github.io',
      repoId: 'R_kgDOPjK9uQ',
      category: 'Q&A',
      categoryId: 'DIC_kwDOPjK9uc4CukWC',
      mapping: 'pathname',
      //reactionsEnabled: true,
      //emitMetadata: false,
      inputPosition: 'top',
      //theme: 'preferred_color_scheme',
      lang: 'zh-CN',
    },
    mobileMinify: false
  }
})

export { blogTheme }
