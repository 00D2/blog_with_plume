---
icon: linux
author: 小苹果儿
title: SSH及SFTP参数及使用
date: 2022-08-22
category:
  - 操作系统
  - Linux
tag:
  - ssh
  - sftp
---

## SSH取消key验证

```shell
ssh|sftp -o StrictHostKeyChecking=no username@ip
```

## SSH不将远程主机公钥保存至本地known_hosts文件

```shell
ssh|sftp -o UserKnownHostsFile=/dev/null username@ip
```

## 配置使用代理

:::tip

SSH是否走代理依赖于/etc/ssh/ssh_config 配置文件，SSH想使用http代理通常需要服务器安装有第三方软件如nc、corkscrew。配置方法如下：

:::

> ### 编辑SSH客户端配置文件
>  
> ```shell
> vi /etc/ssh/ssh_config 
> ```
>
> #### 当Linux服务器安装有nc时
>    ```shell
>    ProxyCommand nc -X connect -x x.x.x.x:8081 %h %p
>    ```
> ##### nc7.5版本使用如下命令配置
> 	```shell
> 	ProxyCommand nc --proxy-type http --proxy x.x.x.x:8081 %h %p
> 	```
> #### 当Linux服务器安装有corkscrew时
>    ```shell
>    ProxyCommand corkscrew x.x.x.x 8081 %h %p
>    ```
>
> **配置文件中Host参数后默认为\*，代表全部SSH走代理**
>    ```shell
>    Host *
>    ```
> 
>#### 配置部分目的IP走代理
>
>```shell
>Host x.x.x.x
>    ProxyCommand nc --proxy-type http --proxy x.x.x.x:8081 %h %p
>```
