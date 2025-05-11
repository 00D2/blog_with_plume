---
icon: fa-brands:git
author: 雷恩Layne
title: Github报错OpenSSL SSL_connect
date: 2021-03-01
category:
  - git
  - github
tag:
  - git
  - github
---

Github报错OpenSSL SSL_connect: Connection was reset in connection to github.com:443终极解决方案

今天在使用git命令进行push和pull时，出现如下报错：

> fatal: unable to access 'https://github.com/wxler/test.git/': OpenSSL SSL_connect: Connection was reset in connection to github.com:443
> 1我查了很多种方案，下面必有一个方法能够解决。

## 方案一

在git bash命令行中依次输入以下命令：

```shell
git config --global http.sslBackend "openssl"
git config --global http.sslCAInfo "C:\Program Files\Git\mingw64\ssl\cert.pem"
```

**注意上面第二个命令，路径要换成git安装的路径。**

## 方案二

如果你开启了VPN，很可能是因为代理的问题，这时候设置一下http.proxy就可以了。

一定要查看自己的VPN端口号，假如你的端口号是7890，在git bash命令行中输入以下命令即可：

```bash
git config --global http.proxy 127.0.0.1:7890
git config --global https.proxy 127.0.0.1:7890
```

如果你之前git中已经设置过上述配置，则使用如下命令取消再进行配置即可：

```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

下面是几个常用的git配置查看命令：

```bash
git config --global http.proxy #查看git的http代理配置
git config --global https.proxy #查看git的https代理配置
git config --global -l #查看git的所有配置
```

### 方案三

还有一个情况，是你的VNP代理服务器节点有问题，有时候更换一个结点就好了。当然，也可以使用自己搭建的代理服务器。

博主提示，一定要科学上网，合理上网。

### 方案四

打开一个新的git bash终端，就没问题了。这个可能是当前git的会话有关。

如果以上所有方案都解决不了报错问题，则需要对症分析，请评论区留言！

---

::: info 版权声明

本文为CSDN博主「雷恩Layne」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。  
原文链接：<https://blog.csdn.net/qq_37555071/article/details/114260533>

:::
