(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder,
      HtmlSimpleBuilder = np.HtmlSimpleBuilder;

  var HtmlInsBuilder = np.inherits(function(parentBuilder) {
    HtmlSimpleBuilder.call(this, parentBuilder, np.Element('ins'), np.HtmlBuilder.CONTENT_MODEL_TRANSPARENT);
  }, HtmlSimpleBuilder);
  ElementBuilder.attV_(HtmlInsBuilder, 'cite');
  ElementBuilder.attV_(HtmlInsBuilder, 'datetime');

  var HtmlDelBuilder = np.inherits(function(parentBuilder) {
    HtmlSimpleBuilder.call(this, parentBuilder, np.Element('del'), np.HtmlBuilder.CONTENT_MODEL_TRANSPARENT);
  }, HtmlSimpleBuilder);
  ElementBuilder.attV_(HtmlDelBuilder, 'cite');
  ElementBuilder.attV_(HtmlDelBuilder, 'datetime');

	np.HtmlInsBuilder = HtmlInsBuilder;
  np.HtmlDelBuilder = HtmlDelBuilder;
}(this.np));
