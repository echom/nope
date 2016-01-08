(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder,
      HtmlSimpleBuilder = np.HtmlSimpleBuilder;

  var HtmlABuilder = np.inherits(function(parentBuilder) {
    HtmlSimpleBuilder.call(this, parentBuilder, 'a', np.HtmlContentModel.tansparent);
  }, HtmlSimpleBuilder);

  ElementBuilder.addAttValueAccess_(HtmlABuilder, 'href');
  ElementBuilder.addAttValueAccess_(HtmlABuilder, 'target');
  ElementBuilder.addAttValueAccess_(HtmlABuilder, 'rel');
  ElementBuilder.addAttValueAccess_(HtmlABuilder, 'hreflang');
  ElementBuilder.addAttValueAccess_(HtmlABuilder, 'media');
  ElementBuilder.addAttValueAccess_(HtmlABuilder, 'type');

	np.HtmlABuilder = HtmlABuilder;
}(this.np));
