import { defineNotesConfig } from 'vuepress-theme-plume'
import os from './os'
import network from './network'

export default defineNotesConfig({
  // 声明所有笔记的目录，(默认配置，通常您不需要声明它)
  dir: '/',
  link: '/',
  // 在这里添加 note 配置
  notes: [ 
    network,
    os,
  ]
})