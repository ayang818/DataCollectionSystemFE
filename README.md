# About
王者荣耀手机端仿站
- 后台管理界面
    - [x] 所有表的CRUD
    - [x] Authentication，Authorization
    - [ ] 图片储存(原有的代理文件夹部署后失效)，使用Aliyun的OSS
- 后端接口编写
    - [x] 后台管理接口
    - [ ] 前端界面接口
- 前端主站界面
    - [x] 主页
    - [x] 文章页
    - [ ] 英雄展示界面(先咕着)

# Project Structure
- admin目录属于后台管理员界面，使用vue-cli搭建
- web目录属于站点界面，使用vue-cli搭建
- server目录属于后端接口，使用express编写

# How to start the project?

## admin
```
cd admin
npm install
npm run serve
```

## server
```
cd server
npm install
npm install -g nodemon
nodemon index.js
```

## web
```
cd web
npm install
npm run serve
```

# Depoly
nginx代理静态文件夹，后台管理界面已上线，需要查看提issue。
PM2后台挂起nodejs后端服务。
