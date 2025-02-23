---
icon: f5
title: f5限制部分源IP访问VS业务
author: 犄角套袜子
date: 2022-06-09
category:
  - 网络
tag:
  - f5
  - 源地址限制
---


## 方式一：通过irules实现

### 创建data group

`local traffic` - `iRules` - `Data Group List` - `新建`  
>Name: `test`  
>Type：Address  
>     x.x.x.x/y  

Finished。

### 创建irules

```tcl
when CLIENT_ACCEPTED {
      if { [matchclass [IP::client_addr] equals data_group_name] } {
  drop
 }
 else {
                return
  }
}
```

### 在VS下调用

## 方式二：通过packet filters实现

### 创建rule

`Network` - `Packet Filters` - `Rules` - `新建`  
>Name :  
>Order:  
>Action : reject  
>VLAN/Tunnel :  
>Source Hosts and Networks : `Restrict to any in list` - 添加相应的地址段  
>Destination Hosts and Networks : `Restrict to any in list` - 添加相应的VS地址  
>Destination Port : `Restrict to any in list` - 添加相应的VS端口  
Finished。

![image-20241103133327741](https://img.jinguo.link/d/image-20241103133327741.png)

### 启用Packet Filters

`Network` - `Packet Filters` - `General` - `Packet Filtering` 选择`Enabled`  

并确认`Unhandled Packet Action`是`Accept`。
