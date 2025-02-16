---
icon: cisco
author: Cisco
title: Cisco Nexus vPC 之 Sticky Master
date: 2022-05-14
category:
  - 网络
  - 交换机
tag:
  - 思科
  - Nexus
  - vPC
---

** 场景

生产环境里，我们经常把其中的一台Nexus交换机从vPC domain中独立出来，比如升级或灾备演练等情况。但是其中一个细节即Sticky Master的状态很少有人会注意到，因此这可能导致网络中断。

在vPC环境中，两台vPC会进行role选举，通过优先级配置，假设N7K-1为primary，N7K-2为secondary。

**步骤一
**

当我们把N7K-2从vPC环境中独立出来，即断掉N7K-2的peer-link、keepalive以及所有上下行接口。这时候两台设备处于双活状态，N7K-1为primary，N7K-2为secondary，operational primary。
当然由于N7K-2并未接入网络，网络也没有任何影响。

**步骤二
**

等我们对N7K-2的操作完成后，将N7K-2接入回网络，这时候一般会看到，N7K-1成为了primary，operational secondary的vPC接口都suspend了。

**疑问
**

为什么在N7K-1明明为primary，N7K-2为secondary，operational primary的情况下，两台设备连接后N7K-1却成为了primary，operation secondary?

**Sticky Master
**

这是由于在vPC里面，有一个参数叫Sticky Master，当一台Secondary成为operational primary的时候，会将自身的Sticky Master设置为True。
N7K-1由于一直是Primary，Sticky Master一直是FALSE，N7K-2由于role由Secondary切换为Secondary, operational primary,Sticky Master被置成了TRUE。
这种情况下，当两台设备一旦重新建立vPC关系，Sticky Master被置成了True的设备会保持Role不变，Sticky Master被置成了False的设备会选择另外一个可用角色，也就是primary，operation secondary。
因此，N7K-1将会进行收敛，suspend所有vPC接口，重新检查接口状态，恢复接口。在这时，如果N7K-2上的vPC接口有没有起来的情况，将导致网络中断。

**设备入网检查
**

这种情况是可以避免的，主要是在新设备加入vPC域之前进行Sticky Master检查，使用show system internal vpcm info global | i Sticky命令，可以看到以下两种情况：

**情况一**NX-OS# show system internal vpcm info global | i StickySticky Master: TRUE

这时候是不能入网的，否则会抢占目前Primary的Role。

**情况二**NX-OS# show system internal vpcm info global | i StickySticky Master: FALSE

这时候是可以入网的，会自动成为Secondary。

**如何重置Sticky
**

入网前一旦检查到Sticky Master为TRUE，需要重置该状态为FALSE。
重置有两种方法：
1.重新配置优先级，哪怕优先级一样也可以。

vpc domain 110 priority 32768

2.如果配置优先级无法重置，那只有重启设备了。



---

::: info 原文链接
https://community.cisco.com/t5/%E6%95%B0%E6%8D%AE%E4%B8%AD%E5%BF%83%E6%96%87%E6%A1%A3/%E5%8E%9F%E5%88%9B-cisco-nexus-vpc-%E4%B9%8B-sticky-master/ta-p/4345018
:::

::: tip 参考
【1】  http://www.cisco.com/c/en/us/support/docs/interfaces-modules/nexus-7000-series-supervisor-1-module/119033-technote-nexus-00.html?dtid=osscdc000283

【2】  Understand the vPC Election Process  

https://www.cisco.com/c/en/us/support/docs/ios-nx-os-software/nx-os-software/212589-understanding-vpc-election-process.html#anc11

【3】Nexus 7000 Chassis Replacement Procedure  

https://www.cisco.com/c/en/us/support/docs/interfaces-modules/nexus-7000-series-supervisor-1-module/119033-technote-nexus-00.html?dtid=osscdc000283#anc9
:::
