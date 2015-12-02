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
	Element.prototype.append = function(el) {
		Array.prototype.forEach.call(arguments,)
	};
	//Element.prototype.append_ = func



}(this.np || (this.np = {})));
