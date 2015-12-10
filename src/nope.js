/**
 * @namespace np
 */

(function(np) {

	/**
	 * Establishes prototypical inheritance between two constructor functions.
	 * @method np.inherits
	 * @param {function} ctor - the constructor function
	 * @param {function} base - the base class constructor function
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
	 * @private
	 */
	np.message.invalidArgument = function(name, message) {
		return 'ArgumentError: "' + name + '" - ' + message;
	};

	/**
	 * Formats an error message when an argument is not supplied.
	 * @method np.message.argumentEmpty
	 * @param {string} name - the argument's name
	 * @private
	 */
	np.message.argumentEmpty = function(name) {
		return np.error.arg(name, 'was not supplied');
	};

	/**
	 * Formats an error message for invalid operations.
	 * @method np.message.invalidOperation
	 * @param {string} operation - the operation which failed
	 * @param {string} message - the message
	 */

	np.message.invalidOperation = function(operation, message) {
		return 'OperationError: "' + operation + '" - ' + message;
	};

}(this.np || (this.np = {})));
