(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder;

	/**
	 * @constructor np.HtmlScriptBuilder
	 * @param {np.ElementBuilder} parentBuilder this builder's parent
	 * @augments np.ElementBuilder
	 */
	var HtmlScriptBuilder = np.inherits(function(parentBuilder) {
		ElementBuilder.call(this, parentBuilder, new np.Element('script'));
	}, ElementBuilder);

  /**
   * Sets the address of the external script to use.
   * @method np.HtmlScriptBuilder#src
   * @param {string} src - the script address
   * @return {np.HtmlScriptBuilder} this HtmlScriptBuilder instance.
   * @throws {Error} when the 'src' argument is empty.
   */
  ElementBuilder.addAttValueAccess_(HtmlScriptBuilder, 'src');

  /**
   * Sets the language of the script or format of the data.
   * @method np.HtmlScriptBuilder#type
   * @param {string} type - the mime-type script language
   * @return {np.HtmlScriptBuilder} this HtmlScriptBuilder instance.
   * @throws {Error} when the 'type' argument is empty.
   */
  ElementBuilder.addAttValueAccess_(HtmlScriptBuilder, 'type');

  /**
   * Sets the character encoding of the external script.
   * @method np.HtmlScriptBuilder#charset
   * @param {string} charset - the character encoding
   * @return {np.HtmlScriptBuilder} this HtmlScriptBuilder instance.
   * @throws {Error} when the 'charset' argument is empty.
   */
  ElementBuilder.addAttValueAccess_(HtmlScriptBuilder, 'charset');

  /**
   * Specifies that script should be executed after the document has been parsed.
   * Valid values are {@code 'defer'} or {@code true} to defer the execution, and
	 * {@code false} to disable deferred execution.
   * @method np.HtmlScriptBuilder#defer
   * @param {string|boolean} defer - whether to defer script execution
   * @return {np.HtmlScriptBuilder} this HtmlScriptBuilder instance.
   * @throws {Error} when the 'defer' argument is not provided.
   */
	ElementBuilder.addAttBoolAccess_(HtmlScriptBuilder, 'defer');

  /**
   * Specifies that the script should be executed asynchronously, as soon as it
   * becomes available.
   * Valid values are {@code 'async'} or {@code true} to enable asynchronous
	 * execution, and {@code false} to disable asynchronous execution.
   * @method np.HtmlScriptBuilder#async
   * @param {string|boolean} async - whether to defer script execution
   * @return {np.HtmlScriptBuilder} this HtmlScriptBuilder instance.
   * @throws {Error} when the 'async' argument is not provided.
   */
  ElementBuilder.addAttBoolAccess_(HtmlScriptBuilder, 'async');

  /**
   * Adds a text node to the script element.
   * @method np.HtmlScriptBuilder#text
   * @param {string} text - the text of the text node.
   * @return {np.HtmlScriptBuilder} this HtmlScriptBuilder instance.
   * @throws {Error} when the 'text' argument is not provided.
   */
  ElementBuilder.addTextAccess_(HtmlScriptBuilder);

	np.HtmlScriptBuilder = HtmlScriptBuilder;
}(this.np));
