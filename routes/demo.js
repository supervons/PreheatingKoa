const router = require('koa-router')();
const { mysql } = require('../data_base/index');
const redis = require('../config/redis/index');
const redisTool = new redis();
// jwt
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config/redis/constants');

// mysql test
const mysqlTest = async ctx => {
  // query redis data. if redis exist, don't query database.
  const redisNewsData = await redisTool.get('news');
  console.log(ctx.request.body.title);
  let newsData = [];
  if (redisNewsData) {
    newsData = JSON.parse(redisNewsData);
  } else {
    let data = await mysql.queryNews({ title: ctx.request.body.title });
    newsData = data;
    // update redis data.
    await redisTool.set('news', JSON.stringify(data));
  }
  ctx.body = {
    code: 1,
    data: newsData,
    mesg: 'ok'
  };
};

// mysql get users test
const getUsers = async ctx => {
  const redisNewsData = await redisTool.get('users');
  let newsData = [];
  if (redisNewsData) {
    newsData = JSON.parse(redisNewsData);
  } else {
    let data = await mysql.queryUser();
    newsData = data;
    // update redis data.
    await redisTool.set('users', JSON.stringify(data));
  }
  ctx.body = {
    code: 1,
    data: newsData,
    mesg: 'ok'
  };
};

// post request test
const postTest = async ctx => {
  ctx.response.body = ctx.request.body.data;
};

// router redirect
const redirect = ctx => {
  ctx.response.redirect('/');
  console.log('get path params ：' + ctx.params.id);
  ctx.response.body = `<p>redirect</p>`;
};

// error demo
const error = ctx => {
  ctx.throw(404);
  ctx.response.status = 404; // this line = ctx.throw(404);
  ctx.response.body = 'Page Not Found';
};

// get jwt Token
const getJwtToken = async ctx => {
  const userId = ctx.request.body.userId;
  const passWord = ctx.request.body.userId;
  let user = await mysql.queryUser(userId, passWord);
  console.log(user);
  if (user.length !== 0) {
    ctx.body = { token: jwt.sign({ id: userId }, JWT_SECRET) };
  } else {
    ctx.status = 401;
  }
};

router.post('/postTest', postTest);
router.post('/mysqlTest', mysqlTest);
router.post('/getUsers', getUsers);
router.get('/redirect/:id', redirect);
router.get('/error', error);
router.post('/getJwtToken', getJwtToken);

module.exports = router;
