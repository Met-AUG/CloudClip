# CloudClip - 云剪贴板

CloudClip是一个基于Vue.js和Express的在线剪贴板应用，支持Markdown渲染和代码高亮，可以方便地分享文本内容。

## 功能特点

- 支持Markdown实时预览和渲染
- 代码块语法高亮
- 支持数学公式(KaTeX)
- 自适应设计，支持移动端
- 一键复制分享链接
- HTTPS加密传输
- 支持Docker部署

## 技术栈

### 前端
- Vue 3
- Vue Router
- Markdown-it
- KaTeX 
- Highlight.js
- Font Awesome图标
- Axios

### 后端
- Express
- MongoDB
- Mongoose
- CORS

### 部署
- Docker
- Nginx
- SSL证书支持

## 部署前准备
请在部署前自行在`./clipboard`文件夹中创建`.env.development`和`.env.production`文件，内容如下：
```bash
NODE_ENV=development
VUE_APP_BASE_URL=http://your_server_ip/api
```
```bash
NODE_ENV=production
VUE_APP_BASE_URL=http://your_http_server_ip/api
VUE_APP_HTTPS_URL=https://your_https_server_ip/api
```
## 本地开发

1. 克隆仓库:
```bash
git clone https://github.com/Met-AUG/CloudClip.git
cd cloudclip
```

2. 安装依赖:
```bash
# 安装前端依赖
cd clipboard
npm install

# 安装后端依赖
cd ../server
npm install
```

3. 启动MongoDB:
```bash
mongod
```

4. 启动后端服务:
```bash
cd server
node server.js
```

5. 启动前端开发服务器:
```bash
cd clipboard
npm run serve
```

## Docker部署

使用Docker Compose一键部署整个应用:

```bash
docker-compose up -d
```

这将启动:
- 前端Nginx服务器(80/443端口)
- 后端Node.js服务器(3000/3443端口)
- MongoDB数据库(27017端口)

## 环境变量

### 后端环境变量
- MONGO_URL: MongoDB连接URL
- SSL_KEY_PATH: SSL私钥路径
- SSL_CERT_PATH: SSL证书路径
- PORT: HTTP端口(默认3000)
- SSL_PORT: HTTPS端口(默认3443)

### 前端环境变量
- VUE_APP_BASE_URL: API基础URL(HTTP)
- VUE_APP_HTTPS_URL: API基础URL(HTTPS)

## License

MIT License
