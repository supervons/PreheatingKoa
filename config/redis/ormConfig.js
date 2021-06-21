// orm
const ormConfig = {
  name: 'default',
  type: 'mysql',
  host: '',
  port: 3306,
  username: '',
  password: '',
  database: 'commonProject',
  synchronize: false,
  entities: [require('../../entity/UserInfo')],
  cli: {
    entitiesDir: '../../entity'
  }
};
module.exports = ormConfig;
