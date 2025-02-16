---
icon: shell
author: 小苹果儿
title: 一些批量重命名的脚本
date: 2022-06-06
category:
  - 操作系统
  - Linux
tag:
  - 重命名
---

## WS.jpeg

```shell
current_date=$(date +%Y%m%d)
counter=1

for file in *.jpeg; do
  if [[ "$file" =~ ^WS-RN-PD-[0-9]{8}-[0-9]{6}\.jpeg$ ]]; then
    echo "Skipping already formatted file: $file"
    continue
  fi
  ext="${file##*.}"
  printf -v seq "%06d" "$counter"
  echo mv "$file" "WS-RN-PD-$current_date-$seq.$ext"
  ((counter++))
done
```

## BF.jpeg

```shell
current_date=$(date +%Y%m%d)
counter=1

for file in *.jpeg; do
  if [[ "$file" =~ ^BF-RN-PD-[0-9]{8}-[0-9]{6}\.jpeg$ ]]; then
    echo "Skipping already formatted file: $file"
    continue
  fi
  ext="${file##*.}"
  printf -v seq "%06d" "$counter"
  echo mv "$file" "BF-RN-PD-$current_date-$seq.$ext"
  ((counter++))
done
```

## BC.jpeg

```shell
current_date=$(date +%Y%m%d)
counter=1

for file in *.jpeg; do
  if [[ "$file" =~ ^BC-RN-PD-[0-9]{8}-[0-9]{6}\.jpeg$ ]]; then
    echo "Skipping already formatted file: $file"
    continue
  fi
  ext="${file##*.}"
  printf -v seq "%06d" "$counter"
  echo mv "$file" "BC-RN-PD-$current_date-$seq.$ext"
  ((counter++))
done
```

## Sexy.jpeg

```shell
current_date=$(date +%Y%m%d)
counter=1

for file in *.jpeg; do
  if [[ "$file" =~ ^Sexy-RN-PD-[0-9]{8}-[0-9]{6}\.jpeg$ ]]; then
    echo "Skipping already formatted file: $file"
    continue
  fi
  ext="${file##*.}"
  printf -v seq "%06d" "$counter"
  echo mv "$file" "Sexy-RN-PD-$current_date-$seq.$ext"
  ((counter++))
done
```
