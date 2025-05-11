---
index: true
icon: file-icons:microsoft-excel
title: 通过Excel函数整理IP地址信息
author: 犄角蛙
date: 2022-12-09
category:
  - Office
tag:
  - office
  - excel
---

## 通过函数根据IP地址自动生成网关

```bash
=LEFT(C12,FIND("X",SUBSTITUTE(C12,".","X",3))-1)&".1"
```

其中C12代表IP地址所在的单元格。

## 通过函数根据IP地址自动计算VLAN

>该方法来自于CHATGPT。可正常识别IP地址第三段个位数。
>这个公式首先使用 SUBSTITUTE 函数将每个点替换为空格，然后使用 MID 函数提取第三段的数值，最后使用 TRIM 函数去>除可能存在的空格，然后通过 + 0 将其转换为数值。这个公式适用于IPv4地址的常见格式。

```bash
=SUM(3000,(TRIM(MID(SUBSTITUTE(D42, ".", REPT(" ", LEN(D42))), (3-1)*LEN(D42)+1, LEN(D42))) + 0))
```

其中D42代表IP地址所在的单元格。

### 增加了基于IP地址第2位的判断，当存在多个网段时，根据第2位，生成相应的VLAN号。

```bash
=IF(MID(D42, FIND(".", D42) + 1, FIND(".", D42, FIND(".", D42) + 1) - FIND(".", D42) - 1) = "130", 
    1000 + MID(D42, FIND(".", D42, FIND(".", D42) + 1) + 1, FIND(".", D42, FIND(".", D42, FIND(".", D42) + 1) + 1) - FIND(".", D42, FIND(".", D42) + 1) - 1) + 0, 
    IF(MID(D42, FIND(".", D42) + 1, FIND(".", D42, FIND(".", D42) + 1) - FIND(".", D42) - 1) = "131", 
        1300 + MID(D42, FIND(".", D42, FIND(".", D42) + 1) + 1, FIND(".", D42, FIND(".", D42, FIND(".", D42) + 1) + 1) - FIND(".", D42, FIND(".", D42) + 1) - 1) + 0,
        IF(MID(D42, FIND(".", D42) + 1, FIND(".", D42, FIND(".", D42) + 1) - FIND(".", D42) - 1) = "132", 
            2000 + MID(D42, FIND(".", D42, FIND(".", D42) + 1) + 1, FIND(".", D42, FIND(".", D42, FIND(".", D42) + 1) + 1) - FIND(".", D42, FIND(".", D42) + 1) - 1) + 0,
            IF(MID(D42, FIND(".", D42) + 1, FIND(".", D42, FIND(".", D42) + 1) - FIND(".", D42) - 1) = "133", 
                2300 + MID(D42, FIND(".", D42, FIND(".", D42) + 1) + 1, FIND(".", D42, FIND(".", D42, FIND(".", D42) + 1) + 1) - FIND(".", D42, FIND(".", D42) + 1) - 1) + 0,
                IF(OR(MID(D42, FIND(".", D42) + 1, FIND(".", D42, FIND(".", D42) + 1) - FIND(".", D42) - 1) = "134", MID(D42, FIND(".", D42) + 1, FIND(".", D42, FIND(".", D42) + 1) - FIND(".", D42) - 1) = "136"), 
                    3000 + MID(D42, FIND(".", D42, FIND(".", D42) + 1) + 1, FIND(".", D42, FIND(".", D42, FIND(".", D42) + 1) + 1) - FIND(".", D42, FIND(".", D42) + 1) - 1) + 0, 
                    "不符合要求")))))

```
