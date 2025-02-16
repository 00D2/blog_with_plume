---
title: Traefik
createTime: 2025/02/15 22:14:13
permalink: /article/3lllacyr/
---
# Traefik

## 一、简介

Traefik 是一个优秀的开源边缘路由器，也就是反向代理工具。

相比于Nginx，它具有如下优点：

1. **自动服务发现**：传统的边缘路由器（或反向代理）需要一个配置文件，其中包含到您的服务的所有可能的路由，而 Traefik 从服务本身获取它们。
2. **原生兼容所有主要集群技术**，例如 Kubernetes、Docker、Docker Swarm、AWS、Mesos、Marathon，并且可以同时处理多个。
3. 无需维护和同步单独的配置文件，**自动实时更新**，无需重新启动，不会中断连接
4. 集成了漂亮的 `dashboard` 界面



## 二、安装

1. 下载镜像

   ```shell
   docker pull traefik:v2.6.3
   ```

2. 创建traefik目录

   ```shell
   mkdir traefik
   ```

3. 编辑配置文件

   ```shell
   cd traefik
   vim traefik.toml
   ```

     *配置文件的内容，在[官网](https://doc.traefik.io/traefik/getting-started/install-traefik/)进行获取。*

4. 启动窗口

   ```shell
   docker run -d -p 8080:8080 -p 80:80 \
     -v $PWD/traefik.yml:/etc/traefik/traefik.yml traefik:v2.6.3
   ```
