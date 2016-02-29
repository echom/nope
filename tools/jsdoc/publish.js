(function() {
	var fs = require('fs-extra'),
		path = require('path'),
		np = require('../../dist/nope.commonjs.min.js'),
		traverse = require('./traverse.js');

	exports.publish = publish;

	var html = np.html(),
			title,
			header,
			index,
			parent,
	    left,
	    right;

	function publish(data, opts) {
		var conf = env.conf.templates;

		// PREPARE DOCUMENT
		var doc = html.html([
			html.head([
				title = html.title(),
				html.meta({ charset: 'utf-8' }),
				html.link({
					rel: 'stylesheet',
					href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css'
				}),
				html.script(['\n',
					'function toggleSymbol(id) {\n',
					'var target = document.getElementById(id);\n',
					'target.classList.toggle("expanded");\n',
					'}\n'
				]),
				html.style([
					'html, body { height: 100%; }\n',
					'.symbol { transition: all 0.3s; }\n',
					'.symbol:hover { background: #f5f5f5; } \n',
					//'.symbol-dsc { transition: max-height 0.5s; overflow: hidden; }\n',
					'.symbol > .symbol-dsc { display: none; }\n',
					'.symbol.expanded > .symbol-dsc { display: block; }\n',
					'.symbol p.expansion { margin-top: 10px; }\n',
					'.symbol .glyphicon-chevron-down { display: inline-block; }\n',
					'.symbol.expanded .glyphicon-chevron-down { display: none; }\n',
					'.symbol .glyphicon-chevron-up { display: none; }\n',
					'.symbol.expanded .glyphicon-chevron-up { display: inline-block; }\n',
					'.symbol[onclick] { cursor: pointer; }\n',
					'.bottom-padding { height: 100px; }\n',
					'.hbox { display: flex; flex-direction: row; align-items: stretch; }\n',
					'.vbox { display: flex; flex-direction: column; align-items: stretch; }\n',
					'.vbox > *, .hbox > * { padding: 0 10px; }\n',
					'\n'
				])
			]),
			html.body([
				html.div({ class: 'vbox', style: 'height: 100%;' }, [
				  header = html.div({ style: 'flex: 0;' }),
				  html.div({ class: 'hbox', style: 'flex: 1; min-height: 0;' }, [
					  left = html.div({ style: 'flex: 0 1 350px; overflow-y: auto; min-height: 0;' }, [
						  html.h3('Contents'),
						  index = html.div({ class: 'list-group' })
					  ]),
					  right = html.div({ style: 'flex: 1 1 800px; overflow-y: auto;' })
					])
				])
			])
		]);

		parent = right;

		traverse(data, processSymbol, {
			private: opts.private
		});

		right.add(np.html(html => html.div({
			class: 'bottom.padding'
		})))

		write(doc, opts.destination);
	}

	function processSymbol(symbol) {
		if (symbol.kind === 'package') {
			title.add([symbol.name, ' - ', symbol.description]);
			header.add([
        html.h1({ style: 'margin-left: 10px;' }, [
				  symbol.name,
				  html.small({ class: 'lead' }, symbol.description)
			  ]),
        html.hr()
      ]);
		} else {
			symbol.toplevel && indexSymbol(symbol);

      right.add([
        parent = html.section({
  				class: 'symbol container-fluid' + (symbol.inherited ? ' inherited' : ''),
  				id: 'sym-' + symbol.id
  			})
      ]);

			if (hasDetails(symbol)) {
				parent.set('onclick', 'toggleSymbol("sym-' + symbol.id + '")');
			}

			summarizeSymbol(symbol);
			describeSymbol(symbol);
		}
	}

	function summarizeSymbol(symbol) {
		if (symbol.toplevel) {
			parent.add(html.a({ id: 'sum-' + symbol.id }));

			if (hasDetails(symbol)) {
				parent.add(html.button({ class: 'expansion btn btn-link pull-right' }, [
					html.i({ class: 'glyphicon glyphicon-chevron-down' }),
					html.i({ class: 'glyphicon glyphicon-chevron-up' })
				]));
			}

			parent.add([
				html.h3([symbol.name, symbol.signature]),
				html.small({ style: 'margin: -0.5em 0 1em;' }, [
					html.span({ style: 'color: #777' }, symbol.modifiers),
					symbol.longname,
					symbol.longsignature
				]),
				html.p(symbol.kind === 'class' ? symbol.classdesc : symbol.description)
			]);

		} else {
			parent.add(html.a({ id: 'sum-' + symbol.id }));

			if (hasDetails(symbol)) {
				parent.add(html.button({ class: 'expansion btn btn-link pull-right'
				}, [
					html.i({ class: 'glyphicon glyphicon-chevron-down' }),
					html.i({ class: 'glyphicon glyphicon-chevron-up' })
				]));
			}

			parent.add([
				html.h4([symbol.name, symbol.signature]),
				html.small({ style: 'margin: -0.5em 0 1em;' }, [
					html.span({ style: 'color: #777' }, symbol.modifiers),
					symbol.longname,
					symbol.longsignature
				]),
				html.p(symbol.description)
			]);
		}
	}

	function describeSymbol(symbol) {
		parent.add(html.div({ class: 'symbol-dsc row'}, [
			html.div({ id: 'dsc-' + symbol.id, class: 'col-xs-12' }, [
  			symbol.params && html.h5('Parameters:'),
  			symbol.params && html.p(symbol.params.reduce((acc, param) => acc.concat([
  				html.code(param.name),
  				html.span(['- ', param.description]),
  				html.span({
  					style: 'color: #777'
  				}, ['(', fuseTypes(param), ')']),
  				html.br()
  			]), [])),
  			symbol.returns && html.h5('Returns:'),
  			symbol.returns && html.p([
  				html.span(symbol.returns[0].description),
  				html.span({ style: 'color: #777' }, ['(', fuseTypes(symbol.returns[0]), ')']),
  				html.br()
  			]),
  			symbol.exceptions && html.h5('Throws errors:'),
  			symbol.exceptions && html.p(symbol.exceptions.reduce((acc, exc) => acc.concat([
  				html.span(['- ', exc.description]),
  				html.span({
  					style: 'color: #777'
  				}, ['(', fuseTypes(exc), ')']),
  				html.br()
  			]), []))
      ]),
  		symbol.toplevel && html.hr()
		]));
	}

	function indexSymbol(symbol) {
		var icon, title;
		switch (symbol.kind) {
			case 'class':
				icon = '&nbsp;f*';
				title = 'Constructor';
				break;
			case 'enum':
				icon = '&nbsp;e';
				title = 'Enumeration';
				break;
			case 'namespace':
				icon = '{ }';
				title = 'Namespace';
				break;
			default:
				icon = '&nbsp;??';
				title = 'Unknown Symbol';
				break;
		}

		index.add(html.a({
			class: 'list-group-item',
			href: '#sum-' + symbol.id
		}, [
			html.span({
				title: title
			}, icon),
			html.span(['&nbsp; ', symbol.longname])
		]));
	}

	function hasDetails(symbol) {
		if (symbol.kind == 'function') return true;
		if (symbol.kind == 'class' && (symbol.params || symbol.exceptions)) return true;
		return false;
	};

	function fuseTypes(part) {
		return part.type && part.type.names ? part.type.names.join('|') : '*';
	};

	function write(doc, destination) {
		var contents = doc.compile(np.str());
		fs.outputFile(path.join(destination, 'index.html'), contents, function(err) {
			if (err) {
				throw err;
			}
		});
	}

}());
