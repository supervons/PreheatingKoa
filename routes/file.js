const router = require('koa-router')();
// file upload
const fs = require('fs');

// cookie demo.
const upload = ctx => {
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

router.post('/upload', upload);

module.exports = router;
