---
icon: fa-brands:git
author: sunpro518
title: git cmd中文乱码解决方法
date: 2018-07-30
category:
  - git
tag:
  - git
---



## git cmd中文乱码解决方法

在win10中，用cmd或者bash中使用git时候，经常遇到乱码问题，网上类似的教程很多，一般可以直接在cmd/bash中输入如下设置命令：

```shell
git config --global core.quotepath false 
git config --global gui.encoding utf-8
git config --global i18n.commit.encoding utf-8 
git config --global i18n.logoutputencoding utf-8
//bash环境下：
export LESSCHARSET=utf-8
//cmd环境下：
set LESSCHARSET=utf-8
```

 

这样设置完后，当前命令窗口是没问题的。但是，另打开一个还是不行。然后就想到应该是最后一句的问题。这一个并没有将这个变量保存起来。所以，就直接将最后一个变量添加到Windows环境变量中：



---

::: info 版权声明

本文为CSDN博主「sunpro518」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。  
原文链接：[https://blog.csdn.net/sunjinshengli/article/details/81283009](https://blog.csdn.net/sunjinshengli/article/details/81283009)

:::
