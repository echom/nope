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

	BodyBuilder.prototype.h1 = function() { return new HeadingBuilder(this, 1); }
	BodyBuilder.prototype.h2 = function() { return new HeadingBuilder(this, 2); }
	BodyBuilder.prototype.h3 = function() { return new HeadingBuilder(this, 3); }
	BodyBuilder.prototype.h4 = function() { return new HeadingBuilder(this, 4); }
	BodyBuilder.prototype.h5 = function() { return new HeadingBuilder(this, 5); }
	BodyBuilder.prototype.h6 = function() { return new HeadingBuilder(this, 6); }


	np.BodyBuilder = BodyBuilder;
}(this.np));
