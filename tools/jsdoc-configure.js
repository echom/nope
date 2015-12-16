var fs = require('fs-extra');

module.exports = function(baseConf, fileName) {
  var conf = {
    source: { include: baseConf.src },
    plugins: baseConf.plugins || [],
    templates: baseConf.template || {},
    opts: {
      template: baseConf.template ? baseConf.template.path : 'templates/default',
      encoding: 'utf8',
      destination: baseConf.destination
    }
  };

  if(baseConf.opts) {
    Object.keys(baseConf.opts).forEach(function(key) {
      conf.opts[key] = baseConf.opts[key];
    });
  }

  fileName = fileName || '.jsdoc';
  fs.outputFile(fileName, JSON.stringify(conf), function(err) { if(err) { throw err; } });

  return fileName;
};
