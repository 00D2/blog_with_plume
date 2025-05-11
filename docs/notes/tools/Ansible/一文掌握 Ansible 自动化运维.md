---
icon: mdi:ansible
author: kangvcar
title: 一文掌握 Ansible 自动化运维
date: 2018-06-14
category:
  - ansible
tag:
  - ansible
---

## 一、基本部署
### 安装 Ansible

```bash
# yum -y install epel-release
# yum list all *ansible*
# yum info ansible
# yum -y install ansible    
```

### Ansible 配置文件
```
/etc/ansible/ansible.cfg    主配置文件
/etc/ansible/hosts          Inventory
/usr/bin/ansible-doc        帮助文件
/usr/bin/ansible-playbook   指定运行任务文件
```
### 定义 Inventory

```bash
# cd /etc/ansible/
# cp hosts{,.bak}
# > hosts

# cat hosts
[webserver]
127.0.0.1
192.168.10.149

[dbserver]
192.168.10.113
```

### 使用秘钥方式连接
```bash
# ssh-keygen -t rsa 
# ssh-copy-id -i /root/.ssh/id_rsa.pub root@192.168.10.149
# ssh-copy-id -i /root/.ssh/id_rsa.pub root@192.168.10.113
# ssh-copy-id -i /root/.ssh/id_rsa.pub root@127.0.0.1
```

### 使用帮助
```bash
# ansible-doc -l                列出ansible所有的模块
# ansible-doc -s MODULE_NAME    查看指定模块具体适用
```
### Ansible 命令应用基础
```bash
语法：ansible <host-pattern> [-f forks] [-m module_name] [-a args]

<host-pattern>  这次命令对哪些主机生效的
    inventory group name
    ip
    all
-f forks        一次处理多少个主机
-m module_name  要使用的模块
-a args         模块特有的参数

# ansible 192.168.10.113 -m command -a 'date'
# ansible webserver -m command -a 'date'
# ansible all -m command -a 'date'
```

## 二、常见模块
```bash
command     命令模块(默认模块)用于在远程主机执行命令；不能使用变量，管道等
    # ansible all -a 'date'
```

```bash
cron        计划任务    
    month   指定月份
    minute  指定分钟
    job     指定任务
    day     表示那一天
    hour    指定小时
    weekday 表示周几
    state   表示是添加还是删除
        present：安装
        absent：移除
    # ansible webserver -m cron -a 'minute="*/10" job="/bin/echo hello" name="test cron job"'   #不写默认都是*，每个任务都必须有一个名字 
    # ansible webserver -a 'crontab -l'
    # ansible webserver -m cron -a 'minute="*/10" job="/bin/echo hello" name="test cron job" state=absent'  #移除任务
```

```bash
user    用户账号管理
    name    用户名
    uid     uid
    state   状态  
    group   属于哪个组
    groups  附加组
    home    家目录
    createhome  是否创建家目录
    comment 注释信息
    system  是否是系统用户
    
    # ansible all -m user -a 'name="user1"'
    # ansible all -m user -a 'name="user1" state=absent'
```

```
group   组管理
    gid     gid      
    name    组名               
    state   状态           
    system  是否是系统组
    # ansible webserver -m group -a 'name=mysql gid=306 system=yes'
    # ansible webserver -m user -a 'name=mysql uid=306 system=yes group=mysql'
```
```bash
copy    复制文件(复制本地文件到远程主机的指定位置)
    src     定义本地源文件路径
    dest    定义远程目录文件路径(绝对路径)
    owner   属主
    group   属组
    mode    权限
    content 取代src=,表示直接用此处的信息生成为文件内容
    # yum -y install libselinux-python
    # ansible all -m copy -a 'src=/etc/fstab dest=/tmp/fstab.ansible owner=root mode=640'
    # ansible all -m copy -a 'content="hello ansible\nHi ansible" dest=/tmp/test.ansible' 
```
```bash
file    设置文件的属性
    path|dest|name  对那个文件做设定

    创建文件的符号链接：
        src：    指定源文件
        path：   指明符号链接文件路径
    # ansible all -m file -a 'owner=mysql group=mysql mode=644 path=/tmp/fstab.ansible'
    # ansible all -m file -a 'path=/tmp/fstab.link src=/tmp/fstab.ansible state=link'
```
```bash
ping    测试指定主机是否能连接
    # ansible all -m ping 
```
```bash
service 管理服务运行状态
    enabled 是否开机自动启动
    name    指定服务名
    state   指定服务状态
        started     启动服务
        stoped      停止服务
        restarted   重启服务
    arguments   服务的参数
    # ansible webserver -m service -a 'enabled=true name=httpd state=started'
```
```bash
shell   在远程主机上运行命令
    尤其是用到管道变量等功能的复杂命令
    # ansible all -m shell -a 'echo magedu | passwd --stdin user1'
```
```bash
script  将本地脚本复制到远程主机并运行之
    # ansible all -m script -a '/tmp/test.sh'
```
```bash
yum     安装程序包
    name    程序包名称(不指定版本就安装最新的版本latest)
    state   present,latest表示安装，absent表示卸载
    # ansible webserver -m yum -a 'name=httpd'
    # ansible all -m yum -a 'name=ntpdate'  #默认就是安装
    # ansible all -m yum -a 'name=ntpdate state=absent'
```
```bash
setup   收集远程主机的facts
    每个被管理节点在接受并运行管理命令之前，会将自己主机相关信息，如操作系统版本，IP地址等报告给远程的ansible主机 
    # ansible all -m setup
```

