// mysql/index.js

var mysql = require('mysql');
var config = require('./default.js');

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});
/**
 * mysql test demo, sql file in ./mysql.sql
 */
class Mysql {
  constructor() {}

  /**
   * get news info
   * @returns news list
   */
  queryNews() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * from news_info', function (error, results, fields) {
        if (error) {
          throw error;
        }
        resolve(results);
        // console.log('The solution is: ', results[0].solution);
      });
    });
  }

  /**
   * get users
   * @returns
   */
  queryUsers() {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * from user_info', function (error, results, fields) {
        if (error) {
          throw error;
        }
        resolve(results);
        // console.log('The solution is: ', results[0].solution);
      });
    });
  }
}

module.exports = new Mysql();