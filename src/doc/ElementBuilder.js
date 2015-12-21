(function(np) {
	'use strict';

	/**
	 * Creates a new ElementBuilder instance wrapping the provided element.
	 * @constructor np.ElementBuilder
	 * @classdesc The ElementBuilder class provides the basic API around an
	 *   {@link np.Element} allowing to build a HTML document or fragment easily.
	 * @param {np.ElementBuilder} parentBuilder - this builder's parent
	 * @param {np.Element} element - the element this builder will apply changes to
	 */
	var ElementBuilder = function(parentBuilder, element) {
		if(!element) {
			throw new Error(np.message.argumentEmpty('element'));
		}

		/**
		 * The builder's parent builder.
		 * @member {np.ElementBuilder} np.ElementBuilder#parent
		 */
		this.parent = parentBuilder;

		/**
		 * The element wrapped by this builder.
		 * @member {np.Element} np.ElementBuilder#element
		 */
		this.element = element;

		if(this.parent) {
			this.parent.element.append(this.element);
		}
	};

	/**
	 * Returns this builder's parent.
	 * @method np.ElementBuilder#up
	 * @return np.ElementBuilder this builder's parent builder
	 */
	ElementBuilder.prototype.up = function() {
		if(this.parent) return this.parent;
	};
	/**
	 * Returns the root builder of the tree. If this builder is the root
	 * builder it will return itself.
	 * @method np.ElementBuilder#root
	 * @return np.ElementBuilder the root builder of this builder tree
	 */
	ElementBuilder.prototype.root = function() {
		return this.parent ? this.parent.root() : this;
	};

	/**
	 * Sets an attribute on the element.
	 * @method np.ElementBuilder#attrib
	 * @param {string} name - the attribute's name
	 * @param {*} value - the attribute's value (will be stringified)
	 * @return {np.ElementBuilder} this builder instance
	 * @private
	 */
	ElementBuilder.prototype.attrib_ = function(name, value) {
		this.element.attributes().set('' + name, '' + value);
		return this;
	};

	/**
	 * Adds a text node to this element.
	 * @method np.ElementBuilder#text
	 * @param {string} text - the text node's content
	 * @return {np.ElementBuilder} this builder instance
	 * @private
	 */
	ElementBuilder.prototype.text_ = function(text) {
		this.element.append(new np.Text(text));
	};


	/**
	 * Compile's the entire builder tree given the compile target.
	 * @param {np.Compiler} target - the compile target
	 */
	ElementBuilder.prototype.compile = function(target) {
		target.compile(this.root().element);
	};

	np.ElementBuilder = ElementBuilder;
}(this.np));
