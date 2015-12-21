(function() {
  var fs = require('fs-extra'),
      path = require('path'),
      xmlbuilder = require('xmlbuilder'),
      traverse = require('./traverse.js');

  exports.publish = publish;

  var title,
      header,
      index,
      parent;

  function publish(data, opts) {
    var conf = env.conf.templates;
    conf.title = conf.title || 'Documentation';

    // PREPARE DOCUMENT
    var doc = xmlbuilder.create('html').dec().dtd().root(),
        head,
        body,
        left,
        right;

    head = doc.ele('head');
    title = head.ele('title');
    head.ele('meta').att('charset', 'utf-8');
    head.ele('link')
      .att('rel', 'stylesheet')
      .att('href', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css');
    head.ele('script')
      .raw('\nfunction toggleSymbol(id) {' +
              'var target = document.getElementById(id);\n' +
              'target.className = /expanded/.test(target.className) ? \n' +
                '"symbol container-fluid" :\n' +
                '"symbol container-fluid expanded";\n' +
           '}\n');

    head.ele('style').raw('\n' +
    'html, body { height: 100%; }\n' +
    '.symbol { transition: all 0.3s; }\n' +
    '.symbol:hover { background: #f5f5f5; } \n' +
    '.symbol-dsc { transition: max-height 0.5s; overflow: hidden; }\n' +
    '.symbol > .symbol-dsc { max-height: 0; }\n' +
    '.symbol.expanded > .symbol-dsc { max-height: 1000px; }\n' +
    '.symbol p.expansion { margin-top: 10px; }\n' +
    '.symbol .glyphicon-chevron-down { display: inline-block; }\n' +
    '.symbol.expanded .glyphicon-chevron-down { display: none; }\n' +
    '.symbol .glyphicon-chevron-up { display: none; }\n' +
    '.symbol.expanded .glyphicon-chevron-up { display: inline-block; }\n' +
    '.symbol[onclick] { cursor: pointer; }\n' +
    '.bottom-padding { height: 100px; }\n' +
    '.hbox { display: flex; flex-direction: row; align-items: stretch; }\n' +
    '.vbox { display: flex; flex-direction: column; align-items: stretch; }\n' +
    '.vbox > *, .hbox > * { padding: 0 10px; }\n' +
    '\n');

    body = doc.ele('body');
    header = body
              .ele('div').att('class', 'vbox').att('style', 'height: 100%;')
              .ele('div').att('style', 'flex: 0')
    left = header.up()
              .ele('div').att('class', 'hbox').att('style', 'flex: 1; min-height: 0;')
              .ele('div').att('style', 'flex: 0 1 350px; overflow-y: auto; min-height: 0;');

    right = left.up()
              .ele('div').att('style', 'flex: 1 1 800px; overflow-y: auto; ');



    index = left.ele('h3').txt('Contents').up()
                .ele('div').att('class', 'list-group')
    parent = right;

    traverse(data, processSymbol, { private: opts.private });

    right.ele('div').att('class', 'bottom-padding');

    write(doc, opts.destination);
  }

  function processSymbol(symbol) {
    if(symbol.kind === 'package') {
      title.txt(symbol.name).txt(' - ').txt(symbol.description);
      header.ele('h1').txt(symbol.name).att('style', 'margin-left: 10px;')
            .ele('small').att('class', 'lead').txt(symbol.description).up();
    } else {
      symbol.toplevel && indexSymbol(symbol);

      parent = parent.ele('section')
          .att('class', 'symbol container-fluid')
          .att('id', 'sym-' + symbol.id);
      if(hasDetails(symbol)) {
        parent.att('onclick', 'toggleSymbol("sym-' + symbol.id + '")');
      }

      summarizeSymbol(symbol);
      describeSymbol(symbol);

      parent = parent.up();
    }
  }

  function summarizeSymbol(symbol) {
    if(symbol.toplevel) {
      parent.ele('a').att('id', 'sum-' + symbol.id).txt(' ').up();

      if(hasDetails(symbol)) {
        parent.ele('p')
                .att('class', 'expansion btn btn-link pull-right')
                .ele('i').att('class', 'glyphicon glyphicon-chevron-down').txt(' ').up()
                .ele('i').att('class', 'glyphicon glyphicon-chevron-up').txt(' ').up()
              .up()
      }

      parent.ele('h3').txt(symbol.name).txt(symbol.signature).up()
            .ele('small')
              .att('style', 'display: block; margin: -0.5em 0 1em;')
              .ele('span', symbol.modifiers).att('style', 'color: #777').up()
              .txt(symbol.longname)
              .txt(symbol.longsignature).up()
            .ele('p').txt((symbol.kind === 'class' ? symbol.classdesc : symbol.description) || ' ');
    } else {
      parent.ele('a').att('id', 'sum-' + symbol.id).txt(' ').up();

      if(hasDetails(symbol)) {
        parent.ele('p')
                .att('class', 'expansion btn btn-link pull-right')
                .ele('i').att('class', 'glyphicon glyphicon-chevron-down').txt(' ').up()
                .ele('i').att('class', 'glyphicon glyphicon-chevron-up').txt(' ').up()
              .up()
      }

      parent.ele('h4').txt(symbol.name).txt(symbol.signature).up()
            .ele('small')
              .att('style', 'display: block; margin: -0.5em 0 1em;')
              .ele('span', symbol.modifiers).att('style', 'color: #777').up()
              .txt(symbol.longname)
              .txt(symbol.longsignature).up()
            .ele('p').txt(symbol.description || ' ');
    }
  }

  function describeSymbol(symbol) {
    var desc = parent
          .ele('div').att('class', 'symbol-dsc row')
          .ele('div')
            .att('class', 'col-xs-11 col-xs-offset-1')
            .att('id', 'dsc-' + symbol.id),
        para,
        err;

    if(symbol.params) {
      desc.ele('h5').txt('Parameters:');
      para = desc.ele('p');
      symbol.params.forEach(function(param) {
        para.ele('code').txt(param.name).up()
            .ele('span').txt('- ' + param.description).up()
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

    if(symbol.toplevel){
      desc.up().up().ele('hr');
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

  function hasDetails(symbol) {
    if(symbol.kind == 'function') return true;
    if(symbol.kind == 'class' && (symbol.params || symbol.exceptions)) return true;
    return false;
  };

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
