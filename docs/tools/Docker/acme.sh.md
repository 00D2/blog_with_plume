---
icon: docker
title: 使用acme.sh自动申请SSL证书
author: 犄角套袜子
date: 2024-10-19
category:
  - Docker
tag:
  - docker
  - 容器
---

> 本文档的使用说明基于docker compose部署。  
> acme.sh的新版本默认CA为zerossl，可以在执行命令时使用--server参数指定CA。  
> 也可以通过下面的命令进行默认CA的调整：`acme.sh  --set-default-ca  --server letsencrypt`。  
> 支持的CA列表，详见<https://github.com/acmesh-official/acme.sh/wiki/Server>

## docker-compose.yaml文件

```yaml
services:
  acme-sh:
    image: neilpang/acme.sh
    container_name: acme.sh
    environment:
      - CF_Account_ID="登录CloudFlare后，浏览器URL后面的一串ID"
      # CF_Account_ID仅适用于多个Zone的情况。如果Token只管理单个Zone，则不能添加该变量。
      - CF_Token="登录后，在MyProfiles中API Tokens页面手动创建"
    volumes:
      - ./out:/acme.sh
    network_mode: host
    command: daemon
    stdin_open: true
    tty: true
    restart: unless-stopped
```

## 使用

- 容器启动

```bash
docker compose up -d
```

- 证书申请

```bash
docker exec acme.sh --register-account -m shijinguosjg@gmail.com
docker exec acme.sh --issue --test -d *.self-domain.com --dns dns_cf
# 注意--test参数，是连接至letsencrypt的测试网站上进行证书申请及签发，不会被签发为真实有效的证书，仅用于测试目的。正式申请时，应删除该参数。
docker exec acme.sh --issue -d *.self-domain.com --dns dns_cf
docker exec acme.sh --issue -d *.self-domain.com --dns dns_cf --force
```

:::tip 参考链接

1. <https://github.com/acmesh-official/acme.sh/wiki/Run-acme.sh-in-docker>  
2. <https://github.com/acmesh-official/acme.sh/wiki/dnsapi>  
3. <https://github.com/acmesh-official/acme.sh/wiki/deploy-to-docker-containers>  
4. <https://gongdear.com/articles/2024/07/23/1721745308242.html>

:::
