const router = require('koa-router')();
const mysql = require('../data_base/index');
const redis = require('../config/redis/index');
const redisTool = new redis();

// mysql test
const mysqlTest = async ctx => {
  // query redis data. if redis exist, don't query database.
  const redisNewsData = await redisTool.get('news');
  let newsData = [];
  if (redisNewsData) {
    newsData = JSON.parse(redisNewsData);
  } else {
    let data = await mysql.queryNews();
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

// mysql test
const getUsers = async ctx => {
  let data = await mysql.queryUsers();
  ctx.body = {
    code: 1,
    data: data,
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
  ctx.response.body = `<p>redirect</p>`;
};

// error demo
const error = ctx => {
  ctx.throw(404);
  ctx.response.status = 404; // this line = ctx.throw(404);
  ctx.response.body = 'Page Not Found';
};

router.post('/postTest', postTest);
router.post('/mysqlTest', mysqlTest);
router.post('/getUsers', getUsers);
router.get('/redirect', redirect);
router.get('/error', error);

module.exports = router;
