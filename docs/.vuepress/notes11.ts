import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const os = defineNoteConfig({
  dir: 'os/linux',
  link: '/os/linux',
  sidebar: [
    "Shell命令",
    "resetRootPasswd_RHEL",
    "ssh",
    {
      text: "文件管理",
      icon: "linux",
      //link: "rhel8/",
      //prefix: "rhel8/",
      collapsed: true,
      items: [
      "filePermissions",
      "fileTypes",
      "archive",
    ]},
    {
      text: "软件管理",
      icon: "software",
      //link: "rhel8/",
      //prefix: "rhel8/",
      collapsed: true,
      items: [
        "YUM",
        "DNF",
    ]},
    {
      text: "Ubuntu",
      icon: "ubuntu",
      link: "ubuntu/",
      prefix: "ubuntu/",
      collapsed: true,
      items: [
        "",
        "aptSource",
        "modifyNetwork",
      ],
    },
    {
      text: "Debian",
      icon: "debian",
      link: "debian/",
      prefix: "debian/",
      collapsed: true,
      items: [
        "",
        "apt_viaProxy",
      ],
    }
  ],
})

export const notes = defineNotesConfig({
  dir: '',
  link: '/os/linux',
  notes: [os],
})
