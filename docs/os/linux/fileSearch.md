---
icon: search
author: 犄角套袜子
title: 查找文件
date: 2022-06-06
category:
  - 操作系统
  - Linux
tag:
  - file
  - find
---











在当前文件夹下，查找文件类型是普通文件、文件大小大于5M小于9M的文件，并执行ls -lh将文件列出

```bash
find . -type f -size +5M -size -9M -exec ls -lh {} \;
```

