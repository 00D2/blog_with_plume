---
icon: docker
title: 什么是容器
author: 白色犄角
date: 2022-07-04
category:
  - Docker
tag:
  - docker
  - 容器
---


轻量的虚拟机。

cgroup：实现资源限制
namespace：实现隔离

Linux中的namespace:

## Docker常用命令

```shell
 docker run -it --rm alpine:latest /bin/sh
```

- 参数解析：
  - `-it`： `-i`参数，是用于提供交互操作；`-t`是提供一个终端。总体就是提供一个交互式的终端，用于输入命令并查看返回结果。
  - `--rm`： 在容器退出后直接删除该容器。
  - `/bin/sh`： shell模式。可以简写`sh`，或其他shell类型：`/bin/bash`、`bash`等。
