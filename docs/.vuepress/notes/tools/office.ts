import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: 'office',
  link: '/tools/office/',
  sidebar: [
    "",
    "onedrive",
    {
      text: "Excel",
      icon: "arcticons:microsoft-office",
      prefix: "Excel/",
      collapsed: true,
      items:[
        "",
        "ip",
      ],
    },
]
  
});