---
icon: f5
title: Http头部HOST为空Nginx返回400错误
author: 乐码农
date: 2018-08-16
category:
  - 网络
tag:
  - f5
  - 健康检查
---


## F5健康检查失效

现场环境是使用F5做负载均衡，即F5对外提供服务地址和端口，F5负载转发请求到后端业务服务器。环境是客户的测试环境，F5也是客户的。我们向客户提交F5转发策略和F5健康检查策略，等待网络开通。本来以为不用担心这一块问题，但客户的网络部门配置完成后，网络一直不通。由于未接触过F5所以前面不知怎么和客户沟通，后拿到F5账号和密码，登录进去后开始定位问题。

进去F5登录界面后，看到配置的转发策略中，后端服务器健康检查是失效的，即F5认为后端服务器不在线。这是怎么回事？

## F5健康检查规则

这里首先弄清F5健康检查规则是怎么回事？

F5健康检查规则是指F5在一定周期内向后端服务器发送请求来确认后端服务器是否在线。

如下图：

![img](https://img.jinguo.tk/api/image/13633498-a942bc9ee7d0b9a6.PNG)



图中 Send String 就是 F5发送的请求字段， Receive String 是F5接收到响应后对比字段，只要响应中有对比字段则认为成功。Receive String为空时，F5接收到响应就认为成功。

## NGINX返回400

继续排查F5健康检查失效问题。

问题主要在两点：1 发送请求字段写的有问题。2接收的响应中没有包含200 OK，匹配不上。

上述这两点通过抓包可以分析。因为现场没法登陆F5服务器上去抓包，下面就利用nc工具模拟F5发请求。

nc 全名 Netcat (网络刀)，是一个强大的网络工具，可以模拟发送http请求。

下面在和业务服务器同网段的任意一台服务器上装上nc 工具。

然后使用nc 命令发送请求，请求如下：

> echo -e "GET {url} HTTP/1.1\r\nConnection:Close\r\nHost:\r\n\r\n" | nc 10.160.15.20 80 |less

引号中的请求字段和F5中sendString一致。

利用nc 发送http请求后，得到的响应如下：

![img](https://img.jinguo.tk/api/image/13633498-2628c559e387e36f.jpg)



把得到的结果复制到一个html文件中，然后打开如下：

![img](https://img.jinguo.tk/api/image/13633498-0fe5f29215373cf8.jpg)



现在F5健康检查问题找到了：是因为业务服务器返回400错误，但F5匹配200 OK， 没有匹配上造成F5认为服务器有问题。

## HTTP头部HOST不能为空

继续看问题，nginx为啥会返回错误码400？

这也是本片文章重头戏。

网上查询原因如下：Nginx官方文档介绍，400状态码含义如下：

> A client MUST include a Host header field in all HTTP/1.1 request messages . If the requested URI does not include an Internet host name for the service being requested， then the Host header field MUST be given with an empty value. An HTTP/1.1 proxy MUST ensure that any request message it forwards does contain an appropriate Host header field that identifies the service being requested by the proxy. All Internet-based HTTP/1.1 servers MUST respond with a 400 (Bad Request) status code to any HTTP/1.1 request message which lacks a Host header field.

上面是http1.1的rfc关于host部分的解释，从上面我们了解到如果一个http1.1的请求没有host域，那么server应该给client段发送400的状态码，表明这个请求server不能处理。而对于Nginx server来说，也遵循这样的方式，说明client发送了一个无效的请求，Nginx server无法处理，于是返回了400的状态码。

本次故障中，客户端的调用方式没有使用host 参数，传递了空的Host头给服务端，一旦Nginx设置了proxy_set_header Host $http_host，空Host头就传给了后端。然而，在http 1.1的规范中，Host只要出现空，就会返回400，所以出现了这个故障。

最后，重新修改发送规则如下：这里HOST随便写一个地址就可以。

> echo -e "GET {url} HTTP/1.1\r\nConnection:Close\r\nHost:10.1.5.20\r\n\r\n" | nc 10.160.15.20 80 |less

利用nc 命令测试，结果如下：

![img](https://img.jinguo.tk/api/image/13633498-4c3f1fa1d54f5d21.jpg)

F5修改发送规则后，终于网路联通了.

至此，问题解决。

---
::: info 原文链接 
https://www.jianshu.com/p/1490406dae21
:::
