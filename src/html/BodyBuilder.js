(function(np) {
	'use strict';

	var Base = np.ElementBuilder;

	/**
	 * @constructor np.BodyBuilder
	 * @param {np.ElementBuilder} parentBuilder this builder's parent
	 * @augments np.ElementBuilder
	 */
	var BodyBuilder = np.inherits(function(parentBuilder) {
		Base.call(this, parentBuilder, new np.Element('body'));
	}, Base);


	np.BodyBuilder = BodyBuilder;
}(this.np));
