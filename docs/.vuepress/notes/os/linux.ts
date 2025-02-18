import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  text: '操作系统',
  dir: '/os/linux',
  link: '/os/linux',
  sidebar: [
    {
      prefix: '/os/linux',
      text: 'Linux',
      items: [
        "Shell命令",
        "resetRootPasswd_RHEL",
        "ssh",
        {
          text: '文件权限',
          icon: 'linux',
          collapsed: true,
          items: [
            "filePermissions",
            "fileTypes",
            "archive",
          ]
        },
        {
          text: '文件权限',
          icon: 'linux',
          collapsed: true,
          items: [
            "YUM",
            "DNF",
          ]
        },
        {
          text: 'Ubuntu',
          icon: 'ubuntu',
          collapsed: true,
          dir: 'ubuntu',
          items: [
            "aptSource",
            "modifyNetwork",
          ]
        },
        {
          text: 'Debian',
          icon: 'logos:debian',
          dir: 'debian',
          collapsed: true,
          items: [
            "apt_viaProxy",
          ]
        },
      ],
    },
  ]
})