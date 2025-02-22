import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { 
    text: "操作系统",
    icon: "OS",
    items:[
      { 
        text: "Linux",
        icon: "linux",
        link: "/os/linux/",
      },
      { 
        text: "Windows",
        icon: "windows",
        link: "/os/windows/",
      },
      { 
        text: "DNS",
        icon: "dns",
        link: "/os/dns/",
      },
      { 
        text: "生产力软件",
        icon: "software",
        link: "/os/software/",
      },
    ],
  },
  { 
    text: "网络技术",
    icon: "network",
    items:[
      {
        text: "Cisco",
        icon: "cisco",
        link: "/network/cisco/"
      },
      {
        text: "f5",
        icon: "f5",
        link: "/network/f5/",
      },
      {
        text: "其他",
        icon: "other",
        link: "/network/other/"
      },
    ],  
  },
  { 
    text: "工具",
    icon: "tools",
    items:[
      {
        text: "AI",
        icon: "ai",
        link: "/tools/AI/"
      },
      {
        text: "Office",
        icon: "office",
        link: "/tools/Office/"
      },
      {
        text: "Git",
        icon: "git",
        link: "/tools/Git/",
      },
      {
        text: "Ansible",
        icon: "ansible",
        link: "/tools/Ansible/",
      },
      {
        text: "Travis CI",
        icon: "travisci",
        link: "/tools/Travis CI/",
      },
      {
        text: "Docker",
        icon: "docker",
        link: "/tools/Docker/",
      },
      {
        text: "K8S",
        icon: "kubernetes",
        link: "/tools/K8S/",
      },
      {
        text: "Vuepress",
        icon: "vue",
        link: "/tools/Vuepress/",
      },
      {
        text: "好用的工具",
        icon: "tools",
        link: "/tools/awesomeTools",
      },
  ]},
  //{
  //  text: "索引",
  //  icon: "tree",
  //  items:[
  //    { text: "分类", icon: "categoryselected", link: "/category" },
  //    { text: "标签", icon: "tag", link: "/Tag" },
  //    { text: "时间轴", icon: "time", link: "/Timeline" },
  //  ],
  //},
  {
    text: "强大的博客们",
    icon: "blog",
    link: "/blog",
  },
  { text: "关于", icon: "about", link: "/about/" },
])
