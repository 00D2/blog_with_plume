---
index: true
icon: dns
title: 浏览器对于DNS的缓存
author: 小苹果儿
date: 2022-06-13
category:
  - DNS
tag:
  - dns
  - 浏览器
  - 缓存
---



## 基础测试环境

 - 操作系统
   - Windows 7  

 - 抓包工具
   - Wireshark

 - 浏览器
   - IE8
   - Chrome59
   - Chrome69
   
 - DNS服务器配置
   - 根据不同场景，调整NS、A等记录的TTL值

备注：

>  每次新场景测试前，均清除缓存。
>
>  - 关闭浏览器，清除缓存
>  - 使用ipconfig /flushdns清除系统DNS缓存
>  - 通过ipconfig /displaydns确认系统当前无相关DNS缓存记录



## 测试结论

| 浏览器   | 是否有独立缓存\|缓存时间       | 是否读取操作系统缓存 | 操作系统缓存生成依据    |
| -------- | ------------------------------ | -------------------- | ----------------------- |
| Chrome59 | 是\|60秒                       | 是                   | 域名所在域的NS记录TTL值 |
| Chrome69 | 否\|根据A记录的TTL值，单位毫秒 | 否                   | 无                      |
| Chrome99 |                                |                      |                         |
| IE8      | 未知\|官方提供时间为30分钟 | 是 | 待测试 |
| IE11 | 未知\|官方提供时间为30分钟 | 是 |待测试|



## 场景一：Chrome 59

### 测试结论




### 1.1 首次访问

#### 测试过程

1. 通过浏览器打开http://a1.test.com，进行访问；

2. 通过Wireshark抓包工具确认，客户端向DNS服务器发起了DNS请求，并获取到了相应记录；

3. 通过DNS服务器tail log确认，服务端收到了客户端请求，并返回相应记录值；

4. 通过ipconfig /displaydns查看，系统出现了t1.test.com的DNS缓存；

5. 通过chrome浏览器chrome://net-internals#dns，查看浏览器对于域名的缓存记录及时间。

   <img src="https://img.jinguo.tk/api/image/image-20220616150110691.png" alt="系统DNS缓存" style="zoom: 33%;" />

   <img src="https://img.jinguo.tk/api/image/image-20220616151459880.png" alt="image-20220616151459880" style="zoom: 33%;" />
   
   <img src="https://img.jinguo.tk/api/image/image-20220616150034251.png" alt="image-20220616150034251" style="zoom:33%;" />
   
#### 测试结果

   1. **客户端向服务器发起DNS请求，浏览器及操作系统分别会生成各自的缓存记录。**
   
   2. **浏览器缓存时间为60S**
   
   3. **操作系统读取NS记录的TTL值，并非具体A记录的TTL值。**

### 1.2 在浏览器DNS TTL超时时间内刷新或打开新的TAB

#### 测试过程

>1. 通过Wireshark抓包工具确认，客户端未发起新的DNS请求；
>2. 通过DNS服务器tail log确认，服务端未收到新的DNS请求；
>3. 通过ipconfig /displaydns查看，系统中t1.test.com的DNS缓存TTL值仍使用上次使用的TTL倒计时；
>4. 通过chrome浏览器chrome://net-internals#dns，查看浏览器对于域名的缓存记录及时间。

#### 测试结果

1. **浏览器读取自身的DNS缓存，不会发起新的DNS请求。**



### 1.3 浏览器DNS TTL超时，系统DNS TTL未超时，刷新或打开新的TAB

#### 测试过程

>1. 通过Wireshark抓包工具确认，客户端未发起新的DNS请求；
>2. 通过DNS服务器tail log确认，服务端未收到新的DNS请求；
>3. 通过ipconfig /displaydns查看，系统中t1.test.com的DNS缓存TTL值仍使用上次使用的TTL倒计时；
>4. 通过chrome浏览器chrome://net-internals#dns，查看浏览器对于域名的缓存记录及时间。

#### 追加测试

> 通过ping命令，先在操作系统中生成相应域名的缓存；
>
> 再次打开浏览器访问
>
> 并通过Wireshark抓包，进行确认有无向DNS服务器发起请求。

