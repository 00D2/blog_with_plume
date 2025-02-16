---
icon: shell
author: 小苹果儿
title: Linux接口查看
date: 2022-06-06
category:
  - 操作系统
  - Linux
tag:
  - linux
---

### 查看接口数据包收发

```shell
ip -s link show eth0
```

![image-20220606141104118](https://img.jinguo.tk/api/image/image-20220606141104118.png)



## nmcli

> 适用于RHEL >= 8，CentOS >= 8。
>
> 7版本不建议使用NetworkManger进行网络管理，因此nmcli无法使用。

### 查看网络链接信息

- 查看系统网络链接

```bash
nmcli connection show
```

![image-20220606140633070](https://img.jinguo.tk/api/image/image-20220606140633070.png)  


- 查看系统活动的网络链接

	```bash
	nmcli connection show --active
	```

- 查看某个网络链接的详细信息

	```bash
	nmcli connection show eth0
	```



### 创建网络链接



```bash
nmcli connection add con-name eth0-1 type ethernet ifname eth0 ipv4.method manual ipv4.addresses 192.168.100.100/24 ipv4.gateway 192.168.100.254 ipv4.dns 114.114.114.114,114.114.115.115 connection.autoconnect yes 
```

![image-20220606143016609](https://img.jinguo.tk/api/image/image-20220606143016609.png)



- 激活配置

  ```bash
  nmcli connection up eth0-1
  ```

  

- 修改配置

  ```bash
  nmcli connection modify eth0-1 xx
  nmcli connection down eth0-1 && nmcli connection up eth0-1
  ```

## nmtui