## 三、Ansible playbook
### 组成结构：

```bash
inventory       #以下操作应用的主机
modules         #调用哪些模块做什么样的操作
ad hoc commands #在这些主机上运行哪些命令
playbooks   
    tasks       #任务,即调用模块完成的某操作
    variable    #变量
    templates   #模板
    handlers    #处理器，由某事件触发执行的操作
    roles       #角色
```

## 四、YAML
### 4.1 YAML 介绍
YAML 是一个可读性高的用来表达资料序列的格式。YAML 参考了其它多种语言，包括：XML、C 语言、Python、Perl 以及电子邮件格式 RFC2822 等。ClarkEvans 在 2001 年首次发表了这种语言，另外 Ingy dot Net 与 Oren Ben-Kiki 也是这语言的共同设计者。

YAML Ain't Markup Language, 即 YAML 不是 XML，不过，在开发这种语言时，YAML 的意思其实是："Yet Another Markup Language"(仍是一种标记语言)，其特性：

- YAML 的可读性好
- YAML 和脚本语言的交互性好
- YAML 使用实现语言的数据类型
- YAML 有一个一致的信息模型
- YAML 易于实现
- YAML 可以基于流来处理
- YAML 表达能力强，扩展性好
> 更多的内容及规范参见 http://www.yaml.org

###　4.2 YAML 语法
YAML 的语法和其他高阶语言类似，并且可以简单表达清单、散列表、标量等数据结构，其结构 (structure) 通过空格来展示，序列 (sequence) 里的项用 "-" 来表示，Map 里面的键值对用 ":" 分割，下面是一个示例。

```yaml
name: john smith
age: 41
gender: male
spouse:
    name:jane smith
    age:37
    gender: female
children:
    -   name:jimmy smith
        age:17
        gender: male
    -   name:jenny smith
        age: 13
        gender: female
```
YAML 文件扩展名通常为.yaml，如 example.yaml

#### 4.2.1 list
列表的所有元素均使用 "-" 打头，例如：

```yaml
# A list of testy fruits
- Apple
- Orange
- Strawberry
- Mango
```

#### 4.2.2 dictionary
字典通过 key 与 value 进行标识，例如：

```yaml
---
# An employee record
name: Example Developer
job: Developer
skill: Elite
```
也可以将 key:value 放置于 {} 中进行表示，例如：
```yaml
---
#An exmloyee record
{name: Example Developer, job: Developer, skill: Elite}
```

## 五、Ansible 基础元素
### 5.1 变量
####　5.1.1 变量命名
变量名仅能由字母、数字和下划线组成，且只能以字母开头。

####　5.1.2 facts
facts 是由正在通信的远程目标主机发回的信息，这些信息被保存在 ansible 变量中。要获取指定的远程主机所支持的所有 facts，可使用如下命令进行：

```bash
#ansible hostname -m setup
```
####　5.1.3 register
把任务的输出定义为变量，然后用于其他任务，实例如下：
```yaml
tasks:
    - shell: /usr/bin/foo
      register: foo_result
      ignore_errors: True
```
####　5.1.4 通过命令行传递变量
在运行 playbook 的时候也可以传递一些变量供 playbook 使用，示例如下：

