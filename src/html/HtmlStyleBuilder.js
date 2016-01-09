(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder;

	/**
	 * @constructor np.HtmlStyleBuilder
	 * @param {np.ElementBuilder} parentBuilder this builder's parent
	 * @augments np.ElementBuilder
	 */
	var HtmlStyleBuilder = np.inherits(function(parentBuilder) {
		ElementBuilder.call(this, parentBuilder, new np.Element('style'));
	}, ElementBuilder);

  /**
   * Sets the MIME type that designates a styling language.
   * @method np.HtmlStyleBuilder#type
   * @param {string} type - the MIME type of the style language
   * @return {np.HtmlStyleBuilder} this HtmlStyleBuilder instance.
   * @throws {Error} when the 'type' argument is empty.
   */
  ElementBuilder.attV_(HtmlStyleBuilder, 'type');

  /**
   * Specifies which media the styles apply to.
   * @method np.HtmlStyleBuilder#media
   * @param {string} media - a valid media query list
   * @return {np.HtmlStyleBuilder} this HtmlStyleBuilder instance.
   * @throws {Error} when the 'media' argument is empty.
   */
  ElementBuilder.attV_(HtmlStyleBuilder, 'media');

  /**
   * Indicates that the specified style information is meant to apply only to
   * the style element’s parent element, and that element’s child nodes.
   * Otherwise, the specified styles are meant to apply to the entire document.
   * Valid values are {@code 'scoped'} or {@code true} to enable scoping and
   * {@code false} to disable scoping.
   * @method np.HtmlStyleBuilder#defer
   * @param {string|boolean} defer - whether to defer script execution
   * @return {np.HtmlStyleBuilder} this HtmlStyleBuilder instance.
   * @throws {Error} when the 'defer' argument is not provided.
   */
	ElementBuilder.attB_(HtmlStyleBuilder, 'scoped');

  /**
   * Adds a text node to the style element.
   * @method np.HtmlStyleBuilder#text
   * @param {string} text - the text of the text node.
   * @return {np.HtmlStyleBuilder} this HtmlStyleBuilder instance.
   * @throws {Error} when the 'text' argument is not provided.
   */
  ElementBuilder.chlT_(HtmlStyleBuilder);

	np.HtmlStyleBuilder = HtmlStyleBuilder;
}(this.np));
