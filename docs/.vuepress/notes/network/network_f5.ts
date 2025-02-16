import { arraySidebar } from "vuepress-theme-hope";

export const network_f5 = arraySidebar([
  "",
  "Http头部HOST为空Nginx返回400错误",
  "f5限制部分源IP访问VS",
  "autoCfgBakToRomteSFTP",
  {
    text: "irule",
    icon: "f5",
    prefix: "irule/",
    collapsible: true,
    children:[
      "",
      "irule_tuxedo",
      "irule_jsessionid",
      "irule_xff",
    ],
  },
]);