module.exports = {
  title: 'MineCDL',
  themeConfig: {
    base: '/MineCDL/',
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
          "/guide/": ["mcdl", "command_parser", "code_generator"]
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
          "/zh/guide/": [ "mcdl", "command_parser", "code_generator"]
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