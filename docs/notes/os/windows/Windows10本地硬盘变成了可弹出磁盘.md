---
icon: solar:ssd-round-linear
author: Regnaiq
title: Windows10本地硬盘变成了可弹出磁盘
date: 2022-05-14
category:
  - 操作系统
  - Windows
tag:
  - Windows
  - AHCI
  - 硬盘
---



## 问题

装好系统之后，硬盘在右下角显示为可安全删除设备。

## 原因

Standard SATA AHCI controller使用高性能的硬盘模式就会把硬盘看作是一个可热插拔的存储器，所以自然就会显示可弹出。

## 解决方法

1. 如果你的BIOS支持关闭HotSwap或者HotPlug，那么直接关闭就可以了。
   或者你直接在BIOS里把磁盘模式改为IDE，不过这样就发挥不好你SSD的高性能了。

2. 还有一种解决方法，就是手动让系统把这两个磁盘当作本地磁盘。

​		`windows+r` 键打开运行提示框，输入`regedit`打开注册表，
​		定位到`HKLM\SYSTEM\CurrentControlSet\Services\storahci\Parameters\Device`，创建多字符串参数类型`REG_MULTI_SZ`的`TreatAsInternalPort`， 在里面写上你硬盘的端口号。
​		硬盘端口号可以在设备管理器里看，比如我的就是2和3。

![图片](https://img-blog.csdnimg.cn/2020060719404284.png)

​		那么在`TreatAsInternalPort`里输入查看到的磁盘号，一行一个，而且最后一个输完要回车。下图是一个例子, 把0,1,2,3全用了。

![图片](https://img-blog.csdnimg.cn/20200607194148717.png)

​		保存并重启电脑即可。



对于win7, 配置有略微不同, 这里不再赘述, 可以看下面的参考链接.

参考:
[Internal SSD/SATA Drive Shows as a Removable in Windows](http://woshub.com/internal-ssd-sata-drive-shows-removable/)

---
版权声明：本文为CSDN博主「Regnaiq」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。  

原文链接：https://blog.csdn.net/yq_forever/article/details/106606053

