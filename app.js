const koa = require('koa');
const app = new koa();

// add a middleware.
app.use(async (ctx, next) => {
  ctx.response.status = 200;
  // choose method
  if (ctx.request.method === 'POST') {
    let postdata = '';
    ctx.req.on('data', data => {
      postdata += data;
    });
    ctx.req.on('end', () => {
      console.log(postdata);
    });
  } else if (ctx.request.method === 'GET') {
    if (ctx.request.path !== '/') {
      ctx.response.type = 'text/html';
      ctx.response.body = {
        url: ctx.request.url,
        query: ctx.request.query,
        querystring: ctx.request.querystring
      };
    } else {
      // add response type : text、html、json
      ctx.response.type = 'text';
      ctx.response.body = { name: 'Hello World1' };
    }
  }
});

// add a listen.
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});
