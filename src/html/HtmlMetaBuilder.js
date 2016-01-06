(function(np) {
	'use strict';

	var Base = np.ElementBuilder;

	/**
	 * @constructor np.HtmlMetaBuilder
	 * @classdesc The HtmlMetaBuilder wraps a <meta> element and provides methods
	 * to set common attribute configurations.
	 * @param {np.HtmlHeadBuilder} parentBuilder this builder's parent
	 * @augments np.ElementBuilder
	 */
	var HtmlMetaBuilder = np.inherits(function(parentBuilder) {
		Base.call(this, parentBuilder, new np.Element('meta'));
	}, Base);


	HtmlMetaBuilder.prototype.charset = function(charset) {
		this.element.attributes().set('charset', charset);
		return this;
	};
	HtmlMetaBuilder.prototype.http = function(http, content) {
		var attributes = this.element.attributes();
		attributes.set('http-equiv', httpEquiv);
		attributes.set('content', content);
		return this;
	};
	HtmlMetaBuilder.prototype.name = function(name, content) {
		var attributes = this.element.attributes();
		attributes.set('name', name);
		attributes.set('content', content);
		return this;
	};

	np.HtmlMetaBuilder = HtmlMetaBuilder;
}(this.np));
