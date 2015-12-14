(function(np) {
  'use strict';

  /**
   * Creates a new Attributes instance.
   * @constructor np.Attributes
   * @classdesc The Attributes class represents a collection of HTML attributes.
	 * It provides methods for retrieving, modifying and deleting attributes.
   */
  var Attributes = function() {
    this.attributes_ = {};
  };

	/**
	 * Returns the raw attributes collection as name-value pairs.
	 * @method np.Attributes#raw
	 * @private
	 * @return {Object} the attributes as name-value pairs.
	 */
	Attributes.prototype.raw = function() {
		return this.attributes_;
	};

	/**
	 * Determines whether this attributes collection has an attribute
	 * with the given name.
	 * @method np.Attributes#has
	 * @param {string} name - the attribute's name
	 * @return {boolean} true if the attribute exist, otherwise false
	 */
	Attributes.prototype.has = function(name) {
		return name in this.attributes_;
	};

	/**
	 * Retrieves an attribute value from the attributes collection.
	 * @method np.Attributes#get
	 * @param {string} name - the attribute's name
	 * @return {string} the attribute's value
	 */
	Attributes.prototype.get = function(name) {
		if(!name) {
			throw new Error(np.message.argumentEmpty('name'));
		}

		return this.attributes_[name];
	};

	/**
	 * Sets an attribute value in the attributes collection or creates it
	 * if it does not yet exist.
	 * @method np.Attributes#set
	 * @param {string} name - the attribute's name
	 * @return {string} the attribute's new value
	 */
	Attributes.prototype.set = function(name, value) {
		if(!name) {
			throw new Error(np.message.argumentEmpty('name'));
		}
		if(!value) {
			throw new Error(np.message.argumentEmpty('value'));
		}
		return (this.attributes_[name] = '' + value);
	};

	/**
	 * Removes an attribute value from the attributes collection.
	 * @method np.Attributes#rem
	 * @param {string} name - the attribute's name
	 */
	Attributes.prototype.rem = function(name) {
		delete this.attributes_[name];
	};

  np.Attributes = Attributes;
}(this.np));
