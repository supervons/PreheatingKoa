/**
 * Authorized API
 */
const router = require('koa-router')();
const { mysql } = require('../data_base/index');
const redis = require('../config/redis/index');
const redisTool = new redis();
// jwt
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config/redis/constants');
// get jwt Token
const getJwtToken = async ctx => {
  const userId = ctx.request.body.userId;
  const passWord = ctx.request.body.userId;
  let user = await mysql.queryUser(userId, passWord);
  console.log(user);
  if (user.length !== 0) {
    ctx.status = 200;
    ctx.body = {
      code: 1,
      msg: 'login success',
      token: jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: 60 * 60 })
    };
  } else {
    ctx.status = 401;
  }
};

router.post('/getJwtToken', getJwtToken);

module.exports = router;
