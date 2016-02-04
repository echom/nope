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
			throw new Error(np.msg.argEmpty('element'));
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
	 * @return {np.ElementBuilder} this builder's parent builder
	 */
	ElementBuilder.prototype.up = function() {
		if(this.parent) return this.parent;
	};
	/**
	 * Returns the root builder of the tree. If this builder is the root
	 * builder it will return itself.
	 * @method np.ElementBuilder#root
	 * @return {np.ElementBuilder} the root builder of this builder tree
	 */
	ElementBuilder.prototype.root = function() {
		return this.parent ? this.parent.root() : this;
	};

	/**
	 * Compile's the entire builder tree given the compile target.
	 * @param {np.Compiler} target - the compile target
	 */
	ElementBuilder.prototype.compile = function(target) {
		return target.compile(this.root().element);
	};


	// JS logic interface

	ElementBuilder.prototype.idStore_ = function() {
		var root = this.root();
		return root.idStore_ || (root.idStore_ = {});
	};

	ElementBuilder.prototype.save = function(id) {
		this.idStore_()[id] = this;
		return this;
	};
	ElementBuilder.prototype.load = function(id) {
		return this.idStore_[id];
	};

	np.ElementBuilder = ElementBuilder;
}(this.np));
