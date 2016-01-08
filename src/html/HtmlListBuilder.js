(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder,
      HtmlSimpleBuilder = np.HtmlSimpleBuilder,
      HtmlBuilder = np.HtmlBuilder;

  var HtmlLiBuilder = np.inherits(function(parentBuilder) {
    HtmlSimpleBuilder.call(this, parentBuilder, 'li', np.HtmlContentModel.flow);
  }, HtmlSimpleBuilder);
  HtmlLiBuilder.prototype.value = function(value) {
    if(this.parent.element.type !== 'ol') {
      throw new Error(np.msg.opInvalid(
        'li@value()',
        'cannot set value on <li> that is not nested in <ol>'
      ));
    }
    this.element.attributes().set('value', '' + value);
    return this;
  };

  /**
   * Adds a text node to the object element.
   * @method np.HtmlObjectBuilder#text
   * @param {string} text - the text of the text node.
   * @return {np.HtmlScriptBuilder} this HtmlScriptBuilder instance.
   * @throws {Error} when the 'text' argument is not provided.
   */
  ElementBuilder.addTextAccess_(HtmlLiBuilder);

	/**
	 * Creates a new HtmlUlBuilder instance wrapping a <h*> element.
	 * @constructor np.HtmlUlBuilder
	 * @classdesc The HtmlUlBuilder wraps a HTML <ul> element.
	 * @param {np.ElementBuilder} parentBuilder - this builder's parent
   * @augments np.HtmlBuilder
	 */
	var HtmlUlBuilder = np.inherits(function(parentBuilder) {
		HtmlBuilder.call(this, parentBuilder, 'ul');
	}, HtmlBuilder);

  HtmlUlBuilder.prototype.li = function() { return new HtmlLiBuilder(this); };

  var HtmlOlBuilder = np.inherits(function(parentBuilder) {
    HtmlBuilder.call(this, parentBuilder, 'ol');
  }, HtmlBuilder);

	ElementBuilder.addAttValueAccess_(HtmlOlBuilder, 'start');
  ElementBuilder.addAttValueAccess_(HtmlOlBuilder, 'type');
	ElementBuilder.addAttBoolAccess_(HtmlOlBuilder, 'reversed');

	np.HtmlUlBuilder = HtmlUlBuilder;
  np.HtmlOlBuilder = HtmlOlBuilder;
  np.HtmlLiBuilder = HtmlLiBuilder;
}(this.np));
