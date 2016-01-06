(function(np) {
	'use strict';

	var HtmlBuilder = np.HtmlBuilder;

	/**
	 * @constructor np.HtmlBodyBuilder
	 * @param {np.ElementBuilder} parentBuilder this builder's parent
	 * @augments np.HtmlBuilder
	 */
	var HtmlBodyBuilder = np.inherits(function(parentBuilder) {
		HtmlBuilder.call(this, parentBuilder, new np.Element('body'));

		this.contentModel = 'flow';
	}, HtmlBuilder);

	/**
	 * Adds a heading with the given heading level to this body.
	 * @method np.HtmlBodyBuilder#h
	 * @param {number} level - the heading level (1 - 6)
	 * @return {np.HtmlHeadingBuilder} the new heading builder
	 * @throws {Error} if the 'level' parameter is not a number.
	 * @throws {RangeError} if the 'level' is smaller than 1 or greater than 6.
	 */
	HtmlBuilder.addHeadingAccess_(HtmlBodyBuilder);


	np.HtmlBodyBuilder = HtmlBodyBuilder;
}(this.np));
