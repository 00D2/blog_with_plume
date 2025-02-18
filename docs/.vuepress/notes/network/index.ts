import { defineNotesConfig } from 'vuepress-theme-plume'
import cisco from './cisco.ts'
import network_f5 from './network_f5.ts'
import network_other from './network_other.ts'

export default defineNotesConfig({
  dir: '/network',
  link: '/network/',
  notes: [
    cisco,
    network_f5,
    network_other,
  ]
})