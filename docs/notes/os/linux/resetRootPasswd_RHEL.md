---
icon: uil:linux
author: 犄角蛙
title: RHEL8重置root密码
date: 2022-05-14
category:
  - Linux
  - 红帽
tag:
  - linux
  - 红帽
---

::: tip
适用于RHEL8操作系统。
:::

1. 重启系统

2. 使用按键`e`中断启动加载程序

3. 光标移动至linux行，使用按键`ctrl+e`跳转至末尾，输入`rd.break console=tty0`，通过按键`ctrl+x`继续启动系统

4. 重新挂载根文件系统

    ```shell
    mount -o remount,rw /sysroot
    ```

5. 切换至系统根文件系统

    ```shell
    chroot /sysroot
    ```

6. 使用passwd设置root账户密码

    ```shell
    echo new_password|passwd --stdin root
    ```

7. 设定SElinux重置标签
   *（如果SELinux是关闭的，就不需要touch）*

    ```shell
    touch /.autorelabel
    sync
    ```

8. 执行两次`ctrl+d`
