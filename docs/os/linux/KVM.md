---
title: KVM
createTime: 2025/02/15 22:14:13
permalink: /article/8cgc15uh/
---
# KVM

## 查看虚拟机

virsh list

virsh list --all

## 查看虚拟机IP地址

virsh domifaddr xx

virsh domifaddr --domain xx

virsh domifaddr --domain xx --source arp

## 查看虚拟机配置文件

virsh edit xx

virsh dumpxml --domain xx

导出配置文件

virsh dumpxml --domain xx > /opt/xx.xml

virsh autostart --domain xx

## 创建虚拟机

virsh define x.xml
virsh start x
