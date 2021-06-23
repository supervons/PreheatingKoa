[简体中文](./README.md) | [English](./README.en.md)

### Build the KOA framework step by step from scratch to lay the foundation for the future.

### Build some KOA fundamentals.

1. Basic interface;
2. Split the use of KOA-Route and KOA-Router;
3. KOA-static static resource opening;
4. MySQL database connection;

### PROJECT DIR INTRODUCE

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

### Finished

- [x] Base Interface
- [x] routing split
- [x] Static resource opening
- [x] database connection
- [x] Looking for simpler database queries : typeorm
- [x] Mocha unit tests
- [x] redis
- [x] JWT certification
- [x] TS modification

### TODO-LIST

- [ ] Api document
