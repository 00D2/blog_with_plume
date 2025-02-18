import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  text: '操作系统',
  dir: '/os/windows',
  link: '/os/windows',
  sidebar: [
    {
      prefix: '/os/windows',
      text: 'Windows',
      items: [
        '',
        "Windows10本地硬盘变成了可弹出磁盘",
      ],  
    }
  ]
});