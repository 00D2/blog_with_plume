---
icon: f5
title: 通过shell脚本将f5配置备份至远端SFTP服务器
author: 小苹果儿
date: 2022-09-09
category:
  - 网络
tag:
  - f5
  - 配置备份
---

> **该脚本目标可实现的效果为：**
>  
> 1. 判断HA双机配置是否是同步状态;  
> 2. 如不同步可进行HA主备机判断，并进行配置同步;
> 3. 配置同步完成后生成ucs配置文件（文件命令格式为设备主机名）；
> 4. 将配置文件通过SCP方式传送至远端SFTP服务器;
> 5. 在文件传输完成后，删除本地的文件。
> 6. 搭配crontab实时配置的定时保存及上传。
>  
> **脚本未完成及测试的部分：**  
>
> 1. 待测试N+M集群时的同步状态判断
>
> **适用版本**
> 该脚本仅在BIGIP V15版本进行了测试，其他版本未进行测试。

```shell
#!/bin/bash

statusFile=/var/prompt/ps1  #设备主备机状态
configSyncStatusFile=/var/prompt/cmiSyncStatus  #设备配置是否同步
deviceGroup=$(tmsh list cm device-group one-line | grep sync-failover | cut -d' ' -f3)  #获取设备HA组名
if [[ -r $configSyncStatusFile ]]; then
    read configSyncStatus < $configSyncStatusFile;
fi;

if [[ $configSyncStatus = "In Sync" ]];
    then 
    tmsh save sys ucs $(echo $HOSTNAME | cut -d'.' -f1)
        #expect交互脚本，用于SCP上传时的密码输入交互。
        /usr/bin/expect << EOF
        set timeout 30
        spawn bash -c "scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null /var/local/ucs/$(echo $HOSTNAME | cut -d'.' -f1).ucs root@1.1.1.1:/opt/dev-autobak/cfg/"
        expect "*password:" {send "111111\r"} 
        expect eof
EOF
    
    rm -f /var/local/ucs/$(echo $HOSTNAME | cut -d'.' -f1).ucs
elif [[ $configSyncStatus = "Changes Pending" ]];
    then
        if [ -r $statusFile ]; then
            read status <$statusFile
        fi

        if [[ $status = Standby ]];
            then 
            tmsh run cm config-sync from-group $deviceGroup   #如果配置不同步，且本机是备机时，且配置同步是从组到本设备。
            tmsh save sys ucs $(echo $HOSTNAME | cut -d'.' -f1)
                #expect交互脚本，用于SCP上传时的密码输入交互。
                /usr/bin/expect << EOF
                set timeout 30
                spawn bash -c "scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null /var/local/ucs/$(echo $HOSTNAME | cut -d'.' -f1).ucs root@1.1.1.1:/opt/dev-autobak/cfg/"
                expect "*password:" {send "111111\r"} 

                expect eof
EOF
    
            rm -f /var/local/ucs/$(echo $HOSTNAME | cut -d'.' -f1).ucs
        elif [[ $status = Active ]];
            then 
            tmsh run cm config-sync to-group $deviceGroup   #如果配置不同步，且本机是备机时，且配置同步是从本设备到组。
            tmsh save sys ucs $(echo $HOSTNAME | cut -d'.' -f1)
                #expect交互脚本，用于SCP上传时的密码输入交互。
                /usr/bin/expect << EOF
                set timeout 30
                spawn bash -c "scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null /var/local/ucs/$(echo $HOSTNAME | cut -d'.' -f1).ucs root@1.1.1.1:/opt/dev-autobak/cfg/"
                expect "*password:" {send "111111\r"} 
    
                expect eof
EOF
    
            rm -f /var/local/ucs/$(echo $HOSTNAME | cut -d'.' -f1).ucs
        else
            exit
        fi
elif [[ $configSyncStatus = "Standalone" ]];
    then
    tmsh save sys ucs $(echo $HOSTNAME | cut -d'.' -f1)
        #expect交互脚本，用于SCP上传时的密码输入交互。
        /usr/bin/expect << EOF
        set timeout 30
        spawn bash -c "scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null /var/local/ucs/$(echo $HOSTNAME | cut -d'.' -f1).ucs root@1.1.1.1:/opt/dev-autobak/cfg/"
        expect "*password:" {send "111111\r"} 

        expect eof
EOF
    
    rm -f /var/local/ucs/$(echo $HOSTNAME | cut -d'.' -f1).ucs
else
    exit
fi     
```
