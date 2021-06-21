/**
 * use typeorm to query database.
 */
const router = require('koa-router')();
const { getConnection } = require('typeorm');
// orm test api
const ormUserInfoTest = async ctx => {
  const connection = getConnection();
  const userRepository = connection.getRepository('UserInfo');
  const users = await userRepository.find();
  ctx.response.body = users;
};

router.post('/ormUserInfoTest', ormUserInfoTest);

module.exports = router;
