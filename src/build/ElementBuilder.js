(function(np) {
	'use strict';

	/**
	 * @constructor np.ElementBuilder
	 * @param {np.ElementBuilder} parentBuilder - this builder's parent
	 * @param {np.Element} element - the element this builder will apply changes
	 *    to
	 */
	var ElementBuilder = function(parentBuilder, element) {
		/**
		 * @member {np.ElementBuilder} np.ElementBuilder#parent
		 */
		this.parent = parentBuilder;
		this.element = element;

		if(this.parent) {
			this.parent.element.append(this.element);
		}
	};

	/**
	 * @method np.ElementBuilder#up
	 * @return np.ElementBuilder this builder's parent builder
	 */
	ElementBuilder.prototype.up = function() {
		if(this.parent) return this.parent;
	};
	/**
	 * @method np.ElementBuilder#root
	 * @return np.ElementBuilder the root builder of this builder tree
	 */
	ElementBuilder.prototype.root = function() {
		return this.parent ? this.parent.root() : this;
	};

	/**
	 * Sets an attribute on the element.
	 * @method np.ElementBuilder#attr
	 * @param {string} name - the attribute's name
	 * @param {*} value - the attribute's value (will be stringified)
	 * @return np.ElementBuilder this builder instance
	 */
	ElementBuilder.prototype.attr = function(name, value) {
		this.el.attr(name, value);
		return this;
	};
	ElementBuilder.prototype.compile = function(target) {
		target.compile(this.root().el);
	};

	np.ElementBuilder = ElementBuilder;
}(this.np));
