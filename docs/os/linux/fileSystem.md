---
title: 文件系统
author: 白色犄角
date: 2022-06-06
category:
  - 文件系统
  - Linux
tag:
  - 文件系统
---

## 虚拟机磁盘扩容

1. 在虚拟化层面，直接调整磁盘大小；
2. 进入系统，通过fdisk -l查看对应的磁盘信息；
3. 通过fdisk /dev/sd`a`创建分区；
4. 格式化新分区