/**
 * @namespace np
 */

(function(np) {
	np.inherits = inherits;

	function inherits(ctor, base) {
		var f = function() {};
		f.prototype = base.prototype;
		ctor.prototype = new f();
		ctor.prototype.constructor = ctor;
		return ctor;
	}

}(this.np || (this.np = {})));
