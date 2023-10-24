module.exports = {
  base: '/MineCDL/',
  title: 'MineCDL',
  themeConfig: {
    docsDir: 'docs',
    docsBranch: 'main',
    repo: 'superx101/MineCDL',
    editLinks: true,
    nextLinks: true,
    prevLinks: true,
    smoothScroll: true,
    locales: {
      editLinkText: 'Edit this page',
      '/': {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/mcdl' }
        ],
        sidebar: {
          "/guide/": ["mcdl", "command_parser", "generator", "generator_llbds"]
        },
      },
      '/zh/': {
        selectText: '语言',
        editLinkText: '在 GitHub 上编辑此页',
        defaultDocuments: ['/zh/guide/mcdl.md'],
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '指南', link: '/zh/guide/mcdl' }
        ],
        sidebar: {
          "/zh/guide/": ["mcdl", "command_parser", "generator", "generator_llbds"],
        }
      }
    }
  },
  locales: {
    '/': {
      lang: "English"
    },
    '/zh/': {
      lang: "简体中文",
    }
  }
}