# CloudBankApp

## 项目背景：
开源软件已经从一个低成本的平台扩展到一个企业数据库、云计算和下一代应用的平台。这些工作负载需要底层硬件基础架构提供更高级别的可扩展性、安全性和可用性。     



LinuxOne是为开源而构建的，因此您可以在业界最安全、可扩展和高性能的Linux服务器上利用开放革命的灵活性。在本课程中，我们将展示如何使用Docker在LinuxOne上运行开源云本机工作负载。我们将展示如何使用来自Docker Hub的现有LinuxOne Docker映像来部署开源工作负载。  



本项目是基于 [ ICp-banking-microservices ](https://github.com/IBM/Cloud-Native-Workloads-on-LinuxONE) 项目进行的，我们在它的基础上真正实现了一款我们自己的Banking Application。

ICp-banking-microservices项目中
先发现银行应用程序，再通过API Developer Portal订阅银行API，成功运行银行应用程序后，将银行应用程序推送到GitHub存储库；
然后从LinuxONE社区云构建Docker镜像并将其部署到IBM Cloud private；
最后从IBM Cloud私有目录中实例化；

更多具体信息可去[ICp-banking-microservices](https://github.com/IBM/Cloud-Native-Workloads-on-LinuxONE)项目 进行查看。

-----



## 部署步骤：
> Step One
1. 安装 Docker
2. 安装 docker-compose
3. 安装并运行 WebSphere Liberty
4. 安装并运行 WordPress
5. MEAN Stack 环境准备
6. 启动 MEAN Stack

### Step One


### **1. 安装 Docker**



---------

    linux1@myserver ~]$ sudo su # 切换至 root
    
    [root@myserver linux1]$ cd ~
    
    [root@myserver ~]$ wget ftp://ftp.unicamp.br/pub/linuxpatch/s390x/redhat/rhel7.3/docker-17.05.0-ce-rhel7.3-20170523.tar.gz
    
    # 解压 Docker 归档包
    [root@myserver ~]$ tar -xzvf docker-17.05.0-ce-rhel7.3-20170523.tar.gz
    
    [root@myserver ~]$ cp docker-17.05.0-ce-rhel7.3-20170523/docker* /usr/bin/


之后启动docker daemon：

    [root@myserver ~]$ docker daemon -g /local/docker/lib &





### **2. 安装 docker-compose**
---------------
使用yum安装python-setuptools：

    [root@myserver ~]$ yum info python-setuptools
    [root@myserver ~]$ yum install -y python-setuptools


之后使用easy_install安装pip：

        
    [root@myserver ~]$ pip install backports.ssl_match_hostname --upgrade --ignore-installed
最后，使用pip安装docker-compose：

    [root@myserver ~]$ yum install python-devel libffi-devel # 先安装依赖，不然会报错
    [root@myserver ~]$ pip install docker-compose==1.13.0

### **3. 安装并运行 WebSphere Liberty**
--------------------------
先手动拉取websphere-liberty镜像到本地：

        [root@myserver ~]$ docker image pull s390x/websphere-liberty:webProfile7
    webProfile7: Pulling from s390x/websphere-liberty
    a39cfce7a60d: Pull complete
    4e699efbddb6: Pull complete
    9a3ffeac4412: Pull complete
    52c5a080fd6d: Pull complete
    6f0d27faa63a: Pull complete
    a3d346a6c218: Pull complete
    e9129f75e0bc: Pull complete
    905ebfd4a924: Pull complete
    bd9b8600bfe7: Pull complete
    5746a3a16c6e: Pull complete
    621479e04496: Pull complete
    26db9a45b5d9: Pull complete
    32c81cd7fa4a: Pull complete
    705855d9301f: Pull complete
    0bd5ae8e4470: Pull complete
    Digest: sha256:87e41c209fa1c8ab33fc0cd0e126eec1493a50c49fe557f398707b4f4755d07a
    Status: Downloaded newer image for s390x/websphere-liberty:webProfi
    le7
    
    [root@myserver ~]$ docker images
    REPOSITORY                TAG                 IMAGE ID            CREATED             SIZE
    s390x/websphere-liberty   webProfile7         def868b21def        27 hours ago        473MB

后台运行容器，并指定端口映射规则：

    [root@myserver ~]$ docker run -d -p 80:9080 -p 443:9443 s390x/websphere-liberty:webProfile7
    3c9d3b02de11bc5b912a8df1b3987e60bf797ea02cbbbc4457a6e09307f3c95e
    
    [root@myserver ~]$ docker ps
    CONTAINER ID    IMAGE    COMMAND    CREATED    STATUS    PORTS    NAMES
    3c9d3b02de11    s390x/websphere-liberty:webProfile7    "/opt/ibm/helpers/..."    21 seconds ago    Up 19 seconds    0.0.0.0:80->9080/tcp, 0.0.0.0:443->9443/tcp    mystifying_golick

浏览器访问http://[LinuxOne Host IP]，即可看到WebSphere Liberty的界面：

![](https://qiniu.abelsu7.cn/notes-2019517-websphereliberty.png)
### **4. 安装并运行 WordPress**
-----------------------------------------------
参见 [Run and install WordPress](https://github.com/IBM/Scalable-WordPress-deployment-on-Kubernetes/blob/master/docs/deploy-with-docker-on-linuxone.md#steps)

创建并编辑docker-compose.yml：

    [root@myserver ~]$ vim docker-compose.yml
    
    按i进入编辑模式（所有 Vim 命令注意区分大小写），输入以下内容：

    version: '2'
    
    services:
    
      wordpress:
        image: s390x/wordpress
        ports:
          - 8080:80 # 将本地 8080 端口映射到容器的 80 端口
        environment:
          WORDPRESS_DB_PASSWORD: example
    
      mysql:
        image: brunswickheads/mariadb-5.5-s390x
        environment:
          MYSQL_ROOT_PASSWORD: example

之后按Esc退出编辑模式，输入:wq保存并退出。

创建wordpress目录方便整理：

    [root@myserver ~]$ mkdir wordpress
    [root@myserver ~]$ mv docker-compose.yml wordpress/
    [root@myserver ~]$ cd wordpress/
    [root@myserver wordpress]$ ls
    docker-compose.yml

根据docker-compose.yml中定义的服务启动容器：

    [root@myserver wordpress]$ docker-compose up -d

创建完成后，查看相关容器的状态：

    [root@myserver wordpress]$ docker-compose ps
            Name                       Command               State          Ports
    -------------------------------------------------------------------------------------
    wordpress_mysql_1       /docker-entrypoint.sh mysq ...   Up      3306/tcp
    wordpress_wordpress_1   docker-entrypoint.sh apach ...   Up      0.0.0.0:8080->80/tcp

浏览器访问http://[Your LinuxONE IP Address]:8080，即可看到 WordPress 的页面：

![](https://github.com/IBM/Scalable-WordPress-deployment-on-Kubernetes/raw/master/images/wpinstall-language.png)
### **5. MEAN Stack 环境准备**
--------------------------
拉取代码到本地使用

    [root@myserver ~]$ git clone  https://github.com/YOUR_USERNAME/CloudBankApp
    
    [root@myserver ~]$ cp -r CloudBankApp/files/mean-docker ./
    
    [root@myserver ~]$ yum install -y tree
    
    [root@myserver ~]$ tree mean-docker



docker-compose.yml修改如下：

    ...
    ...
        ports:
          - "8081:8081" # 本地 8081 端口映射到 express 容器的 8081 端口
    ...
    ...

express-server/Dockerfile修改如下：

        #Expose the port the app runs in
        EXPOSE 8081
        ...
        ...
        # Express listening port
        ENV PORT 8081

### **6. 启动 MEAN Stack**
----------------
在mean-docker目录下运行docker-compose up：

    [root@myserver mean-docker]$ docker-compose up

    Starting meandocker_database_1 ...
    Starting meandocker_database_1 ... done
    Starting meandocker_express_1 ...
    Starting meandocker_express_1 ... done
    Attaching to meandocker_database_1, meandocker_express_1
    database_1  | note: noprealloc may hurt performance in many applications
    express_1   |
    express_1   | > node-todo@0.0.1 start /usr/src
    express_1   | > node server.js
    express_1   |
    express_1   | App listening on port 8081
    



 使用docker-compose -d即可在后台运行express-server

 
 浏览器访问http://[ip of machine]:8081，即可看到你的App
 
使用docker-compose ps命令查看启动的容器：

    [root@myserver mean-docker]$ docker-compose ps
            Name                       Command               State                  Ports
    ----------------------------------------------------------------------------------------------------
    meandocker_database_1   /bin/sh -c mongod --dbpath ...   Up      0.0.0.0:27017->27017/tcp, 28017/tcp
    meandocker_express_1    npm start                        Up      0.0.0.0:8081->8081/tcp

-----------



## 项目设计文档
#### **前端页面**
- 银行首页 //截图
- 登陆页面 //截图
- 存钱/取钱页面 //截图
- 转账页面//截图
- 理财业务界面(构想，未实现)
#### **前端业务逻辑**

```
 graph TB
 A[登陆]-->|成功|B{首页}
 B-->C{存钱取钱页面}
 B-->|拓展|E{理财业务界面}
 B-->D[转账界面]
 E-->F[贷款]
 E-->G[投资]
 E-->H[负债]
```
#### **后端业务逻辑**

```
 graph TB
 A[后端首页]-->B{用户信息}
 B-->C{存取记录}
 B-->D{转账记录}
 A-->E{银行储备账户}
 E-->G[银行理财信息]
 B-->F[理财产品信息]
```


#### **数据库设计**
   

表1| 属性1 |属性2
---|---|---
# | #|
# | #|

表2| 属性1 |属性2
---|---|---
# | #|
# | #|





-------

## Application使用说明：
> * 注册
> * 登录
> * 存款
> * 取款
> * 转账

### **注册**
------

点击sign up界面，进入注册界面。图：
输入username 和 password  点击确认按钮，图：

### **登录**
------

输入username 和 password  点击确认按钮，图：
此时界面会显示你的余额，以及系统提供的基本服务选项。

### **存款**
------

  输入你想要存储的金额，点击确认，图：

### **取款**
------

  输入你想要取出的金额，点击确认，图：

### **转账**
------

  输入转账目标账户和转账金额，点击确认，图：






