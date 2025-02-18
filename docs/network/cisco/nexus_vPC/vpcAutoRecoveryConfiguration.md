---
title: vPC Auto-Recovery特性配置实例
author: 7ACE
category:
  - 网络
  - 交换机
tag:
  - 思科
  - Nexus
  - vPC
createTime: 2025/02/15 22:14:13
permalink: /network/iu9ulmnd/
---

## 简介

本文档描述了如何在Nexus交换机上配置vPC auto-recovery功能。

## 背景

vPC Auto-Recovery，有两个需要应用该功能的主要原因：

- 在数据中心宕机或断电时，由Nexus交换机组成的两个vPC peers都处于关机状态。偶尔的情况下，只能恢复其中一台设备。由于其他的Nexus交换机仍然处于关机状态，因此vPC peer-link和vPC peer-keepalive link同样也处于中断状态 。在这种情况下，已开机的Nexus交换机上vPC也不会开启。所有的vPC配置必须从Nexus交换机的port-channel中移除，才能使port-channel正常工作。当另一台Nexus交换机恢复后，必须再次进行配置更改，恢复所有vPC的配置。
- 由于某种原因，vPC peer-link中断。由于vPC peer-keepalive仍然正常，vPC备设备会由于双活动检测而关闭其所有vPC成员端口。因此所有的流量都通过vPC主设备。由于某种原因，vPC主设备也关闭，那么此时会造成流量黑洞，因为在vPC主设备关闭之前，vPC备设备就检测到了双活从而关闭了设备上的vPC。

## 配置

SW1配置：

```text
SW1(config)# vpc domain 1
SW1(config-vpc-domain)# auto-recovery
SW1# show vpc
Legend:
                (*) - local vPC is down, forwarding via vPC peer-link

vPC domain id                     : 1 
Peer status                       : peer adjacency formed ok      
vPC keep-alive status             : peer is alive                 
Configuration consistency status  : success 
Per-vlan consistency status       : success                       
Type-2 consistency status         : success 
vPC role                          : primary
Number of vPCs configured         : 1   
Peer Gateway                      : Enabled
Peer gateway excluded VLANs       : -
Dual-active excluded VLANs        : -
Graceful Consistency Check        : Enabled
Auto-recovery status              : Enabled (timeout = 240 seconds)

vPC Peer-link status
---------------------------------------------------------------------
id   Port   Status Active vlans    
--   ----   ------ --------------------------------------------------
1    Po10   up     1,100                                                     

vPC status
----------------------------------------------------------------------
id   Port      Status Consistency Reason                  Active vlans
--   ----      ------ ----------- ------                  ------------
100  Po100     up     success     success                    1,100           
SW1# 

```

SW2配置：

```text
SW2(config)# vpc domain 1
SW2(config-vpc-domain)# auto-recovery
SW2# show vpc
Legend:
                (*) - local vPC is down, forwarding via vPC peer-link

vPC domain id                     : 1
Peer status                       : peer adjacency formed ok      
vPC keep-alive status             : peer is alive                 
Configuration consistency status  : success 
Per-vlan consistency status       : success                       
Type-2 consistency status         : success 
vPC role                          : secondary
Number of vPCs configured         : 1   
Peer Gateway                      : Enabled
Peer gateway excluded VLANs       : -
Dual-active excluded VLANs        : -
Graceful Consistency Check        : Enabled
Auto-recovery status              : Enabled (timeout = 240 seconds)

vPC Peer-link status
---------------------------------------------------------------------
id   Port   Status Active vlans    
--   ----   ------ --------------------------------------------------
1    Po10   up     1,100                                                     

vPC status
----------------------------------------------------------------------
id   Port      Status Consistency Reason                  Active vlans
--   ----      ------ ----------- ------                  ------------
100  Po100     up     success     success                    1,100           
SW2# 

```

## Auto-recovery工作原理

本节分别讨论背景部分中提到的两个场景。（假设在两个交换机上都配置了vPC auto-recovery，并相应保存到启动配置中）

1. SW1和SW2同时关电，只有SW2再次启动的场景

- SW2等待vPC auto-recovery超时(默认为240秒，可以使用 **auto-recovery reload-delay x** 命令进行配置，其中x为240-3600秒)，以验证vPC peer-link或 peer-keepalive link状态是否开启。如果其中任何一个链路处于打开状态，则不会触发 auto-recovery 。
- 超时之后，如果两个链路都处于关闭状态，则vPC将启用自动恢复，SW2将成为主设备并启动其本地vPC。由于没有peers，所以会绕过一致性检查。
- 之后SW1启动恢复，此时SW2保留其主角色，SW1作为备角色，执行一致性检查，并采取适当的操作。

2. 首先vPC peer-link关闭，然后vPC主设备关闭的场景

- SW2等待三个连续peer-keepalive消息丢失。出于某种原因，如果vPC peer-link恢复或者SW2收到peer-keepalive消息，那么auto-recovery将不会启用。
- 如果vPC peer-link仍然中断，并且丢失了三个连续的peer-keepalive消息，则vPC auto-recovery 启用。
- SW2承担主角色，并启用它的本地vPC，会绕过一致性检查。
- 之后SW1启动恢复，此时SW2仍保留其主角色，SW1作为备角色，执行一致性检查，并采取适当的操作。

**建议在vPC环境中启用auto-recovery**（Nexus系列中根据设备型号不同，该特性默认开启或关闭）

有一种极端场景，vPC auto-recovery功能可能会创建一个双活。例如，如果首先vPC peer-link中断，然后vPC peer-keepalive中断，那么将会形成双活场景。

::: info 原文链接
https://zhuanlan.zhihu.com/p/92280351
:::

::: tip 参考
https://www.cisco.com/c/en/us/support/docs/switches/nexus-7000-series-switches/116187-configure-vpc-00.html
:::