####　测试结论

1. **浏览器读取操作系统的DNS缓存，不会向DNS服务器发起新的请求。**


### 1.4 浏览器及系统DNS TTL均超时，刷新或打开新的TAB

####　测试结论

1. **客户端向DNS服务器发起新的请求。**

#### 测试过程

>1. 通过Wireshark抓包工具确认，客户端未发起新的DNS请求；
>2. 通过DNS服务器tail log确认，服务端未收到新的DNS请求；
>3. 通过ipconfig /displaydns查看，系统中t1.test.com的DNS缓存TTL值仍使用上次使用的TTL倒计时；
>4. 通过chrome浏览器chrome://net-internals#dns，查看浏览器对于域名的缓存记录及时间。


## 场景二 Chrome 69

### 测试结论

1. **浏览器会根据DNS服务器上具体的A记录条目所配置的TTL值，自身进行缓存，可通过chrome://net-internals#dns进行查看。（注意：此处显示的TTL时间为毫秒，换算成秒需/1000）**
2. **浏览器在进行DNS请求时，相应的请求不会在操作系统中生成缓存。**
3. **浏览器在TTL超时时间内，通过刷新键或f5键进行刷新，均会触发DNS重新请求的动作，同时更新自身的缓存时间。**
4. **正常的页面点击、上传及下载文件、页面自动在新的标签页中打开预览文件等操作，不会触发DNS更新。**
5. **浏览器TTL超时后，浏览器会重新发起DNS请求。**
6. **浏览器最大可记录的缓存时间为2147483秒，如果DNS服务器配置的TTL时间超过该值，浏览器生成表项时的值可能为负值，也可能是50065408。**
   - 可通过下面两个图片中t4、t5两条记录，在浏览器中生成的缓存条目。



