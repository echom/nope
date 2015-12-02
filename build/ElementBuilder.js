(function(np) {
	'use strict';

	var ElementBuilder = function(parentBuilder, element) {
		this.parent = parentBuilder;
		this.element = element;

		if(this.parent) {
			this.parent.element.append(this.element);
		}
	};
	ElementBuilder.prototype.up = function() {
		if(this.parent) return this.parent;
	};
	ElementBuilder.prototype.root = function() {
		return this.parent ? this.parent.root() : this;
	};
	ElementBuilder.prototype.attr = function(name, value) {
		this.el.attr(name, value);
		return this;
	};
	ElementBuilder.prototype.compile = function(target) {
		target.compile(this.root().el);
	};

	np.ElementBuilder = ElementBuilder;
}(this.np));
