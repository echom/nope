(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder,
      HtmlSimpleBuilder = np.HtmlSimpleBuilder,
      HtmlBuilder = np.HtmlBuilder;

  var HtmlParamBuilder = np.inherits(function(parentBuilder) {
    HtmlBuilder.call(this, parentBuilder, 'param');
  }, HtmlBuilder);

  ElementBuilder.attV_(HtmlParamBuilder, 'name');
  ElementBuilder.attV_(HtmlParamBuilder, 'value');

	/**
	 * Creates a new HtmlObjectBuilder instance wrapping a <h*> element.
	 * @constructor np.HtmlObjectBuilder
	 * @classdesc The HtmlObjectBuilder wraps a HTML <object> element and provides
	 * methods to add common child elements.
	 * @param {np.HtmlElementBuilder} parentBuilder - this builder's parent
   * @augments np.HtmlSimpleBuilder
	 */
	var HtmlObjectBuilder = np.inherits(function(parentBuilder) {
		HtmlSimpleBuilder.call(this, parentBuilder, 'object', 'transparent');
	}, HtmlSimpleBuilder);

  HtmlObjectBuilder.prototype.param = function() {
    if(this.element.children.first(function(e) { return e.type !== 'param'; })) {
			throw new Error(np.msg.opInvalid(
				'param()',
				'cannot append <param> after regular content'
			));
		}
    return new HtmlParamBuilder(this);
  };

	HtmlObjectBuilder.prototype.usemap = function(usemap) {
		if(this.firstUp_(HtmlSimpleBuilder.isAOrButtonAncestor_)) {
			throw new Error(np.msg.opInvalid(
				'usemap()',
				'<object> cannot have "usemap" attribute when nested in <a> or <button>'
			));
		}
	};

	ElementBuilder.attV_(HtmlObjectBuilder, 'data');
	ElementBuilder.attV_(HtmlObjectBuilder, 'type');
	ElementBuilder.attV_(HtmlObjectBuilder, 'height');
	ElementBuilder.attV_(HtmlObjectBuilder, 'width');
	ElementBuilder.attV_(HtmlObjectBuilder, 'name');
	ElementBuilder.attV_(HtmlObjectBuilder, 'form');

  /**
   * Adds a text node to the object element.
   * @method np.HtmlObjectBuilder#text
   * @param {string} text - the text of the text node.
   * @return {np.HtmlScriptBuilder} this HtmlScriptBuilder instance.
   * @throws {Error} when the 'text' argument is not provided.
   */
  ElementBuilder.chlT_(HtmlObjectBuilder);

	np.HtmlObjectBuilder = HtmlObjectBuilder;
}(this.np));
