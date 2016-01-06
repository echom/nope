(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder,
      HtmlBuilder = np.HtmlBuilder;

	/**
	 * Creates a new HtmlHeadingBuilder instance wrapping a <h*> element.
	 * @constructor np.HtmlHeadingBuilder
	 * @classdesc The HtmlHeadingBuilder wraps a HTML <head> element and provides
	 * methods to add common child elements.
	 * @param {np.ElementBuilder} parentBuilder - this builder's parent
   * @param {number} [level=1] - a number between 1 and 6 representing this
   * heading's level
	 * @augments np.HtmlBuilder
	 */
	var HtmlHeadingBuilder = np.inherits(function(parentBuilder, level) {
    level = level === undefined ? 1 : +level;

    if(!np.isA(level, 'number')) {
      throw new Error(np.msg.argType('level', 'number'));
    } else if(level < 1 || level > 6) {
      throw new RangeError(np.msg.outOfRange('level', '[1..6]'));
    }

		HtmlBuilder.call(this, parentBuilder, new np.Element('h' + level));
	}, HtmlBuilder);

  /**
   * Adds a text node to the heading element.
   * @method np.HtmlScriptBuilder#text
   * @param {string} text - the text of the text node.
   * @return {np.HtmlScriptBuilder} this HtmlScriptBuilder instance.
   * @throws {Error} when the 'text' argument is not provided.
   */
  ElementBuilder.addTextAccess_(HtmlHeadingBuilder);

	np.HtmlHeadingBuilder = HtmlHeadingBuilder;
}(this.np));