![image-20220617100345995](https://img.jinguo.tk/api/image/image-20220617100345995.png)

![image-20220617100424983](https://img.jinguo.tk/api/image/image-20220617100424983.png)

<img src="https://img.jinguo.tk/api/image/image-20220617101854135.png" alt="image-20220617101854135" style="zoom: 33%;" />

[链接1](https://icode.best/i/17938839070875)

[链接2](https://www.runoob.com/cplusplus/cpp-data-types.html)




### 2.1 首次访问

#### 测试过程

> 1. 通过浏览器打开http://a2.test.com，进行访问；
> 
> 2. 通过Wireshark抓包工具确认，客户端向DNS服务器发起了DNS请求，并获取到了相应记录；
> 
> 3. 通过DNS服务器tail log确认，服务端收到了客户端请求，并返回相应记录值；
> 
> 4. 通过ipconfig /displaydns查看，系统没有t2.test.com的DNS缓存；
> 
> 5. 通过chrome浏览器chrome://net-internals#dns，查看浏览器对于域名的缓存记录及时间。

   <img src="https://img.jinguo.tk/api/image/image-20220616161337757.png" alt="image-20220616161337757" style="zoom: 33%;" />


#### 测试结果

1. 客户端向服务器发起DNS请求，浏览器会生成缓存记录，但操作系统不会生成缓存记录。
2. 浏览器缓存时间根据DNS上对应的A记录条目的TTL值生成。

### 2.2 在浏览器DNS TTL超时时间内刷新或打开新的TAB

#### 测试过程

>1. 通过Wireshark抓包工具确认，客户端发起新的DNS请求；
>2. 通过DNS服务器tail log确认，服务端收到新的DNS请求；
>3. 通过ipconfig /displaydns查看，系统中无a2.test.com的DNS缓存；
>4. 通过chrome浏览器chrome://net-internals#dns，查看浏览器对于域名的缓存记录及时间发生变化。

#### 测试结果

1. 浏览器发生了刷新动作（无论是普通刷新或者是强制刷新）时，均会触发重新请求DNS的动作，请求成功后，浏览器会更新自身的缓存时间。



### 2.3 浏览器TTL超时，刷新或打开新的TAB

#### 测试过程

>1. 通过Wireshark抓包工具确认，客户端发起新的DNS请求；
>2. 通过DNS服务器tail log确认，服务端收到新的DNS请求；
>3. 通过ipconfig /displaydns查看，系统中无a2.test.com的DNS缓存；
>4. 通过chrome浏览器chrome://net-internals#dns，查看浏览器对于域名的缓存记录及时间发生变化。
>
####　测试结果

1. 客户端重新请求DNS，请求成功后，浏览器更新自身的缓存时间。


## 场景三 IE8

### 测试结论

1. 浏览器在进行DNS请求时，操作系统会根据DNS服务器上所配置的NS记录的TTL值进行A记录的缓存。
2. 在某个时间范围内，在浏览器上所进行的所有操作（包括`ctrl + f5`进行强制刷新）。
3. 在操作系统上具体A记录的TTL超时后，浏览器仍可正常访问，证明IE浏览器同样具备自身的DNS缓存。
4. 如果目的界面可以正常打开，浏览器会自身缓存30min，如果目的地址不可达，那么浏览器可能会在30min内发起新的DNS请求。

### 说明

1. IE浏览器未找到查看浏览器自身存放及展示DNS缓存的页面。

2. 据微软支持网站显示，在IE4.x及后续版本，会对相应的DNS记录缓存30min。

   > 微软支持页面链接：[How Internet Explorer uses the cache for DNS host entries](https://support.microsoft.com/en-us/topic/how-internet-explorer-uses-the-cache-for-dns-host-entries-33d93ec9-e4fa-1557-4e9c-83517fed474f)

3. 实际测试中，发现IE4.x版本，在首次请求后的30min内，仍有可能发起新的DNS请求。
## 3.1 首次访问

#### 测试结论

1. **客户端向服务器发起DNS请求，浏览器及操作系统分别会生成各自的缓存记录。**

2. **浏览器缓存时间为60S**

3. **操作系统读取NS记录的TTL值，并非具体A记录的TTL值。**
4. **更正：操作系统读取的TTL值，是选取NS、A记录中TTL值较短的一个，并非是固定的NS或者A记录的TTL值。**

#### 测试过程

1. 通过浏览器打开http://a1.test.com，进行访问；

2. 通过Wireshark抓包工具确认，客户端向DNS服务器发起了DNS请求，并获取到了相应记录；

3. 通过DNS服务器tail log确认，服务端收到了客户端请求，并返回相应记录值；

4. 通过ipconfig /displaydns查看，系统出现了t1.test.com的DNS缓存；

5. 通过chrome浏览器chrome://net-internals#dns，查看浏览器对于域名的缓存记录及时间。

   


### 3.2 在30首次请求后的30分钟内刷新或打开新的TAB

####　测试结论

1. **30分钟内，有可能会重新发起新的DNS请求。具体间隔或触发条件待确认。**

#### 测试过程

>1. 通过Wireshark抓包工具确认，客户端未发起新的DNS请求；
>2. 通过DNS服务器tail log确认，服务端未收到新的DNS请求；
>3. 通过ipconfig /displaydns查看，系统中t1.test.com的DNS缓存TTL值仍使用上次使用的TTL倒计时；
>4. 通过chrome浏览器chrome://net-internals#dns，查看浏览器对于域名的缓存记录及时间。






## 场景四 IE11





## 待测试项目

- Chrome69，先在系统生成环境，再打开浏览器，查看，浏览器是读取系统缓存还是主动发起；
- IE，调整记录的TTL时间，刷新确认，浏览器最大的可缓存时间
- Chrome>99版本，进行实际测试。相应版本已经无法通过chrome://net-internals#dns进行查看自身缓存，仅能通过实际测试证明
- Firefox浏览器
- Microsoft支持网站所提供的修改IE缓存时间的方法，目前测试不可用。
- 操作系统所配置的DNS并非所要请求记录的权威DNS，请求过程中存在递归或迭代。此时，客户端是否无法获取所要请求域名的NS记录的值及其TTL，那么此时，客户端所缓存的A记录的TTL值是否就应该为真实的所为其配置的TTL时间。









