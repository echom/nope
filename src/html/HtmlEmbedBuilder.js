(function(np) {
	'use strict';

  var ElementBuilder = np.ElementBuilder,
      HtmlBuilder = np.HtmlBuilder;

  var HtmlEmbedBuilder = np.inherits(function(parentBuilder) {
    HtmlBuilder.call(this, parentBuilder, np.Element('embed'), np.HtmlBuilder.CONTENT_MODEL_TRANSPARENT);
  }, HtmlBuilder);
  ElementBuilder.attV_(HtmlEmbedBuilder, 'src');
  ElementBuilder.attV_(HtmlEmbedBuilder, 'type');
  ElementBuilder.attV_(HtmlEmbedBuilder, 'height');
  ElementBuilder.attV_(HtmlEmbedBuilder, 'width');

  np.HtmlEmbedBuilder = HtmlEmbedBuilder;
}(this.np));
