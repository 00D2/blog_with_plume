---
createTime: 2025/04/26 16:17:14
---
该脚本是用于，将固定文件夹中的配置文件进行解压，解压完成后的txt文件名中如果包含"_"，则进行移动，并通过FTPupload.py脚本备份至远端FTP服务器。






```shell
#!/bin/bash

UPLOAD_DIR="/var/www/html/uploadFile/uploads"
WORK_DIR="/var/www/html/uploadFile/devCfg/peizhi"
BAK_DIR="/var/www/html/uploadFile/devCfg/cfgBak"
DATE=$(date +%Y%m%d)

mv "$UPLOAD_DIR"/* "$WORK_DIR"/

mkdir "$BAK_DIR"/"$DATE"
cp "$WORK_DIR"/* "$BAK_DIR"/"$DATE"/

shopt -s globstar nullglob

# 解压后缀为tar.gz的文件
if comp=$(echo "$WORK_DIR"/*.tar.gz); [[ $comp ]]; then
    echo "存在tar.gz文件，开始解压……"
    for gz in "$WORK_DIR"/*.tar.gz; do
        tar xzvf "$gz" -C "$WORK_DIR"/
    done
    echo "tar.gz文件已解压完成。"
else
    echo "不存在tar.gz压缩文件，跳过相关解压步骤。"
fi

# 解压后缀为tar的文件
if comp=$(echo "$WORK_DIR"/*.tar); [[ $comp ]]; then
    echo "存在tar文件，开始解压……"
    for tar in "$WORK_DIR"/*.tar; do
        tar xvf "$tar" -C "$WORK_DIR"/
    done
    echo "tar文件已解压完成。"
else
    echo "不存在tar压缩文件，跳过相关解压步骤。"
fi

# 解压后缀为zip的文件
if comp=$(echo "$WORK_DIR"/*.zip); [[ $comp ]]; then
    echo "存在zip文件，开始解压……"
    for zip in "$WORK_DIR"/*.zip; do
        unzip -n "$zip" -d "$WORK_DIR"/
    done
    echo "zip文件已解压完成。"
else
    echo "不存在zip压缩文件，跳过相关解压步骤。"
fi

# 文件名规范化
echo "文件名规范化开始"
for file in "$WORK_DIR"/**/*; do
    if [ -f "$file" ] && [[ $file == *_* ]]; then
        mv "$file" "${file%_*}"
    fi
done
echo "文件名规范化完成"

python3 /var/www/html/uploadFile/scripts/FTPupload.py

rm -rf "$WORK_DIR"/*
find "$BAK_DIR"/ -mtime +31 -exec rm -f {} \;
find "$BAK_DIR"/ -empty -exec rm -rf {} \;
```

