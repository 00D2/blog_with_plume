import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  text: '操作系统',
  dir: '/os',
  link: '/os/',
  sidebar: [
    '',
    {
      prefix: '/os',
      text: '操作系统',
      items: [
        {
          prefix: 'linux',
          text: 'Linux',
          collapsed: true,
          items: 'auto',
        },
        {
          prefix: 'windows',
          text: 'Windows',
          collapsed: true,
          items: 'auto',
        },
        {
          prefix: 'dns',
          text: 'DNS',
          collapsed: true,
          items: 'auto',
        },
        {
          prefix: 'software',
          text: 'Software',
          collapsed: true,
          items: 'auto',
        },
      ],
    },    
  ]  
})