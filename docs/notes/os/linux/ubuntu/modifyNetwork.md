---
icon: mdi:ubuntu
author: freesharer
title: Ubuntu修改IP地址
date: 2022-07-15
category:
  - 操作系统
  - Linux
tag:
  - Ubuntu
  - 网卡配置
footer: true
---



## 配置静态IP示例

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:
      addresses:
        - 10.10.10.2/24
      nameservers:
        search: [mydomain, otherdomain]
        addresses: [10.10.10.1, 1.1.1.1]
      routes:
        - to: default
          via: 10.10.10.1
```

:::info 参考链接

<https://blog.csdn.net/networken/article/details/99063553>  
<https://netplan.io/examples>

:::
