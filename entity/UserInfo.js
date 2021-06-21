/**
 * UserInfo Entity
 */
let EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
  name: 'UserInfo',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    loginId: {
      name: 'login_id',
      type: 'varchar'
    },
    userName: {
      name: 'user_name',
      type: 'varchar'
    },
    userSex: {
      name: 'user_sex',
      type: 'varchar'
    },
    userAddress: {
      name: 'user_address',
      type: 'varchar'
    },
    userCellphone: {
      name: 'user_cellphone',
      type: 'varchar'
    },
    userType: {
      name: 'user_type',
      type: 'varchar'
    }
  }
});
