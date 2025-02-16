---
title: DNF软件包管理器
author: 小苹果儿
date: 2022-05-14
category:
  - 软件包管理
  - Linux
tag:
  - dnf
---


dnf是新一代的rpm软件包管理器。首次出现在 Fedora 18 这个发行版中。而最近，它取代了yum，正式成为 Fedora 22 的包管理器。

dnf包管理器克服了yum包管理器的一些瓶颈，提升了包括用户体验，内存占用，依赖分析，运行速度等多方面的内容。dnf使用 RPM, libsolv 和 hawkey 库进行包管理操作。尽管它没有预装在 CentOS 和 RHEL 7 中，但你可以在使用yum的同时使用dnf 。

当然dnf也不是完美的，例如：在dnf中没有 –skip-broken 命令，并且没有替代命令供选择。 没有判断哪个包提供了指定依赖的 resolvedep 命令，没有用来列出某个软件依赖包的 deplist 命令等等。

RHEL8中，DNF已取代YUM作为包管理器。



