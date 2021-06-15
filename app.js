const koa = require('koa');
const app = (module.exports = new koa());
// open static dir
const staticFiles = require('koa-static');
const path = require('path');
app.use(staticFiles(path.join(__dirname, 'public')));
const koaBody = require('koa-body');
const router = require('koa-router')();
// import routes
const demo = require('./routes/demo');
const file = require('./routes/file');
const index = require('./routes/index');

// error middleware
const handler = async (ctx, next) => {
  try {
    // run next middleware
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    // console request log.
    console.log(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms`);
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
    // if u want open app.on('error'), u need this line
    ctx.app.emit('error', err, ctx);
  }
};

// if method wrong, return 405 Method Not Allowed.
app.use(handler).use(router.allowedMethods());
app.use(koaBody({ multipart: true }));
app.use(demo.routes(), demo.allowedMethods());
app.use(file.routes(), file.allowedMethods());
app.use(index.routes(), index.allowedMethods());

// add a listen.
if (!module.parent) {
  app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
  });
}
