---
icon: mdi:debian
author: 犄角蛙
title: Debian配置apt使用代理
date: 2022-07-15
category:
  - 操作系统
  - Linux
tag:
  - debian
  - 镜像源
footer: true
---

- 编辑配置文件

```bash
sudo vim /etc/apt/apt.conf.d/proxy.conf
```

- 添加如下配置，IP地址请根据实际进行调整

```json
Acquire::http::Proxy "http://10.1.1.1:8080";
Acquire::https::Proxy "http://10.1.1.1:8080";
```
