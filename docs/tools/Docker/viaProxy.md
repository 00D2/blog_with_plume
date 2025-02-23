---
icon: docker
author: 犄角套袜子
date: 2024-04-01
category:
  - Docker
tag:
  - docker
  - 容器
---

# 配置Docker使用代理服务器

> Configure the Docker daemon to use a proxy server

官方链接：<https://docs.docker.com/config/daemon/systemd/#httphttps-proxy>

The Docker daemon uses the following environment variables in its start-up environment to configure HTTP or HTTPS proxy behavior:

> HTTP_PROXY  
> http_proxy  
> HTTPS_PROXY  
> https_proxy  
> NO_PROXY  
> no_proxy  

In Docker Engine version 23.0 and later versions, you may also configure proxy behavior for the daemon in the daemon.json file:

```json
{
  "proxies": {
    "http-proxy": "http://proxy.example.com:3128",
    "https-proxy": "https://proxy.example.com:3129",
    "no-proxy": "*.test.example.com,.example.org,127.0.0.0/8"
  }
}
```

These configurations override the default docker.service systemd file.

If you're behind an HTTP or HTTPS proxy server, for example in corporate settings, the daemon proxy configurations must be specified in the systemd service file, not in the daemon.json file or using environment variables.

Note for rootless mode

The location of systemd configuration files are different when running Docker in rootless mode. When running in rootless mode, Docker is started as a user-mode systemd service, and uses files stored in each users' home directory in ~/.config/systemd/user/docker.service.d/. In addition, systemctl must be executed without sudo and with the --user flag. Select the "rootless mode" tab below if you are running Docker in rootless mode.

regular install rootless mode
Create a systemd drop-in directory for the docker service:

```shell
 sudo mkdir -p /etc/systemd/system/docker.service.d
```

Create a file named /etc/systemd/system/docker.service.d/http-proxy.conf that adds the HTTP_PROXY environment variable:

```json
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:3128"
```

If you are behind an HTTPS proxy server, set the HTTPS_PROXY environment variable:

```json
[Service]
Environment="HTTPS_PROXY=https://proxy.example.com:3129"
```

Multiple environment variables can be set; to set both a non-HTTPS and a HTTPs proxy;

```json
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:3128"
Environment="HTTPS_PROXY=https://proxy.example.com:3129"
```

:::note Note

Special characters in the proxy value, such as #?!()[]{}, must be double escaped using %%. For example:

```json
[Service]
Environment="HTTP_PROXY=http://domain%%5Cuser:complex%%23pass@proxy.example.com:3128/"
```
:::

If you have internal Docker registries that you need to contact without proxying, you can specify them via the NO_PROXY environment variable.

The NO_PROXY variable specifies a string that contains comma-separated values for hosts that should be excluded from proxying. These are the options you can specify to exclude hosts:

IP address prefix (1.2.3.4)
Domain name, or a special DNS label (*)
A domain name matches that name and all subdomains. A domain name with a leading "." matches subdomains only. For example, given the domains foo.example.com and example.com:
example.com matches example.com and foo.example.com, and
.example.com matches only foo.example.com
A single asterisk (*) indicates that no proxying should be done
Literal port numbers are accepted by IP address prefixes (1.2.3.4:80) and domain names (foo.example.com:80)
Example:


[Service]
Environment="HTTP_PROXY=http://proxy.example.com:3128"
Environment="HTTPS_PROXY=https://proxy.example.com:3129"
Environment="NO_PROXY=localhost,127.0.0.1,docker-registry.example.com,.corp"
Flush changes and restart Docker


 sudo systemctl daemon-reload
 sudo systemctl restart docker
Verify that the configuration has been loaded and matches the changes you made, for example:


 sudo systemctl show --property=Environment docker

Environment=HTTP_PROXY=http://proxy.example.com:3128 HTTPS_PROXY=https://proxy.example.com:3129 NO_PROXY=localhost,127.0.0.1,docker-registry.example.com,.corp
