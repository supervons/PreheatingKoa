const koa = require('koa');
const app = new koa();
// open static dir
const staticFiles = require('koa-static');
const path = require('path');
app.use(staticFiles(path.join(__dirname, 'public')));
const koaBody = require('koa-body');

// import routes
const demo = require('./routes/demo');
const file = require('./routes/file');
const index = require('./routes/index');

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

app.use(handler);
app.use(koaBody({ multipart: true }));
app.use(demo.routes(), demo.allowedMethods());
app.use(file.routes(), file.allowedMethods());
app.use(index.routes(), index.allowedMethods());

// add a listen.
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});
