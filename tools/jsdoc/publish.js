(function() {
  var fs = require('fs-extra'),
      path = require('path'),
      xmlbuilder = require('xmlbuilder');

  exports.publish = publish;

  function publish(data, opts) {
    // PREPARE DATA
    data({ undocumented: true }).remove();
    data({ ignore: true }).remove();

    //filter the root symbols (but not 'package' which is a built in symbol)
    var stack = data(function() {
      return !('memberof' in this) && this.kind !== 'package';
    }).get();

    // PREPARE DOCUMENT
    var doc = xmlbuilder.create('html').dec().dtd().root(),
        head,
        body,
        header,
        left,
        right,
        index,
        parent;

    head = doc.ele('head');
    head.ele('title').txt('Hello World');
    head.ele('link')
      .att('rel', 'stylesheet')
      .att('href', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.css');

    body = doc.ele('body');
    header = body
              .ele('div').att('class', 'container-fluid')
              .ele('div').att('class', 'col-sm-12').ele('h1').txt('Hello World');
    left = header.up()
              .ele('div').att('class', 'col-md-4 col-lg-3');

    right = left.up()
              .ele('div').att('class', 'col-md-8 col-lg-9');



    index = left.ele('div').att('class', 'list-group');
    parent = right.ele('section');

    var state = {
      symbol: null,
      symbols: data,
      stack: stack,
      index: index,
      parent: parent
    };


    while(stack.length) {
      state.symbol = stack.shift();

      process(state);

      state.symbols({ memberof: state.symbol.longname })
        .each(function(sym) { stack.push(sym); });
    }

    finishOutput(doc, opts.destination);
  }

  function process(state) {
    var symbol = state.symbol;

    symbol.id = makeId(symbol.longname);

    index(state);
  }

  function makeId(longname) {
    return longname
            .replace(/#/g, ':')
            .replace(/[^a-zA-Z\d\.-]/g, '_');
  }
  function summaryAnchor(id) { return '#sum-' + id; }
  function descriptionAnchor(id) { return '#dsc-' + id; }
  function shouldIndex(symbol) {
    return symbol.kind === 'namespace' || symbol.kind === 'class';
  }
  function iconForKind(kind) {
    switch(kind) {
      case 'namespace': return 'glyphicon-folder-open';
      default: return 'glyphicon-asterisk';
    }
  };

  function index(state) {
    var symbol = state.symbol,
        index = state.index;
    if(!shouldIndex(symbol)) return;

    index
      .ele('a')
        .att('class', 'list-group-item')
        .att('href', '#sum-' + symbol.longname)
        .ele('i').att('class', 'glyphicon ' + iconForKind(symbol.kind)).txt(' ').up()
        .raw('&nbsp;')
        .txt(symbol.longname);

  }
  function summarize(state) {}
  function describe(state) {}

  function finishOutput(doc, destination) {
    var contents = doc
          .end({ pretty: true, indent: '  ', newline: '\n' })
          .replace('<?xml version="1.0"?>\n','');
    fs.outputFile(path.join(destination, 'index.html'), contents, function(err) {
      if(err) {
        throw err;
      }
    });
  }

}());
