(function(np) {
	'use strict';

	var Base = np.ElementBuilder;

	/**
	 * @constructor np.MetaBuilder
	 * @classdesc The MetaBuilder wraps a <meta> element and provides methods
	 * to set common attribute configurations.
	 * @param {np.HeadBuilder} parentBuilder this builder's parent
	 * @augments np.ElementBuilder
	 */
	var MetaBuilder = np.inherits(function(parentBuilder) {
		Base.call(this, parentBuilder, new np.Element('meta'));
	}, Base);


	MetaBuilder.prototype.charset = function(charset) {
		this.element.attributes().set('charset', charset);
		return this;
	};
	MetaBuilder.prototype.http = function(http, content) {
		var attributes = this.element.attributes();
		attributes.set('http-equiv', httpEquiv);
		attributes.set('content', content);
		return this;
	};
	MetaBuilder.prototype.name = function(name, content) {
		var attributes = this.element.attributes();
		attributes.set('name', name);
		attributes.set('content', content);
		return this;
	};

	np.MetaBuilder = MetaBuilder;
}(this.np));
