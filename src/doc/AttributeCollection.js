(function(np) {
  'use strict';

  /**
   * Creates a new AttributeCollection instance.
   * @constructor np.AttributeCollection
   * @classdesc The AttributeCollection class represents a collection of
   * document attributes.
	 * It provides methods for retrieving, modifying and deleting attributes.
   */
  var AttributeCollection = function() {
    this.attributes_ = {};
  };

  AttributeCollection.prototype.has = function(name) {
    return (name in this.attributes_);
  };

	/**
	 * Retrieves an attribute value from the attributes collection.
	 * @method np.AttributeCollection#get
	 * @param {string} name - the attribute's name
	 * @return {string} the attribute's value
	 */
	AttributeCollection.prototype.get = function(name) {
		if(!name) {
			throw new Error(np.msg.argEmpty('name'));
		}

    var attribute = this.attributes_[name];

		return attribute && attribute.get();
	};

	/**
	 * Sets an attribute value in the attributes collection or creates it
	 * if it does not yet exist.
	 * @method np.AttributeCollection#set
	 * @param {string} name - the attribute's name
   * @param {*} value - the attribute's value (will be converted to string)
	 * @return {*} the attribute's new value
	 */
	AttributeCollection.prototype.set = function(name, value) {
		if(!name) {
			throw new Error(np.msg.argEmpty('name'));
		}
		if(!value) {
			throw new Error(np.msg.argEmpty('value'));
		}

    var attribute = this.attributes_[name];
    if(!attribute) {
      attribute = new np.Attribute(name, value);
      attribute.inv_.parent = this.inv_;
      this.attributes_[name] = attribute;
    }

    attribute.set(value);

    return value;
	};

	/**
	 * Removes an attribute value from the attributes collection.
	 * @method np.AttributeCollection#remove
	 * @param {string} name - the attribute's name
	 */
	AttributeCollection.prototype.remove = function(name) {
		delete this.attributes_[name];
	};

  AttributeCollection.prototype.forEach = function(fn, ctx) {
    if(!fn) {
      throw new Error(np.msg.argEmpty('fn'));
    }
    ctx = ctx || this;

    for(var key in this.attributes_) {
      fn.call(ctx, this.attributes_[key], key, this);
    }
  };

  np.AttributeCollection = AttributeCollection;
}(this.np));
