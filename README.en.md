[简体中文](./README.md) | [English](./README.en.md)

### Built the KOA framework step by step based on TypeScript from scratch as a wheel template project for later development business;

1. JWT routing authentication;
2. MySQL database connection based on TypeORM;
3. Use and example of Redis cache relational library;
4. Mocha unit test;
5. KOA-static static resource opening;
6. Split the use of KOA-Route and KOA-Router;

### PROJECT DIR INTRODUCE

```
.
├── src
│   ├── controller        // controller
│   ├── entity
│   ├── redis             //redis config
│   ├── router            //route config
│   ├── service           //service
│   ├── config.ts         //project common config
│   ├── constants.ts      //project const value
│   └── index.ts          //entrance index.js
├── .env                  //config file
├── ecosystem.config.js   //pm2 config
├── ormconfig.json        //database ORM config file
├── nodemon.json          //nodemon config
├── package.json          //npm config
└── tsconfig.json         //ts config
```

### database file path

```
./public/mysql.sql
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
