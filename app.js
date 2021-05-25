const koa = require('koa');
const app = new koa();

// add a post middleware.use curl -d "params1=value1" http://localhost:3000/ test
app.use(async (ctx, next) => {
  let postdata = '';
  ctx.req.on('data', data => {
    postdata += data;
  });
  ctx.req.on('end', () => {
    console.log(postdata);
  });
});

// add a middleware.
// app.use(async (ctx, next) => {
//   await next();
//   ctx.response.type = 'text/html';
//   ctx.response.body = {
//     url: ctx.request.url,
//     query: ctx.request.query,
//     querystring: ctx.request.querystring
//   };
// });

// add a listen.
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});
