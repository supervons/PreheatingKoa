const router = require('koa-router')();
const mysql = require('../data_base/index');

// mysql test
const mysqlTest = async ctx => {
  let data = await mysql.queryNews();
  ctx.body = {
    code: 1,
    data: data,
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
  ctx.response.type = 'application/json';
  let postdata = '';
  await ctx.req.on('data', data => {
    postdata += data;
  });
  ctx.req.on('end', () => {
    console.log(postdata);
  });
  ctx.response.body = postdata;
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
