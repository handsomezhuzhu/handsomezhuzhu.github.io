// 主题独有配置
import { getThemeConfig } from '@sugarat/theme/node'

// 开启RSS支持（RSS配置）
// import type { Theme } from '@sugarat/theme'

// const baseUrl = 'https://sugarat.top'
// const RSS: Theme.RSSOptions = {
//   title: '粥里有勺糖',
//   baseUrl,
//   copyright: 'Copyright (c) 2018-present, 粥里有勺糖',
//   description: '你的指尖,拥有改变世界的力量（大前端相关技术分享）',
//   language: 'zh-cn',
//   image: 'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
//   favicon: 'https://sugarat.top/favicon.ico',
// }

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  // 开启RSS支持
  // RSS,

  // 搜索
  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
  // search: false,

  // 默认开启 markdown 图表支持（会增加一定的构建耗时）
  // mermaid: false

  // 页脚
  // footer: {
  //   // message 字段支持配置为HTML内容，配置多条可以配置为数组
  //   // message: '下面 的内容和图标都是可以修改的噢（当然本条内容也是可以隐藏的）',
  //   copyright: 'MIT License | SIMON',
  //   // icpRecord: {
  //   //   name: '蜀ICP备19011724号',
  //   //   link: 'https://beian.miit.gov.cn/'
  //   // },
  //   // securityRecord: {
  //   //   name: '公网安备xxxxx',
  //   //   link: 'https://www.beian.gov.cn/portal/index.do'
  //   // },
  // },

  // 主题色修改
  themeColor: 'el-blue',

  // 文章默认作者
  author: 'SIMON',

  // 友链
  friend: [
    {
      nickname: 'LINUX DO',
      des: '真诚、友善、团结、专业，共建你我引以为荣之社区。',
      avatar:
        'https://linux.do/uploads/default/original/4X/c/c/d/ccd8c210609d498cbeb3d5201d4c259348447562.png',
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
      //mapping: 'pathname',
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
