(function(np) {
	'use strict';

	/**
	 * Creates a new ElementBuilder instance wrapping the provided element.
	 * @constructor np.ElementBuilder
	 * @classdesc The ElementBuilder class provides the basic API around an
	 *   {@link np.Element} allowing to build a HTML document or fragment easily.
	 */
	var ElementBuilder = function() {
		this.root_ = null;
		this.current_ = null;
		this.idStore_ = {};
	};

	ElementBuilder.prototype.up = function() {
		this.current_ = this.current_.up();
		return this;
	};

	ElementBuilder.prototype.current = function() { return this.current_; };
	ElementBuilder.prototype.root = function() { return this.root_; };

	ElementBuilder.prototype.tx_ = function(element, text) {
		element.append(new np.Text(text));
	};
	ElementBuilder.prototype.at_ = function(element, name, value) {
		element.attributes().set(name, value);
	};
	ElementBuilder.prototype.el_ = function(parent, name, text, attributes) {
		var that = this,
				el = new np.Element(name);
		if(text) {
			this.tx_(el, text);
		}
		if(attributes) {
			Object.keys(attributes).forEach(function(key) {
				that.at_(el, key, attributes[key]);
			});
		}

		if(parent) { parent.append(el); }
		return el;
	};


	ElementBuilder.prototype.el = function(name, text, attributes) {
		this.current_ = this.el_(this.current_, name, text, attributes);
		if(!this.root_) {
			this.root_ = this.current_;
		}

		return this;
	};
	ElementBuilder.prototype.text = function(text) {
		this.tx_(this.current_, text);
		return this;
	};
	ElementBuilder.prototype.att = function(name, value) {
		if(np.isA(name, 'string')) {
      this.at_(this.current_, name, value);
    } else if(np.isA(name, 'object')){
      Object.keys(name).forEach(function(key) {
        this.at_(this.current_, key, name[key]);
      });
    } else {
      throw new Error(np.msg.argInvalid(
        'name',
        '"' + name + '" is neither an object nor an attribute name',
        element && element.path()
      ));
    }
		return this;
	};


	/**
	 * Compile's the entire builder tree given the compile target.
	 * @param {np.Compiler} target - the compile target
	 */
	ElementBuilder.prototype.compile = function(target) {
		if(this.root_) {
			return target.compile(this.root());
		}
		throw new Error(np.msg.opInvalid(
			'compile()',
			'cannot compile builder without any elements'
		));
	};

	ElementBuilder.prototype.save = function(id) {
		this.idStore_[id] = this.current_;
		return this;
	};
	ElementBuilder.prototype.load = function(id) {
		this.current_ = this.idStore_[id];
		return this;
	};

	np.ElementBuilder = ElementBuilder;
}(this.np));
