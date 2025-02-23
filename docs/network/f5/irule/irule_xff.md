---
icon: f5
title: 基于XFF的地址进行会话保持
author: 犄角套袜子
date: 2024-11-03
category:
  - 网络
tag:
  - f5
  - irule
---

> 部分HTTP报文，没有cookie内容，但又需要实现会话保持。  
> 在直接访问到具体真实服务器的时候，可以通过源地址会话保持方式来实现。  
> 但如果服务前面还部署了SSL加密设备，因为SSL加密设备数量一般较少，如果此时还通过源地址来实现会话保持，往往会造成负载不均衡。  

## 创建基于HTTP报文中XFF字段来实现会话保持的irule

```tcl
when HTTP_REQUEST {
 if { [HTTP::header exists X-Forwarded-For] }
{ persist uie [HTTP::header X-Forwarded-For] 28800 }
}
```

## 在VS调用
