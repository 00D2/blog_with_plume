import { defineNoteConfig } from 'vuepress-theme-plume'
import AI from './AI.ts'

export default defineNoteConfig({
  text: '操作系统',
  dir: '/notes/os',
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
      ]
    }
  ]
})