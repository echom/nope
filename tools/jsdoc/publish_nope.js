(function() {
  var fs = require('fs-extra'),
      path = require('path'),
      xmlbuilder = require('xmlbuilder'),
      traverse = require('./traverse.js');

  exports.publish = publish;

  var doc;

  function publish(data, opts) {
    var conf = env.conf.templates;

    // PREPARE DOCUMENT
    doc = nope.html()
          .link()
            .rel('stylesheet')
            .href('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css')
          .up()
          .script().text('\nfunction toggleSymbol(id) {' +
            'var target = document.getElementById(id);\n' +
            'target.classList.toggle("expanded");\n' +
          '}\n').up()
          .style().text('\n' +
            'html, body { height: 100%; }\n' +
            '.symbol { transition: all 0.3s; }\n' +
            '.symbol:hover { background: #f5f5f5; } \n' +
            //'.symbol-dsc { transition: max-height 0.5s; overflow: hidden; }\n' +
            '.symbol > .symbol-dsc { display: none; }\n' +
            '.symbol.expanded > .symbol-dsc { display: block; }\n' +
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
          '\n').up()
          .body()
            .div().class('vbox').style('height: 100%')
              .div().save('header').style('flex:0').up()
              .div().class('hbox').style('flex:1; min-height:0;')
                .div().save('left').style('flex: 0 1 350px; overflow-y: auto; min-height: 0;')
                  h(3).text('Contents').up()
                  div().save('index').class('list-group').up()
                .up()
                .div().save('right').style('flex: 1 1 800px; overflow-y: auto;').up()
              .up()
            .up()
          .up();

    traverse(data, processSymbol, { private: opts.private });

    doc.load('right').div().class('bottom-padding');

    write(doc, opts.destination);
  }

  function processSymbol(symbol) {
    if(symbol.kind === 'package') {
      doc.title(symbol.name + ' - ' + symbol.description);
      doc.load('header')
            .h(1).text(symbol.name).style('margin-left: 10px;')
            .small(symbol.description).class('lead');
    } else {
      symbol.toplevel && indexSymbol(symbol);

      var symbolHtml = doc.load('right').section()
                    .class('symbol container-fluid' + (symbol.inherited ? ' inherited' : ''))
                    .id('sym-' + symbol.id);
      if(hasDetails(symbol)) {
        symbolHtml.attrib('onclick', 'toggleSymbol("sym-' + symbol.id + '")');
      }

      summarizeSymbol(symbol, symbolHtml);
      describeSymbol(symbol, symbolHtml);

      parent = parent.up();
    }
  }

  function summarizeSymbol(symbol, symbolHtml) {
    if(symbol.toplevel) {
      symbolHtml.a().id('sum-' + symbol.id).up();

      if(hasDetails(symbol)) {
        symbol.ele('button')
                .att('class', 'expansion btn btn-link pull-right')
                .ele('i').att('class', 'glyphicon glyphicon-chevron-down').txt(' ').up()
                .ele('i').att('class', 'glyphicon glyphicon-chevron-up').txt(' ').up()
              .up()
      }

      parent.ele('h3').txt(symbol.name).txt(symbol.signature).up()
            .ele('small')
              .att('style', 'margin: -0.5em 0 1em;')
              .ele('span', symbol.modifiers).att('style', 'color: #777').up()
              .txt(symbol.longname)
              .txt(symbol.longsignature).up()
            .ele('p').txt((symbol.kind === 'class' ? symbol.classdesc : symbol.description) || ' ');
    } else {
      parent.ele('a').att('id', 'sum-' + symbol.id).txt(' ').up();

      if(hasDetails(symbol)) {
        parent.ele('button')
                .att('class', 'expansion btn btn-link pull-right')
                .ele('i').att('class', 'glyphicon glyphicon-chevron-down').txt(' ').up()
                .ele('i').att('class', 'glyphicon glyphicon-chevron-up').txt(' ').up()
              .up()
      }

      parent.ele('h4').txt(symbol.name).txt(symbol.signature).up()
            .ele('small')
              .att('style', 'margin: -0.5em 0 1em;')
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
    var icon, title;
    switch(symbol.kind) {
      case 'class': icon = '&nbspf*'; title = 'Constructor'; break;
      case 'enum': icon = '&nbsp;e'; title = 'Enumeration'; break;
      case 'namespace': icon = '{ }'; title = 'Namespace'; break;
      default: icon = '&nbsp;??'; title = 'Unknown Symbol'; break;
    }

    index
      .ele('a')
        .att('class', 'list-group-item')
        .att('href', '#sum-' + symbol.id)
        .ele('span').raw(icon).att('title', title).up()
        .ele('span').raw('&nbsp;').txt(symbol.longname).up();
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
