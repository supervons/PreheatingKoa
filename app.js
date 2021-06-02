const koa = require('koa');
const route = require('koa-route');
const app = new koa();

const getHtml = ctx => {
  const fs = require('fs');
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./template/test.html');
};

// get request
const getText = ctx => {
  ctx.response.type = 'text/html';
  ctx.response.body = {
    url: ctx.request.url,
    query: ctx.request.query,
    querystring: ctx.request.querystring
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

app.use(route.get('/getHtml', getHtml));
app.use(route.get('/getText', getText));
app.use(route.post('/postTest', postTest));

// add a listen.
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});
