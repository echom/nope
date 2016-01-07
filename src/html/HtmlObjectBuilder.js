(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder,
      HtmlBuilder = np.HtmlBuilder,
      HtmlVoidBuilder = np.HtmlVoidBuilder;

  var HtmlParamBuilder = np.inherits(function(parentBuilder) {
    HtmlVoidBuilder.call(this, parentBuilder, 'param');
  }, HtmlVoidBuilder);

  ElementBuilder.addAttValueAccess_(HtmlParamBuilder, 'name');
  ElementBuilder.addAttValueAccess_(HtmlParamBuilder, 'value');

	/**
	 * Creates a new HtmlObjectBuilder instance wrapping a <h*> element.
	 * @constructor np.HtmlObjectBuilder
	 * @classdesc The HtmlObjectBuilder wraps a HTML <object> element and provides
	 * methods to add common child elements.
	 * @param {np.HtmlElementBuilder} parentBuilder - this builder's parent
   * @augments np.HtmlBuilder
	 */
	var HtmlObjectBuilder = np.inherits(function(parentBuilder) {
		HtmlBuilder.call(this, parentBuilder, 'object', 'transparent');
	}, HtmlBuilder);

  HtmlObjectBuilder.prototype.param = function() {
    if(this.element.children.first(function(e) { return e.type !== 'param'}))
    return new HtmlParamBuilder(this);
  };

  /**
   * Adds a text node to the heading element.
   * @method np.HtmlScriptBuilder#text
   * @param {string} text - the text of the text node.
   * @return {np.HtmlScriptBuilder} this HtmlScriptBuilder instance.
   * @throws {Error} when the 'text' argument is not provided.
   */
  ElementBuilder.addTextAccess_(HtmlHeadingBuilder);

	np.HtmlObjectBuilder = HtmlObjectBuilder;
}(this.np));
