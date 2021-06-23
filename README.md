[简体中文](./README.md) | [English](./README.en.md)

### 从零开始，一步一步搭建 Koa 框架，为后面打好基础。

### Build some KOA fundamentals.

1. 基础接口；
2. 路由拆分 koa-route 及 koa-router 使用；
3. koa-static 静态资源开放；
4. mysql 数据库连接；

### 项目结构

```
.
├── src
│   ├── controller        //controller层
│   ├── entity            //实体类
│   ├── redis             //redis相关配置及工具类
│   ├── router            //路由配置
│   ├── service           //service层
│   ├── config.ts         //配置文件
│   ├── constants.ts      //项目常量
│   └── index.ts          //项目入口index.js
├── .env                  //配置文件
├── ecosystem.config.js   //pm2配置
├── ormconfig.json        //数据库 ORM 配置文件
├── nodemon.json          //nodemon配置
├── package.json          //npm 安装包
└── tsconfig.json         //ts配置文件
```

### 已完成

- [x] 基础接口
- [x] 路由拆分
- [x] 静态资源开放
- [x] 数据库连接
- [x] 寻找更简单的数据库查询方式: typeorm
- [x] mocha 单元测试
- [x] redis
- [x] JWT 认证
- [x] TS 改造

### 待开发

- [ ] Api 文档
