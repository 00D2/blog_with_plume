---
icon: docker
author: 犄角蛙
date: 2023-11-04
category:
  - Docker
tag:
  - docker
  - 容器
---

# busybox

## 如何运行一个busybox容器

```shell
docker run -it busybox
```

## 如何使通过docker-compose部署的busybox一直保持运行状态

通过增加一个不中断运行的command命令，则可以使busybox一直处于运行状态。

```yaml
version: '3'
services:
  busybox:
    name: busybox
    image: busybox
    command: tail -f /dev/null
```
