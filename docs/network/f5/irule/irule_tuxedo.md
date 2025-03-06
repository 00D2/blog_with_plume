---
icon: f5
title: Tuxedo中间件WSL通过f5 irules进行负载
author: 犄角蛙
date: 2022-08-26
category:
  - 网络
tag:
  - f5
  - tuxedo
  - irule
---

## Tuxedo基本介绍 

​       Tuxedo服务是一种CS应用。其机制类似被动模式的FTP服务。Tuxedo服务会产生两个TCP连接：一个称为WSL连接，是服务固定的监听控制连接；另一个是WSH连接，是真正调用服务的连接。
​        如果不使用源地址会话保持，那么需要Tuxedo服务器配置不同的WSH端口范围。负载均衡使用通过识别WSH端口来实现连接分发。

## iRule配置

1. 通过irule下的data_group创建class_A或其他，代表不同tuxedo server上不同的wsh端口组。
2. 创建不同的pool_A、其他及包含所有tuxedo节点的pool_All，代表不同的tuxedo server。
3. pool_All用于匹配首次的WSL请求分发。
4. **注意：WSL的端口不应被WSH端口组覆盖。** 

```tcl
when CLIENT_ACCEPTED {
    set tttport [TCP::local_port]
    if {
        [class match $tttport equals class_A]
    } {pool pool_A}
    elseif {
        [class match $tttport equals class_B]
    } {pool pool_B}
    else { pool pool_All}
}
```

## 在VS调用

:::tip 参考

1. <https://bbs.sangfor.com.cn/forum.php?mod=viewthread&tid=26399>  

:::
