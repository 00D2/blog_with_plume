---
icon: simple-icons:f5
title: 基于cookie中的JSession ID实现会话保持
author: 犄角蛙
date: 2024-11-03
category:
  - 网络
tag:
  - f5
  - irule
---

## 创建irule，用于匹配JSessionID

```tcl
when HTTP_REQUEST {
if { [HTTP::cookie exists "JSESSIONID"] } {
persist uie [HTTP::cookie "JSESSIONID"]
}
}
when HTTP_RESPONSE {
if { [HTTP::cookie exists "JSESSIONID"] } {
persist add uie [HTTP::cookie "JSESSIONID"]
}
}
```

## 创建新的会话保持策略

创建类型为Universal的会话保持，勾选iRule为刚才创建的irule，并基于实际情况配置timeout时间。
![alt text](https://img.jinguo.link/d/image-20241103132900101.png)

## 在VS进行调用
