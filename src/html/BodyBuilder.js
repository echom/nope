(function(np) {
	'use strict';

	var HtmlElementBuilder = np.HtmlElementBuilder;

	/**
	 * @constructor np.BodyBuilder
	 * @param {np.ElementBuilder} parentBuilder this builder's parent
	 * @augments np.HtmlElementBuilder
	 */
	var BodyBuilder = np.inherits(function(parentBuilder) {
		HtmlElementBuilder.call(this, parentBuilder, new np.Element('body'));
	}, HtmlElementBuilder);

	/**
	 * Adds a heading with the given heading level to this body.
	 * @method np.BodyBuilder#h
	 * @param {number} level - the heading level (1 - 6)
	 * @return {np.HeadingBuilder} the new heading builder
	 * @throws {Error} if the 'level' parameter is not a number.
	 * @throws {RangeError} if the 'level' is smaller than 1 or greater than 6.
	 */
	HtmlElementBuilder.addHeadingAccess_(BodyBuilder);


	np.BodyBuilder = BodyBuilder;
}(this.np));
