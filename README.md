[简体中文](./README.md) | [English](./README.en.md)

### 从零开始，基于 Typescript 一步一步搭建 Koa 框架，作为后面开发业务的轮子模板项目；

1. JWT 路由鉴权；
2. 基于 typeorm 的 mysql 数据库连接；
3. redis 缓存关系库使用及示例；
4. mocha 单元测试；
5. koa-static 静态资源开放；
6. 路由拆分 koa-route 及 koa-router 使用；

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

### 数据库文件位置

```
./public/mysql.sql
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