```bash
#ansible-playbook test.yml --extra-vars "hosts=www user=mageedu"
```
####　5.1.5 通过 roles 传递变量
当给一个主机应用角色的时候可以传递变量，然后在角色内使用这些变量，示例如下：
```yaml
- hosts: webserver
  roles:
    - common
    - {role: foo_app_instance, dir: '/web/htdocs/a.com', port: 8080}
```
### 5.2 Inventory
  ansible 的主要功用在于批量主机操作，为了便捷的使用其中的部分主机，可以在 inventory file 中将其分组命名，默认的 inventory file 为`/etc/ansible/hosts`

inventory file 可以有多个，且也可以通过 Dynamic Inventory 来动态生成。

####　5.2.1 inventory 文件格式
inventory 文件遵循 INI 文件风格，中括号中的字符为组名。可以将同一个主机同时归并到多个不同的组中；此外，当如若目标主机使用非默认的 SSH 端口，还可以在主机名称之后使用冒号加端口号来表明。

```yaml
ntp.magedu.com

[webserver]
www1.magedu.com:2222
www2.magedu.com

[dbserver]
db1.magedu.com
db2.magedu.com
db3.magedu.com
```
如果主机名遵循相似的命名模式，还可使用列表的方式标识个主机，例如：
```yaml
[webserver]
www[01:50].example.com

[databases]
db-[a:f].example.com
```
####　5.2.2 主机变量
可以在 inventory 中定义主机时为其添加主机变量以便于在 playbook 中使用，例如：

```yaml
[webserver]
www1.magedu.com http_port=80 maxRequestsPerChild=808
www2.magedu.com http_port=8080 maxRequestsPerChild=909
```
####　5.2.3 组变量
组变量是指赋予给指定组内所有主机上的在 playbook 中可用的变量。例如：

```yaml
[webserver]
www1.magedu.com
www2.magedu.com

[webserver:vars]
ntp_server=ntp.magedu.com
nfs_server=nfs.magedu.com
```
####　5.2.4 组嵌套
inventory 中，组还可以包含其它的组，并且也可以向组中的主机指定变量。不过，这些变量只能在 ansible-playbook 中使用，而 ansible 不支持。例如：

```yaml
[apache]
httpd1.magedu.com
httpd2.magedu.com

[nginx]
ngx1.magedu.com
ngx2.magedu.com

[webserver:children]    #固定格式
apache
nginx

[webserver:vars]
ntp_server=ntp.magedu.com
```
####　5.2.5 inventory 参数
ansible 基于 ssh 连接 inventory 中指定的远程主机时，还可以通过参数指定其交互方式，这些参数如下所示：

```
ansible_ssh_host
ansible_ssh_port
ansible_ssh_user
ansible_ssh_pass
ansible_sudo_pass
ansible_connection
ansible_ssh_private_key_file
ansible_shell_type
ansible_python_interpreter
```
### 5.3 条件测试
如果需要根据变量、facts 或此前任务的执行结果来做为某 task 执行与否的前提时要用到条件测试。

####　5.3.1 when 语句
在 task 后添加 when 字句即可使用条件测试；when 语句支持 jinja2 表达式语句，例如：

```yaml
tasks:
  - name: 'shutdown debian flavored system"
    command: /sbin/shutdown -h now
    when: ansible_os_family == "Debian"
```
when 语句中还可以使用 jinja2 的大多 "filter", 例如果忽略此前某语句的错误并基于其结果 (failed 或 success) 运行后面指定的语句，可使用类似如下形式；

```yaml
tasks:
  - command:/bin/false
    register: result
    ignore_errors: True
  - command: /bin/something
    when: result|failed
  - command: /bin/something_else
    when: result|success
  - command: /bin/still/something_else
    when: result|skipped
```
此外，when 语句中还可以使用 facts 或 playbook 中定义的变量

```bash
# cat cond.yml 
- hosts: all
  remote_user: root
  vars:
  - username: user10
  tasks:
  - name: create {{ username }} user
    user: name={{ username }} 
    when: ansible_fqdn == "node1.exercise.com"
```
### 5.4 迭代
当有需要重复性执行的任务时，可以使用迭代机制。其使用格式为将需要迭代的内容定义为 item 变量引用，并通过 with_items 语句来指明迭代的元素列表即可。例如：

