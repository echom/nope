(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder,
      HtmlElementBuilder = np.HtmlElementBuilder;

	/**
	 * Creates a new HeadingBuilder instance wrapping a <h*> element.
	 * @constructor np.HeadingBuilder
	 * @classdesc The HeadingBuilder wraps a HTML <head> element and provides
	 * methods to add common child elements.
	 * @param {np.ElementBuilder} parentBuilder - this builder's parent
   * @param {number} [level=1] - a number between 1 and 6 representing this
   * heading's level
	 * @augments np.HtmlElementBuilder
	 */
	var HeadingBuilder = np.inherits(function(parentBuilder, level) {
    level = level === undefined ? 1 : +level;

    if(!np.isA(level, 'number')) {
      throw new Error(np.msg.argType('level', 'number'));
    } else if(level < 1 || level > 6) {
      throw new RangeError(np.msg.outOfRange('level', '[1..6]'))
    }

		HtmlElementBuilder.call(this, parentBuilder, new np.Element('h' + level));
	}, HtmlElementBuilder);

  /**
   * Adds a text node to the heading element.
   * @method np.ScriptBuilder#text
   * @param {string} text - the text of the text node.
   * @return {np.ScriptBuilder} this ScriptBuilder instance.
   * @throws {Error} when the 'text' argument is not provided.
   */
  ElementBuilder.addTextAccess_(HeadingBuilder);

	np.HeadingBuilder = HeadingBuilder;
}(this.np));
