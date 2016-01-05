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
		target.compile(this.root().element);
	};


	/**
	 * Adds an attribute value setter function to a class. The class will receive
	 * a function with the name of the attribute taking one string parameter.
	 * @example
	 *   var CustomElementBuilder = function() {...};
	 *   ElementBuilder.addAttValueAccess_(CustomElementBuilder, 'customAttr');
	 *   var builder = new CustomElementBuilder().customAttr('value');
	 *
	 * @method np.ElementBuilder.addAttValueAccess_
	 * @param {function} ctor - the constructor function to augment
	 * @param {string} attribute - the attribute name to expose
	 * @private
	 */
	ElementBuilder.addAttValueAccess_ = function(ctor, attribute) {
		ctor.prototype[attribute] = function(value) {
			if(value === undefined) {
				throw new Error(np.msg.argEmpty(attribute));
			}
			this.element.attributes().set('' + attribute, '' + value);
			return this;
		};
	};

	/**
	 * Adds an attribute setter function to a class. The class will receive a
	 * function with the name of the attribute taking one boolean parameter to
	 * enable or disable the attribute.
	 * @example
	 *   var CustomElementBuilder = function() {...};
	 *   ElementBuilder.addAttBoolAccess_(CustomElementBuilder, 'customAttr');
	 *   var builder = new CustomElementBuilder().customAttr(true);
	 *
	 * @method np.ElementBuilder.addAttBoolAccess_
	 * @param {function} ctor - the constructor function to augment
	 * @param {string} attribute - the attribute name to expose
	 * @private
	 */
	ElementBuilder.addAttBoolAccess_ = function(ctor, attribute) {
		ctor.prototype[attribute] = function(value) {
			if(value === undefined) {
				throw new Error(np.msg.argEmpty(attribute));
			}
			value = value !== false ? true : false;
			if(value) {
				this.element.attributes().set('' + attribute, '' + attribute);
			} else {
				this.element.attributes().remove('' + attribute);
			}

			return this;
		};
	};


	/**
	 * Adds a text setter function to a class. The class will receive a
	 * function with the name of the attribute taking one string parameter.
	 * @example
	 *   var CustomElementBuilder = function() {...};
	 *   ElementBuilder.addTextAccess_(CustomElementBuilder);
	 *   var builder = new CustomElementBuilder().text('text');
	 *
	 * @method np.ElementBuilder.addTextAccess_
	 * @param {function} ctor - the constructor function to augment
	 * @private
	 */
	ElementBuilder.addTextAccess_ = function(ctor) {
		ctor.prototype.text = function(text) {
			this.element.append(new np.Text(text));
		};
		return this;
	};

	np.ElementBuilder = ElementBuilder;
}(this.np));