```yaml
- name: add server user
  user: name={{ item }} state=persent groups=wheel
  with_items:
    - testuser1
    - testuser2
```
上面语句的功能等同于下面的语句：
```yaml
- name: add user testuser1
  user: name=testuser1 state=present group=wheel
- name: add user testuser2
  user: name=testuser2 state=present group=wheel
```
事实上，with_items 中可以使用元素还可为 hashes，例如：

```yaml
- name: add several users
  user: name={{ item.name}} state=present groups={{ item.groups }}
  with_items:
    - { name: 'testuser1', groups: 'wheel'}
    - { name: 'testuser2', groups: 'root'}
```
> Ansible 的循环机制还有更多的高级功能，具体请参考官方文档 http://docs.ansible.com/playbooks_loops.html

## 六、模板示例：
```yaml
# grep '{{' conf/httpd.conf 
MaxClients       {{ maxClients }}
Listen {{ httpd_port }}

# cat /etc/ansible/hosts
[webserver]
127.0.0.1 httpd_port=80 maxClients=100
192.168.10.149 httpd_port=8080 maxClients=200

# cat apache.yml 
- hosts: webserver
  remote_user: root
  vars:
  - package: httpd
  - service: httpd
  tasks:
  - name: install httpd package
    yum: name={{ package }} state=latest
  - name: install configuration file for httpd
    template: src=/root/conf/httpd.conf dest=/etc/httpd/conf/httpd.conf
    notify: 
    - restart httpd
  - name: start httpd service
    service: enabled=true name={{ service }} state=started
  
  handlers:
  - name: restart httpd
    service: name=httpd state=restarted
```
## 七、Ansible playbooks
playbook 是由一个或多个 "play" 组成的列表。play 的主要功能在于将事先归并为一组的主机装扮成事先通过 ansible 中的 task 定义好的角色。从根本上来讲，所有 task 无非是调用 ansible 的一个 module。将多个 play 组织在一个 playbook 中，即可以让他们连同起来按事先编排的机制同唱一台大戏。下面是一个简单示例。
```yaml
- hosts: webserver
  vars:
    http_port: 80
    max_clients: 256
  remote_user: root
  tasks:
  - name: ensure apache is at the latest version
    yum: name=httpd state=latest
  - name: ensure apache is running
    service: name=httpd state=started
    handlers:
    - name: restart apache
      service: name=httpd state=restarted
```
### 7.1 playbook 基础组件
#### 7.1.1 Hosts 和 Users
playbook 中的每一个 play 的目的都是为了让某个或某些主机以某个指定的用户身份执行任务。hosts 用于指定要执行指定任务的主机，其可以使一个或多个由冒号分隔主机组；remote_user 则用于指定远程主机的执行任务的用户，如上面的实例中的
```yaml
- hosts: webserver
  remote_user: root
```
不过，remote_user 也可用于各 task 中，也可以通过指定其通过 sudo 的方式在远程主机上执行任务，其可用于 play 全局或其任务；此外，甚至可以在 sudo 时使用 sudo_user 指定 sudo 时切换的用户。

```yaml
- hosts: webserver
  remote_user: magedu
  tasks:
   - name: test connection
     ping:
     remote_user: magedu
     sudo: yes
```
#### 7.1.2 任务列表和 action
play 的主题部分是 task list。task list 中的各任务按次序逐个在 hosts 中指定的所有主机上执行，即在所有主机上完成第一个任务后再开始第二个。在运行自上而下某 playbook 时，如果中途发生错误，所有已执行任务都可能回滚，在更正 playbook 后重新执行一次即可。

tasks 的目的是使用指定的参数执行模块，而在模块参数中可以使用变量。模块执行是幂等的。这意味着多次执行是安全的，因为其结果均一致。

每个 task 都应该有其 name，用于 playbook 的执行结果输出，建议其内容尽可能清晰地描述任务执行步骤，如果为提供 name，则 action 的结果将用于输出。

定义 task 可以使用 "action: module options" 或”module：options“的格式推荐使用后者以实现向后兼容。如果 action 一行的内容过多，也中使用在行首使用几个空白字符进行换行。
```yaml
tasks:
  - name:make sure apache is running
    service: name=httpd state=started
```
在众多的模块中，只有 command 和 shell 模块仅需要给定一个列表而无需使用 "key=value" 格式，例如：

