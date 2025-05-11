---
icon: arcticons:shell-terminal
author: 犄角蛙
title: Linux Shell命令
date: 2022-05-14
category:
  - 操作系统
  - Linux
tag:
  - linux
  - shell
---



## Linux命令大全

[Linux命令大全](https://www.linuxcool.com/)

- echo $PATH  
  显示PATH变量
- echo $$  
  显示当前命令窗口的进程ID
- pstree -p  
  树状显示系统进程
- $PS1
  用户登录后的命令提示
  例如
  可以修改：PS1=''
- 命令替换
  - $()
  - ``
  - 例：ls $(which bash)
  - 例：ls \`which bash`

```shell
#!/bin/bash
read -p "please input ip addr" ip_mgmt
echo ${ip_mgmt}
```


## 条件判断

### 文件判断

test -e file_name

[ -e ] file_name



###  数值判断

- 单条件判断

```bash
[ $num eq|gt|lt|ge|le|ne number ]
```

- 多条件判断

```bash
[[ $num eq|gt|lt|ge|le|ne number && $num eq|gt|lt|ge|le|ne number ]]
```

http://c.biancheng.net/view/2751.html




>
| 参数 |   含义   |
| :--: | :------: |
|  eq  |   等于   |
|  gt  |   大于   |
|  lt  |   小于   |
|  ge  | 大于等于 |
|  le  | 小于等于 |
|  ne  |  不等于  |

### 字符串判断

```
name = xiaoguo
[ $name == xiaoguo ]
判断变量是否为xiaoguo
[ $name != xiaoguo ]
判断变量是否不为xiaoguo
[ -z $name ]
判断变量内容是否为空
[ -n $name ]
判断变量内容是否非空
```



### 多元素判断 

```
name=xiaoguo
num=18

[ $num -gt 90 -a $num -lt 110 ]
[ ${name} == lisi -a ${num} -lt 100 ] && echo true
[[ ${name} == lisi || $num -gt 100 ]]
[ ${name} == lisi -o $num -gt 100 ]

```



