import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: '/network/f5',
  link: '/network/f5/',
  sidebar: [
    "",
    "Http头部HOST为空Nginx返回400错误",
    "f5限制部分源IP访问VS",
    "autoCfgBakToRomteSFTP",
    {
      text: "irule",
      icon: "f5",
      prefix: "irule/",
      collapsed: true,
      items:[
        "",
        "irule_tuxedo",
        "irule_jsessionid",
        "irule_xff",
      ],
    },
]
});