---
icon: fa-brands:git
title: git的配置文件
author: RebeccaYan
date: 2022-05-04
category:
  - git
  - github
tag:
  - git
  - github
---

## Git学习之查看config配置

git的配置指令是 `git config`。用于配置git的用户，邮箱，域名等信息。详细信息可参考[git-scm.com](https://git-scm.com/)的[git-config](https://git-scm.com/docs/git-config)。

config配置有3个层级：

- system（系统级别）
- global（用户级别）
- local（仓库级别）

覆盖优先级为local > global > system。优先读取local，其次是global，最后是system。

### 查看配置

读取system级别的配置：

```bash
git config --system --list
```

读取global级别的配置：

```bash
git config --global --list
```

读取local级别的配置：

```bash
git config --local --list
```

### 修改配置

如果想修改配置的话，加上不同的参数就可以在不同的级别上配置了。

比如配置global级别的信息：

```bash
git config --global user.name "yourusername"
git config --global user.email "youremail@email.com"
```

### 删除配置

```bash
git config --unset user.name
```

:::info 版权声明

本文转载于简书博主[RebeccaYan](https://www.jianshu.com/u/e529b37dc57d)的文章。  
原文链接：<https://www.jianshu.com/p/1ae2ff6c90de>

:::
