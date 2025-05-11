import { defineNotesConfig } from 'vuepress-theme-plume'
import linux from './os/linux.ts'
import network from './network/index.ts'
import windows from './os/windows.ts'
import dns from './os/dns.ts'
import cisco from './network/cisco.ts'
import network_f5 from './network/network_f5.ts'
import network_other from './network/network_other.ts'
import software from './os/software.ts'
import AI from './os/AI.ts'

export default defineNotesConfig({
  // 声明所有笔记的目录，(默认配置，通常您不需要声明它)
  dir: '/',
  link: '/',
  // 在这里添加 note 配置
  notes: [ 
    linux,
    windows,
    dns,
    software,
    network,
    cisco,
    network_f5,
    network_other,
    AI,
  ]
})