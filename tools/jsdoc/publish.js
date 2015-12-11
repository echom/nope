(function() {
  var xmlbuilder = require('xmlbuilder');

  exports.publish = publish;

  function publish(data, opts) {
    var doc = html = xmlbuilder.create('html').dtd('', '');


    data({ undocumented: true }).remove();
    data({ ignore: true }).remove();

    //filter the root symbols (but not 'package' which is a built in symbol)
    var stack = data(function() {
      return !('memberof' in this) && this.kind !== 'package';
    }).get();

    while(stack.length) { descend(stack.shift(), data, stack); }

    doc.end();
  }

  function descend(symbol, data, stack) {
    process(symbol);
    data({ memberof: symbol.longname })
      .each(function(child) { stack.push(child); });
  };

  function index(symbol) {}
  function summarize(symbol) {}
  function describe(symbol) {}

}());
