---
icon: docker
author: 小苹果儿
date: 2023-11-04
category:
  - Docker
tag:
  - docker
  - 容器
---

# wireguard

```yaml
---
version: "2.1"
services:
  wireguard:
    image: linuxserver/wireguard
    container_name: wireguard
    cap_add:
      - NET_ADMIN
      - SYS_MODULE #optional
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/Shanghai
      - SERVERURL=xxx
      - SERVERPORT=51820 #optional
      - PEERS=2 #optional
      - PEERDNS=8.8.8.8 #optional
      - INTERNAL_SUBNET=10.13.13.0 #optional
      - ALLOWEDIPS=192.168.168.0/24 #optional
      - PERSISTENTKEEPALIVE_PEERS= #optional
      - LOG_CONFS=true #optional
    volumes:
      - /opt/wireguard/appdata/config:/config
      - /lib/modules:/lib/modules #optional
    ports:
      - 51820:51820/udp
    sysctls:
      - net.ipv4.conf.all.src_valid_mark=1
    restart: unless-stopped
```

::: tip 参考链接

1. <https://www.wireguard.com/>
2. <https://github.com/linuxserver/docker-wireguard>
:::
