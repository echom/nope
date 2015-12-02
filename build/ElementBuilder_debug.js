(function(np) {
	'use strict';

	var Base = np.ElementBuilder;

	var ElementBuilderDebug = function(parentBuilder, element) {
		Base.call(this, parentBuilder, element);
	};
	np.inherits(Base, ElementBuilderDebug);

	//patch
	np.ElementBuilder = ElementBuilderDebug;
}(this.np));
