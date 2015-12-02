(function(np) {
	'use strict';

	var inherits = function(base, ctor) {
		var f = function() {};
		f.prototype = base.prototype;
		ctor.prototype = new f();
		ctor.prototype.constructor = ctor;
	};


	var MockElement = function(type) {
		this.type = type;
		this.children = [];
		this.attributes = {};
	};
	MockElement.prototype.append = function(mockElement) {
		this.children.push(mockElement);
		mockElement.parent = this;
	};
	MockElement.prototype.att = function(name, value) {
		this.attributes[name] = value;
	};


	var MockBuilder = function(type, parent) {
		this.el = new MockElement(type);
		this.parent = parent;
		parent && parent.el.append(this.el);
	};
	MockBuilder.prototype.up = function() {
		if(this.parent) return this.parent;
	};
	MockBuilder.prototype.root = function() {
		return this.parent ? this.parent.root() : this;
	};
	MockBuilder.prototype.spawn = function(type) {
		return new MockBuilder(type, this);
	};
	MockBuilder.prototype.att = function(name, value) {
		this.el.att(name, value);
		return this;
	}

	MockBuilder.prototype.compile = function(target) {
		target.compile(this.root().el);
	};

	var MockCompiler = function() {
		this.src = ''
		this.tabs = '  ';
		for(var i = 0; i < 10; i++) {
			this.tabs = this.tabs + this.tabs;
		}
	};
	MockCompiler.prototype.compile = function(el) {
		this.compile_(el, 0);
		var pre = document.createElement('pre');
		pre.innerHTML = this.src;
		document.body.appendChild(pre);
	};
	MockCompiler.prototype.compile_ = function(el, level) {
		var that = this;
		var str = [
			this.tabs.substring(0, level * 2),
			el.type,
			' {',
			//splice index: 2
			'\n',
			this.tabs.substring(0, level * 2),
			'}\n'
		];

		for(var key in el.attributes) {
			str.splice(3, 0, '\n', this.tabs.substring(0, level * 2 + 2), key, ': ', '' + el.attributes[key]);
		}
		that.src += str.join('');

		el.children.forEach(function(el) { that.compile_(el, level + 1); });
	}

	np.html = function() { return new MockBuilder('html'); };
	np.pre = function() { return new MockCompiler(); };
}(this.np || (this.np = {})));
