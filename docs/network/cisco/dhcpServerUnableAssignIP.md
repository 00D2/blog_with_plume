---
icon: cisco
author: gorquan
title: cisco dhcp server无法分配IP地址排查思路
date: 2020-08-03
category:
  - 网络
  - 思科
tag:
  - 思科
  - iOS
---

在驻场的时候遇到一个问题，觉得挺有意思，记录一下

某一天早上，刚到现场的时候，有反应说有电脑上不了网。过去一看，不是想象中的某一排电脑上不了网，而是零星的几台电脑上不了网

刚开始以为是接入层交换机的某个或某几个交换机端口或者电脑的网线出了问题，后面发现越来越多的电脑上不了网，觉得不是端口或者网线问题了，同时发现有的人能上有的人不能上，也排除了接入层交换机出问题的可能

找到其中一台上不了网电脑，发现网卡是已连接的，但是获取的IP是169，也就是没有获取到IP。那么就剩下一个可能了，核心层交换机DHCP池满了

登陆核心层交换机，查看这个教室的vlan情况

```cli
cisco#show ip dhcp pool
```

出现了以下结果

![IP池结果](https://img.jinguo.link/d/20250214095308284.png)

Leased + Excluded = Total 已经254了啊，果然是IP池没有可分配IP的问题。但是怎么解决呢。先问了一下驻场大佬，IP池不够，没有可用IP分配了，要不要扩容IP池。然后大佬说，当初考虑好的了，IP不可能不够用的。我又把这个图发给大佬，大佬说你看Leased addresses才169，还多着呢，然后就不回复我了。好吧，我又去请教学校的网络中心的老师，老师说，很明显IP池不够啦，扩容吧

后面找了一下资料，扩容的话，要重新分配IP和更改掩码，而且要修改防火墙的配置，略为麻烦。当时的情况不允许我扩容IP地址池，只能放弃这个方案了。我又重新看了一下输出的结果，发现这个vlan的Excluded addresses明显比其他几个vlan的Excluded addresses多，我又去看了一遍配置文档

```cli
cisco#show running-config
```

找到排除地址那段配置

![排除地址配置](https://img.jinguo.link/d/1574048302244-c33099c9-1fd6-4143-9a92-22ba9c03c5a7.png)

Excluded-address 是251-254，也才4个，和上面的Excluded-addresses 的85个对不上啊

这个时候在cisco论坛找到了这样一个帖子。里面有这样一段话

> Since Cisco DHCP server has seen two gratuitous ARP messages and discovered there is a conflict, it will move the IP address into its conflict table and assign the next available IP address to the client.

翻译一下，就是DHCP Server接收到了两条免费的ARP信息并发现存在冲突，将该IP加入冲突表并将下一个可用IP地址分配给客户端

今天写这篇文章之前，看CCNA指南这本书的DHCP部分，里面有着这样一句话

> 如果检测到地址冲突，冲突地址将从地址池中删除，在管理员解决冲突前不分配它

也就是说，我那85个IP是因为冲突导致没办法分配下去。恍然大悟，然后执行

```cli
cisco#show ip dhcp conflict
```

统计了一下冲突表里的IP，加上配置里面的4个Excluded addresses，刚刚好85个。果然是因为过多的IP地址被加入了排除列表，导致没有可用的IP地址分配下去，所以一些电脑无法获取IP地址

问题找到了，怎么解决呢。既然这些IP已经加入了排除列表导致无法进行分配，那么我把他从排除列表里面移除不就好了吗

执行清理排除地址命令

```cli
cisco#clear ip dhcp conflict *
```

然后再执行

```cli
cisco#show ip dhcp pool
```

发现此vlan下的Excluded addresses变成了4个，也就是配置文件中的那个排除地址，同时，出问题的电脑也恢复正常，能够获取IP地址了，问题解决

我感觉应该还有其他更好的方法去排查这些问题，但无论如何，无论黑猫白猫，抓到老鼠就是好猫，只要问题解决了就行了。

:::tip 原文链接
<https://www.gorquan.cn/index.php/archives/17/>
:::
