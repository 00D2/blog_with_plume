---
index: true
icon: dns
title: EDNS Client Subnet
author: 小苹果儿
date: 2022-07-27
category:
  - DNS
tag:
  - edns
  - ecs
---

ECS功能，可以用于将客户端IP地址传递给所要请求域名的权威DNS服务器。

## 配置方法
### ZDNS配置插入

### f5 GTM配置读取
::: tip f5社区
转载至：  
https://community.f5.com/t5/technical-articles/using-client-subnet-in-dns-requests/ta-p/282196
:::

BIG-IP DNS 14.0 now supports edns-client-subnet (ECS) for both responding to client requests (GSLB) or forwarding client requests (screening). The following is a quick start on using this feature.

#### What is EDNS-Client-Subnet (ECS)

If you are familiar with X-Forwarded-For headers in HTTP requests, ECS solves a similar problem. The problem is how to forward a DNS request through a proxy and preserve information about the original request (IP Address). Some of this discussion I also cover in a previous article,[Implementing Client Subnet in DNS Requests ](https://devcentral.f5.com/s/articles/implementing-client-subnet-in-dns-requests).

#### Traditional DNS Requests

When a traditional DNS request is made, a client makes a request to a “local” DNS server (LDNS), and that request is forwarded to the authoritative DNS server for that domain. When a topology (send different responses based on the source address) record is evaluated it will use the source IP of the LDNS server. Usually this is OK for most applications, but it would be ideal to be able to forward more precise information from the LDNS server.

![](https://community.f5.com/t5/image/serverpage/image-id/6994i1672E85A3CA93772)

#### ECS DNS Requests

Using ECS a LDNS server can inject additional meta-data about the request that includes information about the source IP address of the client. In the following example a “Client Subnet” of 192.0.2.0/24 is forwarded to the DNS server.

![0151T000003d7EYQAY.png](https://community.f5.com/t5/image/serverpage/image-id/5611i9E1BAB0C32338836/image-size/large?v=v2&px=999)

#### ECS on BIG-IP DNS

F5 BIG-IP DNS can use ECS in two ways.

- Use ECS when handling topology requests
- Inject ECS when “screening” a DNS server

#### Using ECS with BIG-IP DNS Topology

There are two methods of configuring BIG-IP DNS to use ECS. Either at the wide-ip or globally.

To configure ECS on a wide-ip:

![0151T000003d7EZQAY.png](https://community.f5.com/t5/image/serverpage/image-id/3206i78F8DDD9C7DF532C/image-size/large?v=v2&px=999)

To configure ECS globally. Under DNS Settings.

![0151T000003d7EaQAI.png](https://community.f5.com/t5/image/serverpage/image-id/748iDB9A2F4708C665AA/image-size/large?v=v2&px=999)

#### Injecting ECS records

BIG-IP DNS can also proxy requests to other DNS servers (BIG-IP DNS or other vendors). When you modify the DNS profile to insert an ECS record.

![0151T000003d7EbQAI.png](https://community.f5.com/t5/image/serverpage/image-id/9882iBA42E4077407A707/image-size/large?v=v2&px=999)

You will observe that the original /32 address will be forwarded to any DNS servers that are in the pool for that particular Virtual Server.

![0151T000003d7EcQAI.png](https://community.f5.com/t5/image/serverpage/image-id/2331iFF7C8369B2999ADB/image-size/large?v=v2&px=999)

The following is a diagram of the above.

![0151T000003d7EdQAI.png](https://community.f5.com/t5/image/serverpage/image-id/6961iF22CA9584464C1AE/image-size/large?v=v2&px=999)