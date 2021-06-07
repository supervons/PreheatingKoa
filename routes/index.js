const router = require('koa-router')();
const compose = require('koa-compose');

router.get('/', async (ctx, next) => {
  ctx.response.body = `<p>Hello man!</p>`;
});

router.get('/cookie', async (ctx, next) => {
  const n = Number(ctx.cookies.get('test') || 0) + 1;
  ctx.cookies.set('test', n);
  ctx.response.body = n + ' tests';
});

router.get('/main', async (ctx, next) => {
  ctx.response.type = 'html';
  ctx.response.body = `<p>Hello BaseKoa!</p>`;
});

// get request
const getText = ctx => {
  ctx.response.type = 'text/html';
  ctx.response.body = {
    url: ctx.request.url,
    query: ctx.request.query,
    querystring: ctx.request.querystring
  };
};

// get request
const getHtml = ctx => {
  const fs = require('fs');
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./public/test.html');
};

// Middleware composition
const middlewares = compose([getText, getHtml]);

router.get('/getCompose', middlewares);

module.exports = router;
