---
icon: docker
title: 好玩又强大的Docker
author: 犄角蛙
date: 2022-06-10
category:
  - Docker
tag:
  - docker
  - 容器
---

## [coderlin/image-compress](https://github.com/GoogleChromeLabs/squoosh)

> 图片压缩。  

DockerHub地址：<https://registry.hub.docker.com/r/coderlin/image-compress>  
网页版：<https://squoosh.app/>

## [xhofe/alist](https://github.com/alist-org/alist)

  > *🗂️一个支持多存储的文件列表程序，使用 Gin 和 React 。*
  >
  > DockerHub地址：<https://hub.docker.com/r/xhofe/alist>

## [portainer/portainer-ce](https://github.com/portainer/portainer-ce)

- <https://space.bilibili.com/19956596>

## Rocket.Chat

## [traefik/traefik](https://github.com/traefik/traefik)

## [wagoodman/dive](https://github.com/wagoodman/dive)

## [SeaTable](https://hub.docker.com/r/seatable/seatable-developer)

  > :shamrock:一款在线表格工具，可以私有化部署，用于团队内容共享、协作。官方还提供企业版等服务，详情请查看官方网站。
  >
  > 官方网站：[国内版](https://seatable.cn/)、[国际版](https://seatable.io/)
  > 
  > 手册：[手册](https://docs.seatable.cn/published/seatable-manual/upgrade/upgrade_manual-ce.md)
  >
  > 更新日志：[changelog](https://seatable.io/docs/changelog/)
  >
  > Github地址：[https://github.com/seatable](https://github.com/seatable)

## [flare](https://hub.docker.com/r/soulteary/flare)

  > Github地址：<https://github.com/soulteary/docker-flare>

## [netboxcommunity/netbox](https://hub.docker.com/r/netboxcommunity/netbox)

  > :package: Netbox是由DigitalOcean开源的DCIM系统，可私有化部署，对于小型数据中心内部的机柜、弱电、设备等可以提供易用的管理系统。
  >
  > 更新日志：<https://github.com/netbox-community/netbox/releases>
  >
  > Github地址：<https://github.com/netbox-community/netbox-docker>

## [jellyfin](https://github.com/jellyfin/jellyfin)

## [n8n](https://github.com/n8n-io/n8n)

## [it-tools](https://github.com/CorentinTh/it-tools)

  > Docker Hub地址：<https://hub.docker.com/r/corentinth/it-tools>
  >
  > Github地址：<https://github.com/CorentinTh/it-tools>

## [ddns-go](https://github.com/jeessy2/ddns-go)

  > Docker Hub地址：<https://hub.docker.com/r/jeessy/ddns-go>  
  >
  > Github地址：<https://github.com/jeessy2/ddns-go>
  >
  > ```yaml
  > services:
  >     ddns-go:
  >         command: '-f 3000'
  >         image: jeessy/ddns-go:latest
  >         volumes:
  >             - '/opt/apps/ddns-go:/root'
  >         ports:
  >             - '9876:9876'
  >         restart: always
  >         container_name: ddns-go
  > ```

## [openldap](https://hub.docker.com/r/bitnami/openldap)

## [Bitwarden](https://github.com/bitwarden/server)

  > 开源的密码管理工具。
  > Docker Hub地址：<https://hub.docker.com/r/bitwarden/self-host>

## [Stirling-PDF](https://github.com/Stirling-Tools/Stirling-PDF)

  > 一个功能强大的、本地部署的、在线访问的PDF工具箱，企业个人皆可用，提供了一系列丰富的PDF操作功能，通过简单的操作，就可以实现PDF合并、分割P、压缩、格式转换等功能。
  > Github地址：<https://github.com/Stirling-Tools/Stirling-PDF>
  > Docker Hub地址：<https://hub.docker.com/r/frooodle/s-pdf>
  > "有趣的开源集市"微信公众号介绍：<https://mp.weixin.qq.com/s/ZhODnceCgFWBfiXm0IHolA>

## [Calibre](https://calibre-ebook.com/)

  > 图书管理系统。
  > Docker Hub地址：<https://hub.docker.com/r/linuxserver/calibre>

### [talebook](https://hub.docker.com/r/talebook/talebook)

  > 这是一个基于Calibre的简单的图书管理系统，支持在线阅读。主要特点是：
  > 美观的界面：由于Calibre自带的网页太丑太难用，于是基于Vue，独立编写了新的界面，支持PC访问和手机浏览；
  > 支持多用户：为了网友们更方便使用，开发了多用户功能，支持豆瓣（已废弃）、QQ、微博、Github等社交网站的登录；
  > 支持在线阅读：借助Readium.js⁠ 库，支持了网页在线阅读电子书；
  > 支持邮件推送：可方便推送到Kindle；
  > 支持OPDS：可使用KyBooks⁠等APP方便地读书；
  > 支持一键安装，网页版初始化配置，轻松启动网站；
  > 优化大书库时文件存放路径，可以按字母分类、或者文件名保持中文；
  > 支持快捷更新书籍信息：支持从百度百科、豆瓣搜索并导入书籍基础信息；
  > 支持私人模式：需要输入访问码，才能进入网站，便于小圈子分享网站；

## [Draw.io](https://hub.docker.com/r/jgraph/drawio)

## [immich](https://github.com/immich-app/immich)

  > 高性能的照片和视频自托管解决方案.
  > 官网<https://immich.app/>

## [onedrive](https://github.com/abraunegg/onedrive)

  > 一个Linux上的Microsoft Onedrive客户端工具。

### 编写docker-compose.yaml文件

> 文件参考如下。
>
> ONEDRIVE_SINGLE_DIRECTORY：表示只同步一个文件夹

```yaml
services:
  onedrive:
    container_name: onedrive
    image: driveone/onedrive:latest
    restart: unless-stopped
    environment:
      - ONEDRIVE_UID=1000
      - ONEDRIVE_GID=1000
      - ONEDRIVE_SINGLE_DIRECTORY="404.UploadV"
      - ONEDRIVE_RESYNC=1
    volumes: 
      - /home/appuser/.config/onedrive:/onedrive/conf
      - /opt/vd/:/onedrive/data
```

### 启动onedrive

```bash
docker compose up -d
docker exec onedrive onedrive --verbose       #查看onedrive状态
```

![image-20241113150524495](https://img.jinguo.link/d/image-20241113150524495.png)

### 登录onedrive

> 输入命令后，将系统给出的URL复制到电脑的浏览器中，并使用对应的office账号进行登录。
>
> 登录完成，浏览器会显示空白内容。此时将浏览器地址栏中的URL复制回docker的交互界面，等待出现认证成功的提示即可。

```bash
docker exec -it onedrive onedrive onedrive    #进行登录
```

![image-20241113150704103](https://img.jinguo.link/d/image-20241113150704103.png)

**注意：onedrive容器重启后，也需要重新登录。可通过`docker exec onedrive onedrive --verbose`进行查看确认。**


:::tip
参考链接：<https://www.moerats.com/archives/740/#%E5%90%8C%E6%AD%A5%E9%85%8D%E7%BD%AE>
:::

## [wireguard](https://www.wireguard.com/)

> VPN软件
>
> ```yaml
> services:
>   wireguard:
>     image: linuxserver/wireguard
>     container_name: wireguard
>     cap_add:
>       - NET_ADMIN
>       - SYS_MODULE #optional
>     environment:
>       - PUID=1000
>       - PGID=1000
>       - TZ=Asia/Shanghai
>       - SERVERURL=my.example.com #个人域名
>       - SERVERPORT=51820 #optional
>       - PEERS=2 #optional #等于1则为客户端模式。
>       - PEERDNS=8.8.8.8 #optional
>       - INTERNAL_SUBNET=10.13.13.0 #optional
>       - ALLOWEDIPS=192.168.68.0/24 #optional #内部网段
>       - PERSISTENTKEEPALIVE_PEERS= #optional
>       - LOG_CONFS=true #optional
>     volumes:
>       - /opt/apps/wireguard/appdata/config:/config
>       - /lib/modules:/lib/modules #optional
>     ports:
>       - 51820:51820/udp
>     sysctls:
>       - net.ipv4.conf.all.src_valid_mark=1
>     restart: unless-stopped
> ```
