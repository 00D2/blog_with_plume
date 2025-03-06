---
icon: debian
author: 犄角蛙
title: Ubuntu更改镜像源
date: 2022-07-15
category:
  - 操作系统
  - Linux
tag:
  - debian
  - 镜像源
footer: true
---

```vim
#编辑配置文件
sudo vim /etc/apt/apt.conf.d/proxy.conf

#添加如下配置，IP地址请根据实际进行调整
Acquire::http::Proxy "http://10.1.1.1:8080";
Acquire::https::Proxy "http://10.1.1.1:8080";
```
