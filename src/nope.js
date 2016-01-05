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
	 * Checks whether the object passed as first argument is either of the type
	 * (if type is a string) or an instance of the type (if type is a function).
	 * @method np.isA
	 * @param {*} obj - the object to be checked
	 * @param {string|function} type - the type string or constructor function to
	 *  check against
	 * @return {boolean} true if the type check passes, false otherwise.
	 * @private
	 */
	np.isA = function(obj, type) {
		return (typeof(type) == 'string') ?
							(typeof(obj) == type) :
							((typeof(type) == 'function') ? (obj instanceof type) : false);
	};

	/**
	 * This namespace contains functions for formatting messages.
	 * @namespace np.msg
	 * @private
	 */
	np.msg = {};

	/**
	 * Formats a generic argument error.
	 * @method np.msg.argInvalid
	 * @param {string} name - the argument's name
	 * @param {string} message - the message
	 * @return {string} the formatted error message
	 * @private
	 */
	np.msg.argInvalid = function(name, message) {
		return 'InvalidArgument: "' + name + '" - ' + message;
	};

	/**
	 * Formats an error message for a missing argument.
	 * @method np.msg.argEmpty
	 * @param {string} name - the argument's name
	 * @return {string} the formatted error message
	 * @private
	 */
	np.msg.argEmpty = function(name) {
		return np.msg.argInvalid(name, 'was not supplied');
	};

	/**
	 * Formats a error message for arguments of the wrong type.
	 * @method np.msg.argType
	 * @param {string} name - the argument's name
	 * @param {string} type - the expected type
	 * @return {string} the formatted error message
	 * @private
	 */
	np.msg.argType = function(name, type) {
		return np.msg.argInvalid(name, 'must be of type ' + type);
	};

	/**
	 * Formats an error message for invalid operations.
	 * @method np.msg.opInvalid
	 * @param {string} operation - the operation which failed
	 * @param {string} message - the message
	 * @return {string} the formatted error message
	 * @private
	 */
	np.msg.opInvalid = function(operation, message) {
		return 'InvalidOperation: "' + operation + '" - ' + message;
	};

	/**
	 * Formats an out of range error message.
	 * @method np.msg.outOfRange
	 * @param {string} name - the name of the erroneous variable
	 * @param {string} range - the expected range
	 * @return {string} the formatted error message
	 * @private
	 */
	np.msg.outOfRange = function(name, range) {
		return 'OutOfRange: "' + name + '" must in range ' + range + '].';
	};

	// np.msg.templateString = function(tmpl, vars) {
	// 	var msg = tmpl,
	// 			key,
	// 			name;
	// 	for(key in vars) {
	// 		if(vars.hasOwnProperty(key)) {
	// 			name = '${' + key + '}'
	// 			msg = msg.replace(name, vars[key]);
	// 		}
	// 	}
	// 	return msg;
	// };

}(this.np || (this.np = {})));
