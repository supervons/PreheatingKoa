const router = require('koa-router')();
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
router.get('/redirect', redirect);
router.get('/error', error);

module.exports = router;
