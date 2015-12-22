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

	// /**
	//  * Returns the raw attributes collection as name-value pairs.
	//  * @method np.AttributeCollection#raw
	//  * @private
	//  * @return {Object} the attributes as name-value pairs.
	//  */
	// AttributeCollection.prototype.raw = function() {
	// 	return this.attributes_;
	// };

	/**
	 * Determines whether this attributes collection has an attribute
	 * with the given name.
	 * @method np.AttributeCollection#has
	 * @param {string} name - the attribute's name
	 * @return {boolean} true if the attribute exist, otherwise false
	 */
	AttributeCollection.prototype.has = function(name) {
		return !!name && name in this.attributes_;
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

		return this.attributes_[name];
	};

	/**
	 * Sets an attribute value in the attributes collection or creates it
	 * if it does not yet exist.
	 * @method np.AttributeCollection#set
	 * @param {string} name - the attribute's name
   * @param {*} value - the attribute's value (will be converted to string)
	 * @return {string} the attribute's new value
	 */
	AttributeCollection.prototype.set = function(name, value) {
		if(!name) {
			throw new Error(np.msg.argEmpty('name'));
		}
		if(!value) {
			throw new Error(np.msg.argEmpty('value'));
		}
		return (this.attributes_[name] = '' + value);
	};

	/**
	 * Removes an attribute value from the attributes collection.
	 * @method np.AttributeCollection#remove
	 * @param {string} name - the attribute's name
	 */
	AttributeCollection.prototype.remove = function(name) {
		delete this.attributes_[name];
	};

  AttributeCollection.prototype.each = function(fn, ctx) {
    if(!fn) {
      throw new Error(np.msg.argEmpty('fn'));
    }
    
    for(var key in this.attributes_) {
      fn.call(ctx || this, key, this.attributes_[key]);
    }
  };


  np.AttributeCollection = AttributeCollection;
}(this.np));
