(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder,
			HtmlBuilder = np.HtmlBuilder,
      HtmlSimpleBuilder = np.HtmlSimpleBuilder;

  var HtmlABuilder = np.inherits(function(parentBuilder) {
    HtmlSimpleBuilder.call(this, parentBuilder, 'a', HtmlBuilder.CONTENT_MODEL_TRANSPARENT);
  }, HtmlSimpleBuilder);

  ElementBuilder.attV_(HtmlABuilder, 'href');
  ElementBuilder.attV_(HtmlABuilder, 'target');
  ElementBuilder.attV_(HtmlABuilder, 'rel');
  ElementBuilder.attV_(HtmlABuilder, 'hreflang');
  ElementBuilder.attV_(HtmlABuilder, 'media');
  ElementBuilder.attV_(HtmlABuilder, 'type');

	np.HtmlABuilder = HtmlABuilder;
}(this.np));
