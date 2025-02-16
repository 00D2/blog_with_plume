import { defineThemeConfig } from 'vuepress-theme-plume'
import { navbar } from './navbar'
import notes from './notes/index.ts'

/**
 * @see https://theme-plume.vuejs.press/config/basic/
 */
export default defineThemeConfig({
  logo: 'https://theme-plume.vuejs.press/plume.png',
  // your git repo url

  appearance: true,

  profile: {
    avatar: 'https://theme-plume.vuejs.press/plume.png',
    name: '心向自由',
    description: '自由和生活到底是什么关系',
    // circle: true,
    // location: '',
    // organization: '',
  },

  navbar,
  notes,
  social: [
    { icon: 'github', link: '/' },
  ],

})
