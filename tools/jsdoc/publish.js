(function() {
  var fs = require('fs-extra'),
      path = require('path'),
      xmlbuilder = require('xmlbuilder'),
      traverse = require('./traverse.js');

  exports.publish = publish;

  var index,
      parent;

  function publish(data, opts) {
    var conf = env.conf.templates;
    conf.title = conf.title || 'Documentation';


    // PREPARE DOCUMENT
    var doc = xmlbuilder.create('html').dec().dtd().root(),
        head,
        body,
        header,
        left,
        right;

    head = doc.ele('head');
    head.ele('title').txt(conf.title);
    head.ele('meta').att('charset', 'utf-8');
    head.ele('link')
      .att('rel', 'stylesheet')
      .att('href', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css');

    body = doc.ele('body');
    header = body
              .ele('div').att('class', 'container-fluid')
              .ele('div').att('class', 'col-xs-12').ele('h1').txt(conf.title);
    left = header.up()
              .ele('div').att('class', 'col-md-4 col-lg-3');

    right = left.up()
              .ele('div').att('class', 'col-md-8 col-lg-9');



    index = left.ele('h3').txt('Contents').up()
                .ele('div').att('class', 'list-group')
    parent = right;

    traverse(data, processSymbol, { private: opts.private });

    write(doc, opts.destination);
  }

  function processSymbol(symbol) {
    symbol.toplevel && indexSymbol(symbol);

    parent = parent.ele('section');
    summarizeSymbol(symbol);
    describeSymbol(symbol);

    parent = parent.up();
  }

  function summarizeSymbol(symbol) {
    if(symbol.toplevel) {
      parent.ele('a').att('id', 'sum-' + symbol.id).txt(' ').up()
            .ele('h3').txt(symbol.name).up()
            .ele('small')
              .att('style', 'display: block; margin: -0.5em 0 1em;')
              .ele('span', symbol.access + ' ').att('style', 'color: #777').up()
              .txt(symbol.longname).up()
            .ele('hr');
    } else {
      parent.ele('a').att('id', 'sum-' + symbol.id).txt(' ').up()
            .ele('h4').txt(symbol.name).txt(symbol.signature).up()
            .ele('small')
              .att('style', 'display: block; margin: -0.5em 0 1em;')
              .ele('span', symbol.access + ' ').att('style', 'color: #777').up()
              .ele('span', symbol.scope == 'static' ? 'static ' : ' ').att('style', 'color: #777').up()
              .txt(symbol.longname)
              .txt(symbol.longsignature).up();
    }
  }

  function describeSymbol(symbol) {
    var desc =parent.ele('div').att('id', 'dsc-' + symbol.id);
    desc.ele('p').txt(symbol.description || ' ');
    if(symbol.returns) {
      desc.ele('p').txt('Returns ' + symbol.returns[0].description);
    }
  }

  function indexSymbol(symbol) {
    index
      .ele('a')
        .att('class', 'list-group-item')
        .att('href', '#sum-' + symbol.id)
        //.ele('i').att('class', iconForKind(symbol.kind)).txt(' ').up()
        .ele('span').att('class', 'label label-default').txt(symbol.kind == 'namespace' ? '{} ' : 'f* ').up()
        .ele('span').raw('&nbsp;').txt(symbol.longname);
  }

  function iconForKind(kind) {
    switch(kind) {
      case 'namespace': return 'glyphicon glyphicon-folder-open';
      case 'class': return 'glyphicon glyphicon-plus-sign';
    }
  }
  function iconForAccess(access) {
    switch(access) {
      case 'private': return 'glyphicon glyphicon-minus';
      default: return 'glyphicon glyphicon-plus'
    }
  }

  function write(doc, destination) {
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
