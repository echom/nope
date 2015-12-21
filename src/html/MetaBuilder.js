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
		this.attrib_('charset', charset);
		return this;
	};
	MetaBuilder.prototype.http = function(http, content) {
		this.attrib_('http-equiv', httpEquiv);
		this.attrib_('content', content);
		return this;
	};
	MetaBuilder.prototype.name = function(name, content) {
		this.attrib_('name', name);
		this.attrib_('content', content);
		return this;
	};

	np.MetaBuilder = MetaBuilder;
}(this.np));
