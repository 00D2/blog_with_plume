import { defineNoteConfig } from 'vuepress-theme-plume'

export default defineNoteConfig({
  dir: '/network/cisco',
  link: '/network/cisco/',
  sidebar: [
    "",
    "iOS_Download",
    "dhcpServerUnableAssignIP",
    {
      text: "Nexus vPC",
      icon: "cisco",
      prefix: "nexus_vPC/",
      collapsed: true,
      items: [
        //"",
        "vPC_Sticky_Master",
        "vpcAutoRecoveryConfiguration",
      ],
    },
  ]
});