```yaml
tasks:
  - name: disable selinux
    command: /sbin/setenforce 0
```
如果命令或脚本的退出码不为零，可以使用如下方式替代：

```yaml
tasks:
  - name: run this command and ignore the result
    shell: /usr/bin/somecommand || /bin/true
```
或者使用 ignore_errors 来忽略错误信息：

```yaml
tasks:
  - name: run this command and ignore the result
    shell: /usr/bin/somecommand
    ignore_errors: True
```
#### 7.1.3handlers
用于当关注的资源发生变化时采取一定的操作。

"notify" 这个 action 可用于在每个 play 的最后被触发，这样可以避免多次有改变发生时每次都执行执行的操作，取而代之，仅在所有的变化发生完成后一次性地执行指定操作，在 notify 中列出的操作称为 handlers，也即 notify 中调用 handlers 中定义的操作。
```yaml
- name: template configuration file
  template: src=template.j2 dest=/etc/foo.conf
  notify:
    - restart memcached
    - restart apache
```
handlers 是 task 列表，这些 task 与前述的 task 并没有本质上的不同。

```yaml
handlers：
  - name: restart memcached
    service: name=memcached state=restarted
  - name: restart apache
    service: name=apache state=restarted
```
##### 简单示例 1：
```yaml
# cat nginx.yml 
- hosts: webserver
  remote_user: root
  tasks:
  - name: create nginxn group
    group: name=nginx system=yes gid=208
  - name: create nginx user
    user: name=nginx uid=208 group=nginx system=yes

- hosts: dbserver
  remote_user: root
  tasks:
  - name: copy file to dbserver
    copy: src=/etc/inittab dest=/tmp/inittab.ans  
    
# ansible-playbook nginx.yml 
```


##### 简单示例 2：
```yaml
# cat apache.yml 
- hosts: webserver
  remote_user: root
  tasks:
  - name: install httpd package
    yum: name=httpd state=latest
  - name: install configuration file for httpd
    copy: src=/root/conf/httpd.conf dest=/etc/httpd/conf/httpd.conf
  - name: start httpd service
    service: enabled=true name=httpd state=started

# ansible-playbook apache.yml 
```
##### handlers 示例：
```yaml
# cat apache.yml 
- hosts: webserver
  remote_user: root
  tasks:
  - name: install httpd package
    yum: name=httpd state=latest
  - name: install configuration file for httpd
    copy: src=/root/conf/httpd.conf dest=/etc/httpd/conf/httpd.conf
    notify: 
    - restart httpd
  - name: start httpd service
    service: enabled=true name=httpd state=started
  
  handlers:
  - name: restart httpd
    service: name=httpd state=restarted

#  ansible-playbook apache.yml 
```
##### variable 示例 1：
```yaml
# cat apache.yml 
- hosts: webserver
  remote_user: root
  vars:
  - package: httpd
  - service: httpd
  tasks:
  - name: install httpd package
    yum: name={{ package }} state=latest
  - name: install configuration file for httpd
    copy: src=/root/conf/httpd.conf dest=/etc/httpd/conf/httpd.conf
    notify: 
    - restart httpd
  - name: start httpd service
    service: enabled=true name={{ service }} state=started
  
  handlers:
  - name: restart httpd
    service: name=httpd state=restarted
```
##### variable 示例 2：(在 playbook 中可以使用所有的变量)
```yaml
# cat facts.yml 
- hosts: webserver
  remote_user: root
  tasks:
  - name: copy file
    copy: content="{{ ansible_all_ipv4_addresses }} " dest=/tmp/vars.ans
```
## 八、roles
ansible 自 1.2 版本引入的新特性，用于层次性、结构化地组织 playbook。roles 能够根据层次型结构自动转载变量文件、tasks 以及 handlers 等。要使用 roles 只需要在 playbook 中使用 include 指令即可。简单来讲，roles 就是通过分别将变量、文件、任务、模板以及处理器放置于单独的目录中，并可以便捷地 include 他们的一种机制。角色一般用于基于主机构建服务的场景中，但也可以使用于构建守护进程的场景中

一个 roles 的案例如下所示：

