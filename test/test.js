var np = require('../dist/nope.commonjs.min.js'),
    fs = require('fs');

np.html()
  .title('hello world')
  .body().h(1, 'hello world')
  .compile(np.stream(fs.createWriteStream('test.out.html')));
