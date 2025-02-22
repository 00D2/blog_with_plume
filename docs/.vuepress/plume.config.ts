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

  // 完全禁用所有自动生成
  // autoFrontmatter: false,
  autoFrontmatter: {
    permalink: false, // 是否生成永久链接
    createTime: false, // 是否生成创建时间
    title: false, // 是否生成标题
  }
  
})
