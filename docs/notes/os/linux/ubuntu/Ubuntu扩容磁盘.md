---
title: Ubuntu扩容磁盘
icon: mdi:ubuntu
---

## 查看磁盘信息

使用命令查看磁盘信息，确认是否有空余空间。

```bash
sudo fdisk -l
```

如图所示，/dev/sda这块磁盘，空间共512G，但实际已经分配的空间不足512G，因此判断有空间未分配。可以继续下一步动作。

![image-20250505165631799](https://img.jinguo.link/d/20250505165631-becddd8c952de6f7.png)

## 创建新分区

使用命令对磁盘创新新的分区。

```bash
sudo fdisk /dev/sda
```

根据提示，输入`m`可以查看fdisk命令的提示信息。

![image-20250505165957834](https://img.jinguo.link/d/20250505165957-8bee19add6d31216.png)

输入`p`，可以列出当前磁盘已经创建的分区信息。

输入`n`，可以创建新的磁盘分区，有如下两个信息需要进行确认或者调整：

1. Partition number，可以保持默认，直接回车即可；

2. 磁盘大小，可以输入sector信息，也可以直接使用`+100G`这种方式。如图所示，将磁盘所有剩余空间均划分给该分区，则直接回车。

![image-20250505170048731](https://img.jinguo.link/d/20250505170048-7e06868d97ca38e4.png)

输入`p`，查看新的分区信息。

输入`w`，保存对磁盘分区的调整，并退出。

![image-20250505170125955](https://img.jinguo.link/d/20250505170125-e252e967948074e7.png)

## 创建PV

使用命令，创建新的PV。

```bash
sudo pvcreate /dev/sda6
```

![image-20250505170327990](https://img.jinguo.link/d/20250505170328-7e7b242dee07f6c8.png)

## 将PV加入VG

### 查看当前VG信息

```bash
sudo vgdisplay  ##可以查看到vg的名称以及vg剩余的PE空间。
sudo pvs				##可以查看到所有pe的信息（包含是否已经加入到vg）。
```

### 将PV加入VG

```bash
sudo vgextend ubuntu-vg /dev/sda6	##将PV加入到VG
```

![image-20250505170549104](https://img.jinguo.link/d/20250505170549-4a81080a26e4f0e9.png)

### 查看扩容后的VG状态

![image-20250505170638246](https://img.jinguo.link/d/20250505170638-075398c4f236ef1f.png)

## 扩容LV

### 查看当前系统的LV信息

```bash
sudo lvdisplay
```

![image-20250506141125990](https://img.jinguo.link/d/20250506141131-ce8ea68dde57841f.png)

### 扩容LVM

```bash
sudo lvextend -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
```

*注意：此处扩容后，仅是对LVM逻辑卷进行扩容，文件系统是不生效的。通过`df -h`查看文件系统大小未发生变化，需要通过resize2fs对文件系统进行扩容。*

### 扩容文件系统

```bash
sudo resize2fs /dev/ubuntu-vg/ubuntu-lv
df -h			##再次查看文件系统大小，已经扩容成功。
```

![image-20250505171250174](https://img.jinguo.link/d/20250505171250-501c1c56c2c9c710.png)
