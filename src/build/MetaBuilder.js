(function(np) {
	'use strict';

	var Base = np.ElementBuilder;

	/**
	 * @constructor np.MetaBuilder
	 * @param {np.HeadBuilder} parentBuilder this builder's parent
	 * @augments np.ElementBuilder
	 */
	var MetaBuilder = np.inherits(function(parentBuilder) {
		Base.call(this, parentBuilder, new np.Element('meta'));
	}, Base);

	MetaBuilder.prototype.charset = function(charset) {
		this.attr('charset', charset);
		return this;
	};
	MetaBuilder.prototype.httpEquiv = function(httpEquiv, content) {
		this.attr('http-equiv', httpEquiv);
		this.attr('content', content);
		return this;
	};
	MetaBuilder.prototype.name = function(name, content) {
		this.attr('name', name);
		this.attr('content', content);
		return this;
	};

	np.MetaBuilder = MetaBuilder;
}(this.np));