```yaml
site.yml
webserver.yml
fooserver.yml
roles/
    common/
        files/
        templates/
        tasks/
        handlers/
        vars/
        meta/
    webserver/
        files/
        templates/
        tasks/
        handlers/
        vars/
        meta/
```
而在 playbook 中，可以这样使用 roles
```yaml
- hosts: webserver
  roles:
    - common  
    - webserver
```
也可以向 roles 传递参数，例如：
```yaml
- hosts: webserver
  roles:
    - common
    - { role: foo_app_instance, dir:'/opt/a',port:5000}
    - { role: foo_app_instance, dir:'/opt/b',port:5001}
```
甚至也可以条件式地使用 roles，例如：
```yaml
- hosts：webserver
  roles:
    - { role: some_role, when: "ansible_so_family == 'RedHat" }  
```
### 8.1 创建 role 的步骤
1. 创建以 roles 命名的目录：
2. 在 roles 目录中分别创建以各角色命名的目录，如 webserver 等
3. 在每个角色命名的目录中分别创建 files、handlers、meta、tasks、templates 和 vars 目录；用不到的目录可以创建为空目录，也可以不创建
4. 在 playbook 文件中，调用各角色
### 8.2 role 内各目录中可应用的文件
- task 目录：至少应该包含一个为 main.yml 的文件，其定义了此角色的任务列表；此文件可以使用 include 包含其它的位于此目录中的 task 文件；
- file 目录：存放由 copy 或 script 等模板块调用的文件；
- template 目录：template 模块会自动在此目录中寻找 jinja2 模板文件；
- handlers 目录：此目录中应当包含一个 main.yml 文件，用于定义此角色用到的各 handlers，在 handler 中使用 inclnude 包含的其它的 handlers 文件也应该位于此目录中；
- vars 目录：应当包含一个 main.yml 文件，用于定义此角色用到的变量
- meta 目录：应当包含一个 main.yml 文件，用于定义此角色的特殊设定及其依赖关系；ansible1.3 及其以后的版本才支持；
- default 目录：应当包含一个 main.yml 文件，用于为当前角色设定默认变量时使用此目录；
```yaml
# mkdir -pv ansible_playbooks/roles/{webserver,dbserver}/{tasks,files,templates,meta,handlers,vars} 
# cp /etc/httpd/conf/httpd.conf files/  
# pwd
/root/ansible_playbooks/roles/webserver 
# cat tasks/main.yml 
- name: install httpd package
  yum: name=httpd state=present
- name: install configuretion file
  copy: src=httpd.conf dest=/etc/httpd/conf/httpd.conf
  tags:
  - conf
  notify:
  - restart httpd
- name: start httpd
  service: name=httpd state=started

# cat handlers/main.yml 
- name: restart httpd
  service: name=httpd state=restarted
  
# pwd;ls
/root/ansible_playbooks
roles  site.yml 


# cat site.yml 
- hosts: webserver
  remote_user: root
  roles:
  - webserver

# ansible-playbook site.yml  
```
## 九、Tags
tags 用于让用户选择运行或跳过 playbook 中的部分代码。ansible 具有幂等性，因此会自动跳过没有变化的部分，即便如此，有些代码为测试其确实没有发生变化的时间依然会非常的长。此时，如果确信其没有变化，就可以通过 tags 跳过此些代码片段。

tags：在 playbook 可以为某个或某些任务定义一个 "标签"，在执行此 playbook 时，通过为 ansible-playbook 命令使用 --tags 选项能耐实现仅运行指定的 tasks 而非所有的；

```yaml
# cat apache.yml 
- hosts: webserver
  remote_user: root
  vars:
  - package: httpd
  - service: httpd
  tasks:
  - name: install httpd package
    yum: name={{ package }} state=latest
  - name: install configuration file for httpd
    template: src=/root/conf/httpd.conf dest=/etc/httpd/conf/httpd.conf
    tags:
    - conf
    notify: 
    - restart httpd
  - name: start httpd service
    service: enabled=true name={{ service }} state=started
  
  handlers:
  - name: restart httpd
    service: name=httpd state=restarted

# ansible-playbook apache.yml --tags='conf'
```
特殊 tags：always #无论如何都会运行

---

::: info 版权声明

本文为博主[「kangvcar」](https://my.oschina.net/kangvcar)的原创文章。   
原文链接：[https://my.oschina.net/kangvcar/blog/1830155](https://my.oschina.net/kangvcar/blog/1830155)

:::