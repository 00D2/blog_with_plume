---
icon: docker
title: alist
author: 白色犄角
date: 2022-06-10
category:
  - Docker
tag:
  - docker
  - 容器
---

- docker run格式

```shell
sudo docker run -d --restart=unless-stopped -v /etc/alist:/opt/alist/data -v /opt/test:/test -p 5244:5244 -e PUID=0 -e PGID=0 -e UMASK=022 --name="alist" xhofe/alist:latest
```

- docker compose格式

```yaml
services:
    alist:
        image: xhofe/alist:latest
        container_name: alist
        environment:
            - UMASK=022
            - PGID=0
            - PUID=0
        ports:
            - '5244:5244'
        volumes:
            - '/opt/jellyfin/media/404.UploadV:/data1'
            - '/etc/alist:/opt/alist/data'
        restart: unless-stopped
```
