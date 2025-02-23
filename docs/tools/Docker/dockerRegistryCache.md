---
icon: docker
title: 使用registry配置dockerhub缓存
author: 犄角套袜子
date: 2024-11-04
category:
  - Docker
tag:
  - docker
  - 容器
---


```yaml
version: '3.9'
services:
  registry:
    image: registry
    container_name: registry
    restart: always
    volumes:
      - "/etc/localtime:/etc/localtime"
      - "./data:/var/lib/registry"
      - "./config.yml:/etc/docker/registry/config.yml"
    ports:
      - '5000:5000'
```

config.yml

```yaml
version: 0.1
log:
  fields:
    service: registry
storage:
  cache:
    blobdescriptor: inmemory
  filesystem:
    rootdirectory: /var/lib/registry
http:
  addr: :5000
  headers:
    X-Content-Type-Options: [nosniff]
health:
  storagedriver:
    enabled: true
    interval: 10s
    threshold: 3
proxy:
  remoteurl: https://registry-1.docker.io
```
