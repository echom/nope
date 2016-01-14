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

	/**
	 * Adds an attribute value setter function to a class. The class will receive
	 * a function with the name of the attribute taking one string parameter.
	 * @example
	 *   var CustomElementBuilder = function() {...};
	 *   ElementBuilder.attV_(CustomElementBuilder, 'customAttr');
	 *   var builder = new CustomElementBuilder().customAttr('value');
	 *
	 * @method np.ElementBuilder.attV_
	 * @param {function} ctor - the constructor function to augment
	 * @param {string} attribute - the attribute name to expose
	 * @private
	 */
	ElementBuilder.attV_ = function(ctor, attribute) {
		ctor.prototype[attribute] = function(value) {
			if(value === undefined) {
				throw new Error(np.msg.argEmpty(attribute, this.element.path()));
			}
			this.element.attributes().set(attribute, value);
			return this;
		};
	};

	/**
	 * Adds an attribute setter function to a class. The class will receive a
	 * function with the name of the attribute taking one boolean parameter to
	 * enable or disable the attribute.
	 * @example
	 *   var CustomElementBuilder = function() {...};
	 *   ElementBuilder.attB_(CustomElementBuilder, 'customAttr');
	 *   var builder = new CustomElementBuilder().customAttr(true);
	 *
	 * @method np.ElementBuilder.attB_
	 * @param {function} ctor - the constructor function to augment
	 * @param {string} attribute - the attribute name to expose
	 * @private
	 */
	ElementBuilder.attB_ = function(ctor, attribute) {
		ctor.prototype[attribute] = function(value) {
			if(value === undefined) {
				throw new Error(np.msg.argEmpty('value', this.element.path()));
			}
			if(np.isA(value, 'function')) value = value(this);

			value = value !== false ? true : false;
			if(value) {
				this.element.attributes().set(attribute, attribute);
			} else {
				this.element.attributes().remove(attribute);
			}

			return this;
		};
	};

	/**
	 * Adds a text setter function to a class. The class will receive a
	 * function with the name of the attribute taking one string parameter.
	 * @example
	 *   var CustomElementBuilder = function() {...};
	 *   ElementBuilder.chlT_(CustomElementBuilder);
	 *   var builder = new CustomElementBuilder().text('text');
	 *
	 * @method np.ElementBuilder.chlT_
	 * @param {function} ctor - the constructor function to augment
	 * @private
	 */
	ElementBuilder.chlT_ = function(ctor) {
		ctor.prototype.text = function(text) {
			if(text) {
				if(np.isA(text, 'function')) text = text(this);
				this.element.append(new np.Text(text));
			}
			return this;
		};
	};

	np.ElementBuilder = ElementBuilder;
}(this.np));
