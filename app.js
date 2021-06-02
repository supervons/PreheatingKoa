const koa = require('koa');
const app = new koa();

// add a middleware.
app.use(async (ctx, next) => {
  console.log(app);
  ctx.response.status = 200;
  // Execute the next middleware
  await next();
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
    if (ctx.request.path === '/getHtml') {
      // read template file.
      const fs = require('fs');
      ctx.response.type = 'html';
      ctx.response.body = fs.createReadStream('./template/test.html');
    } else if (ctx.request.path !== '/') {
      ctx.response.type = 'text/html';
      ctx.response.body = {
        url: ctx.request.url,
        query: ctx.request.query,
        querystring: ctx.request.querystring
      };
    } else {
      // root path add response type : text、html、json
      ctx.response.type = 'text';
      ctx.response.body = { name: 'Hello World1' };
    }
  }
});

// middleware2
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// middleware3
app.use(async (ctx, next) => {
  console.log(`i'm last middleware`);
});

// add a listen.
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});
