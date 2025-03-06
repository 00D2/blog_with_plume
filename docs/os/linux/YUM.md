---
title: YUM软件包管理器
author: 犄角蛙
date: 2022-06-06
category:
  - 软件包管理
  - Linux
tag:
  - yum
---





```bash
yum grouplist

yum groupinstall 'xxx'

yum info software name

yum list | grep software name

yum search software name
```



yum repolist

yum clean all

yum makecache

yum history

yum provides command



查找服务文件

rpm -ql software | grep service





### repo文件编写

> [BaseOS]
> name=Qcloud-$releasever - BaseOS
> baseurl=http://mirrors.tencentyun.com/centos/$releasever/BaseOS/$basearch/os/
> enabled=1
> gpgcheck=1
> gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-Qcloud-8



导入gpgkey

1. 在repo配置文件中指定
2. 通过rpm --import x导入
3. 通过编辑vim /etc/yum.conf将全局gpgkey的校验关闭



yum-config-manager

```bash
yum-config-manager --add-repo\' '|= url
```



## YUM|DNF|RPM的比较

https://www.redhat.com/sysadmin/how-manage-packages
