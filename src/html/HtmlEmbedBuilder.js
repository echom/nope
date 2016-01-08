(function(np) {
	'use strict';

  var ElementBuilder = np.ElementBuilder,
      HtmlBuilder = np.HtmlBuilder;

  var HtmlEmbedBuilder = np.inherits(function(parentBuilder) {
    HtmlBuilder.call(this, parentBuilder, np.Element('embed'), np.HtmlContentModel.transparent);
  }, HtmlBuilder);
  ElementBuilder.addAttValueAccess_(HtmlEmbedBuilder, 'src');
  ElementBuilder.addAttValueAccess_(HtmlEmbedBuilder, 'type');
  ElementBuilder.addAttValueAccess_(HtmlEmbedBuilder, 'height');
  ElementBuilder.addAttValueAccess_(HtmlEmbedBuilder, 'width');

  np.HtmlEmbedBuilder = HtmlEmbedBuilder;
}(this.np));
