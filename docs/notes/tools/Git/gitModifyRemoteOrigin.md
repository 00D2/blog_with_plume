---
icon: fa-brands:git
author: potao1314
title: git修改远程仓库地址
date: 2019-07-18
category:
  - git
tag:
  - git
  - github
---

### 远程仓库地址

有三种修改方式

1、 修改命令

```bash
git remote set-url origin [url]
```

2、 先删后加

```mipsasm
git remote rm origin
git remote add origin [url]
```

3、直接修改config文件

修改后如果git pull会提示fatal: refusing to merge unrelated histories这个问题:
解决方法:

```bash
git pull origin master --allow-unrelated-histories
```

### 添加远程仓库

```shell
git remote add origin [url]  
```

```shell
git remote -v
```

::: info 版权声明

本文转载于思否博主[potato](https://segmentfault.com/blog/potato_blog)的原创文章，采用《署名-非商业性使用-禁止演绎 4.0 国际》许可协议。  
原文链接：[https://segmentfault.com/a/1190000019795998](https://segmentfault.com/a/1190000019795998)

:::
