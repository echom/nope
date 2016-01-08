(function(np) {
	'use strict';

	var HtmlSimpleBuilder = np.HtmlSimpleBuilder;

	/**
	 * @constructor np.HtmlBodyBuilder
	 * @param {np.ElementBuilder} parentBuilder this builder's parent
	 * @augments np.HtmlSimpleBuilder
	 */
	var HtmlBodyBuilder = np.inherits(function(parentBuilder) {
		HtmlSimpleBuilder.call(this, parentBuilder, 'body', 'flow');
	}, HtmlSimpleBuilder);

	np.HtmlBodyBuilder = HtmlBodyBuilder;
}(this.np));
