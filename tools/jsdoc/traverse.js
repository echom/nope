(function() {
	'use strict';

	var Symbol = function(symbol) {
		this.symbol_ = symbol;
	};
	[
		'kind', 'name', 'longname', 'memberof',
		'scope', 'description', 'meta', 'comment',
		'params', 'returns', 'exceptions', 'readonly',
		'classdesc', 'type'
	].forEach(function(prop) {
		Object.defineProperty(Symbol.prototype, prop, {
			get: function() { return this.symbol_[prop]; }
		});
	});

	Object.defineProperty(Symbol.prototype, 'toplevel', {
		get: function() { return this.kind === 'namespace' || this.kind === 'class'; }
	});
	Object.defineProperty(Symbol.prototype, 'member', {
		get: function() {
			return (this.kind === 'member' || this.kind === 'function' || this.kind === 'event' || this.kind === 'property');
		}
	});

	Object.defineProperty(Symbol.prototype, 'prefix', {
		get: function() {
			return this.longname.substr(0, (this.longname.length - this.name.length)); }
	});

	Object.defineProperty(Symbol.prototype, 'modifiers', {
		get: function() {
			var modifiers = this.access + ' ';
			if(this.member) {
				modifiers += this.scope === 'static' ? 'static ' : '';
				modifiers += this.readonly ? 'readonly ' : '';
				modifiers += this.constant ? 'constant' : '';
			}
			return modifiers;
		}
	});
	Object.defineProperty(Symbol.prototype, 'signature', {
		get: function() {
			var signature;
			if(this.kind == 'function' || this.kind == 'class') {
				if(!this.signature_) {
					signature = '(';
					if(this.params) {
						signature += this.params.map(function(p) {
							return p.name;
						}).join(', ');
					}
					this.signature_ = signature + ')';
				}

				return this.signature_
			}
			else {
				return ' ';
			}
		}
	});
	Object.defineProperty(Symbol.prototype, 'longsignature', {
		get: function() {
			var signature;
			if(this.kind == 'function' || this.kind == 'class') {
				if(!this.longsignature_) {
					signature = '(';
					if(this.params) {
						signature += this.params.map(function(p) {
							return p.name + ':' + (p.type ? p.type.names.join('|') : '*');
						}).join(', ');
					}
					signature += ')';

					if(this.returns && this.returns[0].type) {
						signature += ' : ' + this.returns[0].type.names.join('|');
					} else if(this.kind == 'function') {
						signature += ' : void';
					}

					this.longsignature_ = signature;
				}

				return this.longsignature_
			} else if(this.kind === 'member') {
				return ': ' + (this.type && this.type.names ?  this.type.names.join('|') : '*');
			} else {
				return ' ';
			}
		}
	});
	Object.defineProperty(Symbol.prototype, 'id', {
		get: function() {
			if(!this.id_) {
				this.id_ = this.longname
		            .replace(/#/g, ':')
		            .replace(/[^a-zA-Z\d\.-]/g, '_');
			}
			return this.id_;
		}
	});
	Object.defineProperty(Symbol.prototype, 'access', {
		get: function() { return this.symbol_.access || 'public'; }
	});


	module.exports = function(data, onSymbol, opts) {
		opts = opts || {};

		// prepare data
		if(!opts.undocumented) { data({ undocumented: true }).remove(); }
		if(!opts.ignored) { data({ ignore: true }).remove(); }
		if(!opts.private) { data({ access: 'private' }).remove(); }

    // filter the root symbols (except 'package' which is a built in symbol)
    var stack = data(function() {
      return !('memberof' in this) && this.kind !== 'package';
    }).get();

		while(stack.length) {
			var sym = stack.pop();

      onSymbol(new Symbol(sym));

			data({ memberof: sym.longname, kind: 'class' }).each(function(s) { stack.push(s); });
			data({ memberof: sym.longname, kind: 'namespace' }).each(function(s) { stack.push(s); });
			data({ memberof: sym.longname, kind: 'function' }).each(function(s) { stack.push(s); });
			data({ memberof: sym.longname, kind: 'member' }).each(function(s) { stack.push(s); });
    }
	};
}());
