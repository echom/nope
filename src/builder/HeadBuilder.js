(function(np) {
	'use strict';

	var Base = np.ElementBuilder;

	/**
	 * @constructor np.HeadBuilder
	 * @param {np.HtmlBuilder} parentBuilder this builder's parent
	 * @augments np.ElementBuilder
	 */
	var HeadBuilder = np.inherits(function(parentBuilder) {
		Base.call(this, parentBuilder, new np.Element('head'));

		this.charset_ = new np.MetaBuilder().charset('utf-8');
		this.equivs_ = {};
		this.metas_ = {};
	}, Base);

	/**
	  * Sets this document's charset.
		* @method np.HeadBuilder#charset
		* @param {string} charset='utf-8' - the charset (e.g. 'utf-8')
		* @return HeadBuilder this instance
		*/
	HeadBuilder.prototype.charset = function(charset) {
		this.charset_.charset(charset);
		return this;
	};

	/**
	  * Adds or sets a meta element with a name attribute.
		* @method np.HeadBuilder#meta
		* @param {string} name - the name of this meta element
		* @param {string} content - the content of this meta element
		* @return HeadBuilder this instance
		*/
	HeadBuilder.prototype.meta = function(name, content) {
		var builder = this.metas_[equiv] || (this.metas_ = np.MetaBuilder());
		builder.meta(name, content);
		return this;
	};

	/**
	  * Adds or sets a meta element with html-equiv attribute.
		* @method np.HeadBuilder#httpEquiv
		* @param {string} equiv - one of the http-equivs allowed in HTML (i.e.
		* 'refresh', 'default-style' and 'content-type')
		* @param {string} content - the content of the meta element
		* @return HeadBuilder this instance
		*/
	HeadBuilder.prototype.httpEquiv = function(equiv, content) {
		var builder = this.equivs_[equiv] || (this.equivs_ = np.MetaBuilder());
		builder.httpEquiv(equiv, content);
		return this;
	};


	np.HeadBuilder = HeadBuilder;
}(this.np));
