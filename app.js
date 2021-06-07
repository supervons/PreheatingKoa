const koa = require('koa');
const route = require('koa-route');
const app = new koa();
// open static dir
const staticFiles = require('koa-static');
const path = require('path');
app.use(staticFiles(path.join(__dirname, 'public')));

// file upload
const fs = require('fs');
const os = require('os');
const koaBody = require('koa-body');

const compose = require('koa-compose');

// error middleware
const handler = async (ctx, next) => {
  try {
    // run next middleware
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
    // if u want open app.on('error'), u need this line
    ctx.app.emit('error', err, ctx);
  }
};

// cookie demo.
const cookie = ctx => {
  const n = Number(ctx.cookies.get('test') || 0) + 1;
  ctx.cookies.set('test', n);
  ctx.response.body = n + ' tests';
};

// main api, default data.
const main = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = `<p>Hello BaseKoa!</p>`;
};

const getHtml = ctx => {
  const fs = require('fs');
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./public/test.html');
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

// Middleware composition
const middlewares = compose([getText, getHtml]);

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

// global error listener.
app.on('error', err => {
  console.log('===>server error', err);
  console.log(err);
});

// cookie demo.
const upload = ctx => {
  const tmpdir = os.tmpdir();
  const filePaths = [];
  const files = ctx.request.files || {};
  console.log(JSON.stringify(files));
  for (let key in files) {
    const file = files[key];
    const filePath = path.join(__dirname + '/tmp', file.name);
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
  }
  ctx.body = filePaths;
};

app.use(koaBody({ multipart: true }));
app.use(handler);
app.use(route.get('/', main));
app.use(route.get('/getCompose', middlewares));
app.use(route.get('/getHtml', getHtml));
app.use(route.get('/getText', getText));
app.use(route.post('/postTest', postTest));
app.use(route.get('/redirect', redirect));
app.use(route.get('/cookie', cookie));
app.use(route.post('/upload', upload));
app.use(route.get('/error', error));

// add a listen.
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});
