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

    head.ele('style').raw('\n' +
    '.symbol { transition: all 0.5s; }\n' +
    '.symbol-dsc { transition: max-height 0.5s; overflow: hidden; }\n' +
    '.symbol:hover { background: #f5f5f5; }\n' +
    '.symbol > .symbol-dsc { max-height: 0; }\n' +
    '.symbol:hover > .symbol-dsc { max-height: 1000px; }\n' +
    '\n');

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

    parent = parent.ele('section').att('class', 'symbol container-fluid');

    summarizeSymbol(symbol);
    describeSymbol(symbol);

    parent = parent.up();
  }

  function summarizeSymbol(symbol) {
    if(symbol.toplevel) {
      parent.ele('a').att('id', 'sum-' + symbol.id).txt(' ').up()
            .ele('h3').txt(symbol.name).txt(symbol.signature).up()
            .ele('small')
              .att('style', 'display: block; margin: -0.5em 0 1em;')
              .ele('span', symbol.modifiers).att('style', 'color: #777').up()
              .txt(symbol.longname)
              .txt(symbol.longsignature).up()
            .ele('p').txt(symbol.classdesc || ' ')
            .ele('hr');
    } else {
      parent.ele('a').att('id', 'sum-' + symbol.id).txt(' ').up()
            .ele('h4').txt(symbol.name).txt(symbol.signature).up()
            .ele('small')
              .att('style', 'display: block; margin: -0.5em 0 1em;')
              .ele('span', symbol.modifiers).att('style', 'color: #777').up()
              .txt(symbol.longname)
              .txt(symbol.longsignature).up()
            .ele('p').txt(symbol.description || ' ');
    }
  }

  function describeSymbol(symbol) {
    var desc = parent.ele('div').att('class', 'symbol-dsc').att('id', 'dsc-' + symbol.id),
        para,
        err;

    if(symbol.kind === 'class') {
      desc.ele('p').txt(symbol.description || ' ');
    }

    if(symbol.params) {
      desc.ele('h5').txt('Parameters:');
      para = desc.ele('p');
      symbol.params.forEach(function(param) {
        para.ele('span').txt(param.name).up()
            .ele('span').txt(': ' + param.description).up()
            .ele('span').att('style', 'color: #777').txt('(' + fuseTypes(param) + ')').up()
            .ele('br');
      });
    }

    if(symbol.returns) {
      desc.ele('h5').txt('Returns:');
      desc.ele('p')
          .ele('span')
            .txt(symbol.returns[0].description).up()
          .ele('span')
            .att('style', 'color: #777')
            .txt('(' + fuseTypes(symbol.returns[0]) + ')').up()
          .ele('br');
    }
    if(symbol.exceptions) {
      desc.ele('h5').txt('Throws errors:');
      err = desc.ele('p');
      symbol.exceptions.forEach(function(exc) {
        err.ele('span').txt(exc.description).up()
           .ele('span').att('style', 'color: #777').txt('(' + fuseTypes(exc) + ')').up()
           .ele('br');
      });
    }
  }

  function indexSymbol(symbol) {
    index
      .ele('a')
        .att('class', 'list-group-item')
        .att('href', '#sum-' + symbol.id)
        //.ele('i').att('class', iconForKind(symbol.kind)).txt(' ').up()
        .ele('span')
          .raw(symbol.kind == 'namespace' ? '{ } ' : '&nbsp;f*')
          .att('title', symbol.kind == 'namespace' ? 'Namespace' : 'Constructor')
          .up()
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

  function fuseTypes(part) {
    return part.type && part.type.names ? part.type.names.join('|') : '*';
  };

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
