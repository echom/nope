(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder,
      HtmlSimpleBuilder = np.HtmlSimpleBuilder;

	/**
	 * Creates a new HtmlHeadingBuilder instance wrapping a <h*> element.
	 * @constructor np.HtmlHeadingBuilder
	 * @classdesc The HtmlHeadingBuilder wraps a HTML <h1>, <h2>, <h3>, <h4>, <h5>
	 * or <h6> element and provides methods to add common child elements.
	 * @param {np.HtmlElementBuilder} parentBuilder - this builder's parent
   * @param {number} [level=1] - a number between 1 and 6 representing this
   * heading's level
	 * @augments np.HtmlSimpleBuilder
	 */
	var HtmlHeadingBuilder = np.inherits(function(parentBuilder, level, text) {
    level = level === undefined ? 1 : +level;

    if(!np.isA(level, 'number')) {
      throw new Error(np.msg.argType('level', 'number'));
    } else if(level < 1 || level > 6) {
      throw new RangeError(np.msg.outOfRange('level', '[1..6]'));
    }

		HtmlSimpleBuilder.call(this, parentBuilder, 'h' + level, 'phrasing');
	}, HtmlSimpleBuilder);

  /**
   * Adds a text node to the heading element.
   * @method np.HtmlScriptBuilder#text
   * @param {string} text - the text of the text node.
   * @return {np.HtmlScriptBuilder} this HtmlScriptBuilder instance.
   * @throws {Error} when the 'text' argument is not provided.
   */
  ElementBuilder.chlT_(HtmlHeadingBuilder);

	np.HtmlHeadingBuilder = HtmlHeadingBuilder;
}(this.np));
