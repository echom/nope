/**
 * @namespace np
 */

(function(np) {
	np.inherits = inherits;
	np.Element = Element;

	function inherits(ctor, base) {
		var f = function() {};
		f.prototype = base.prototype;
		ctor.prototype = new f();
		ctor.prototype.constructor = ctor;
		return ctor;
	};

	function Element(type) {
		this.type = type;
	};



}(this.np || (this.np = {})));
