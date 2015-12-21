(function(np) {
	'use strict';

	var Base = np.ElementBuilder;

	/**
	 * Creates a new HtmlBuilder instance.
	 * @classdesc The HtmlBuilder represents the root builder of an HTML document.
	 * @constructor np.HtmlBuilder
	 * @augments np.ElementBuilder
	 */
	var HtmlBuilder = np.inherits(function() {
		Base.call(this, null, new np.Element('html'));
		this.head_ = new np.HeadBuilder(this);
		this.body_ = new np.BodyBuilder(this);
	}, Base);

	/**
	 * @override
	 */
	HtmlBuilder.prototype.up = function() { return this; };

	/**
	 * Returns the {@link np.HeadBuilder} of this HtmlBuilder instance.
	 * @method np.HtmlBuilder#head
	 * @return np.HeadBuilder
	 */
	HtmlBuilder.prototype.head = function() { return this.head_; };

	/**
	 * Returns the {@link np.BodyBuilder} of this HtmlBuilder instance.
	 * @method np.HtmlBuilder#body
	 * @return np.BodyBuilder
	 */
	HtmlBuilder.prototype.body = function() { return this.body_; };

	/**
	  * Sets this document's charset. Delegates to @see{np.HeadBuilder#charset}.
		* @param {string} charset='utf-8' - the charset
		* @return np.HtmlBuilder this instance
		*/
	HtmlBuilder.prototype.charset = function(charset) {
		this.head_.charset(charset);
		return this;
	};

	/**
	  * Adds or sets a meta element with html-equiv attribute.
		* @param {string} equiv - one of the http-equivs allowed in HTML (i.e.
		* 'refresh', 'default-style' and 'content-type')
		* @param {string} content - the content of the meta element
		* @return HtmlBuilder this instance
		*/
	HtmlBuilder.prototype.httpEquiv = function(equiv, content) {
		this.head_.httpEquiv(equiv, content);
		return this;
	};

	/**
	  * Adds or sets a meta element with a name attribute.
		* @param {string} name - the name of this meta element
		* @param {string} content - the content of this meta element
		* @return HtmlBuilder this instance
		*/
	HtmlBuilder.prototype.meta = function(name, content) {
		this.head_.meta(name, content);
		return this;
	};

	/**
		* Sets this document's title.
		* @param {string} title - the title
		* @return HtmlBuilder this instance
		*/
	HtmlBuilder.prototype.title = function(title) {
		this.head_.title(title);
		return this;
	};

	np.HtmlBuilder = HtmlBuilder;

	np.html = function() { return new np.HtmlBuilder(); };
}(this.np));
