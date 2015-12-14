/**
 * @namespace np
 */

(function(np) {

	/**
	 * Establishes prototypical inheritance between two constructor functions.
	 * @method np.inherits
	 * @param {function} ctor - the constructor function
	 * @param {function} base - the base class constructor function
	 * @return {function} the constructor function now inheriting from the base
	 *  constructor
	 * @private
	 */
	np.inherits = function(ctor, base) {
		var f = function() {};
		f.prototype = base.prototype;
		ctor.prototype = new f();
		ctor.prototype.constructor = ctor;
		return ctor;
	};

	/**
	 * This namespace contains functions for formatting messages.
	 * @namespace np.message
	 * @private
	 */
	np.message = {};

	/**
	 * Formats a generic argument error.
	 * @method np.message.invalidArgument
	 * @param {string} name - the argument's name
	 * @param {string} message - the message
	 * @return {string} the formatted error message
	 * @private
	 */
	np.message.invalidArgument = function(name, message) {
		return 'InvalidArgument: "' + name + '" - ' + message;
	};

	/**
	 * Formats an error message for a missing argument.
	 * @method np.message.argumentEmpty
	 * @param {string} name - the argument's name
	 * @return {string} the formatted error message
	 * @private
	 */
	np.message.argumentEmpty = function(name) {
		return np.message.invalidArgument(name, 'was not supplied');
	};

	/**
	 * Formats a error message for arguments of the wrong type.
	 * @method np.message.argumentType
	 * @param {string} name - the argument's name
	 * @param {string} type - the expected type
	 * @return {string} the formatted error message
	 * @private
	 */
	np.message.argumentType = function(name, type) {
		return np.message.invalidArgument(name, 'must be of type ' + type);
	};

	/**
	 * Formats an error message for invalid operations.
	 * @method np.message.invalidOperation
	 * @param {string} operation - the operation which failed
	 * @param {string} message - the message
	 * @return {string} the formatted error message
	 * @private
	 */

	np.message.invalidOperation = function(operation, message) {
		return 'InvalidOperation: "' + operation + '" - ' + message;
	};

}(this.np || (this.np = {})));
