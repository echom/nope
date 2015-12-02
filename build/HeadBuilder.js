(function(np) {
	'use strict';

	var Base = np.ElementBuilder;

	/**
	 * @name np.HeadBuilder
	 */
	var HeadBuilder = np.inherits(Base, function() {
		Base.call(this, null, new np.Element('head'));
		this.head_ = new np.HeadBuilder(this);
		this.body_ = new np.BodyBuilder(this);

		this.charset_ = np.MetaBuilder().charset('utf-8');
	});

	/**
	  * Sets this document's charset.
		* @param {string} charset='utf-8' - the charset (e.g. 'utf-8')
		* @return {HtmlBuilder} this instance
		*/
	HeadBuilder.prototype.charset = function(charset) {
		this.charset_.charset(charset);
		return this;
	};
	/**
	  * Adds or sets a meta element with html-equiv attribute.
		* @param {string} equiv - one of the http-equivs allowed in HTML (i.e.
		* 'refresh', 'default-style' and 'content-type')
		* @return {HtmlBuilder} this instance
		*/
	HeadBuilder.prototype.httpEquiv = function(equiv, content) {
		this.head_.httpEquiv(equiv);
		return this;
	};
	HeadBuilder.prototype.meta = function(name, content) {
		this.head_.meta(name, content);
		return this;
	};



	np.HeadBuilder = HeadBuilder;
}(this.np));
