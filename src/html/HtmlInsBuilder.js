(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder,
      HtmlSimpleBuilder = np.HtmlSimpleBuilder;

  var HtmlInsBuilder = np.inherits(function(parentBuilder) {
    HtmlSimpleBuilder.call(this, parentBuilder, np.Element('ins'), np.HtmlContentModel.transparent);
  }, HtmlSimpleBuilder);
  ElementBuilder.addAttValueAccess_(HtmlInsBuilder, 'cite');
  ElementBuilder.addAttValueAccess_(HtmlInsBuilder, 'datetime');

  var HtmlDelBuilder = np.inherits(function(parentBuilder) {
    HtmlSimpleBuilder.call(this, parentBuilder, np.Element('del'), np.HtmlContentModel.transparent);
  }, HtmlSimpleBuilder);
  ElementBuilder.addAttValueAccess_(HtmlDelBuilder, 'cite');
  ElementBuilder.addAttValueAccess_(HtmlDelBuilder, 'datetime');

	np.HtmlInsBuilder = HtmlInsBuilder;
  np.HtmlDelBuilder = HtmlDelBuilder;
}(this.np));
