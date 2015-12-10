(function(np) {
	'use strict';

	np.ElementBuilder.prototype


	var ElementBuilderDebug = function(parentBuilder, element) {
		Base.call(this, parentBuilder, element);
	};
	np.inherits(Base, ElementBuilderDebug);

	//patch
	np.ElementBuilder = ElementBuilderDebug;
}(this.np));
