
# CloudBankApp

## 项目背景：
开源软件已经从一个低成本的平台扩展到一个企业数据库、云计算和下一代应用的平台。这些工作负载需要底层硬件基础架构提供更高级别的可扩展性、安全性和可用性。     


LinuxOne是为开源而构建的，因此您可以在业界最安全、可扩展和高性能的Linux服务器上利用开放革命的灵活性。我们将展示如何使用Docker在LinuxOne上运行开源云本机工作负载。我们将展示如何使用来自Docker Hub的现有LinuxOne Docker映像来部署开源工作负载。  


本项目是基于ICp-banking-microservices项目进行的，我们在它的基础上真正实现了一款我们自己的Banking Application。

ICp-banking-microservices项目中
先发现银行应用程序，再通过API Developer Portal订阅银行API，成功运行银行应用程序后，将银行应用程序推送到GitHub存储库；
然后从LinuxONE社区云构建Docker镜像并将其部署到IBM Cloud private；
最后从IBM Cloud私有目录中实例化；

更多具体信息可去 ICp-banking-microservices项目 进行查看。

-----



## 如何像我们一样构建银行应用程序：
> Step 1 - Discover and locally run the banking application
 1. 获取项目代码
 
> Step 2 - Build and deploy a Docker image to IBM Cloud private
 2. 构建 Docker 镜像
 3. Deploy the Docker image to IBM Cloud private
 
> Step 3 - Instantiate the banking microservice from the IBM Cloud private catalog
 4. Discover the Helm chart
 5. 配置 Helm Chart
 6. 查看应用


### Step 1 - Discover and locally run the banking application


### **1. 获取项目代码**
---------

首先登录 Github，Fork 该实验的 Github Repo - ICp-banking-microservices 到自己账号下
//项目图

将你 Fork 的项目git clone至本地：

    git clone https://github.com/YOUR_USERNAME/ICp-banking-microservices



### Step 2 - Build and deploy a Docker image to IBM Cloud private

### **2. 构建 Docker 镜像**
---------------


先登录你的 LinuxONE 主机实例，之后将你 Fork 后又更新的代码拉取到本地：

    [root@myserver ~]$ git clone https://github.com/abelsu7/ICp-banking-microservices.git # 改成你自己的账号

之后使用docker build命令构建镜像：

    [root@myserver banking-application]$ docker build -t "abelsu7-banking-image:latest" ./ # 改成你的用户名
运行容器：

    [root@myserver banking-application]$ docker run -p 3000:3000 abelsu7-banking-image

### **3. Deploy the Docker image to IBM Cloud private**
-----------------------------------------------


### Step 3 - Instantiate the banking microservice from the IBM Cloud private catalog


### **4. Discover the Helm chart**
--------------------------

###**5. 配置 Helm Chart**
----------------

### **6. 查看应用**
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
--

点击sign up界面，进入注册界面。图：
输入username 和 password  点击确认按钮，图：

### **登录**
--

输入username 和 password  点击确认按钮，图：
此时界面会显示你的余额，以及系统提供的基本服务选项。

### **存款**
--

  输入你想要存储的金额，点击确认，图：

### **取款**
--

  输入你想要取出的金额，点击确认，图：

###**转账**
--

  输入转账目标账户和转账金额，点击确认，图：






