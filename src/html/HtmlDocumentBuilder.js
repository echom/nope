(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder;

	/**
	 * Creates a new HtmlDocumentBuilder instance.
	 * @classdesc The HtmlDocumentBuilder represents the root builder of an HTML document.
	 * @constructor np.HtmlDocumentBuilder
	 * @augments np.ElementBuilder
	 */
	var HtmlDocumentBuilder = np.inherits(function() {
		ElementBuilder.call(this, null, new np.Element('html'));
		this.head_ = new np.HtmlHeadBuilder(this);
		this.body_ = new np.HtmlBodyBuilder(this);
	}, ElementBuilder);

	/**
	 * @override
	 */
	HtmlDocumentBuilder.prototype.up = function() { return this; };

	/**
	 * Returns the {@link np.HtmlHeadBuilder} of this HtmlDocumentBuilder instance.
	 * @method np.HtmlDocumentBuilder#head
	 * @return np.HtmlHeadBuilder
	 */
	HtmlDocumentBuilder.prototype.head = function() { return this.head_; };

	/**
	 * Returns the {@link np.HtmlBodyBuilder} of this HtmlDocumentBuilder instance.
	 * @method np.HtmlDocumentBuilder#body
	 * @return np.HtmlBodyBuilder
	 */
	HtmlDocumentBuilder.prototype.body = function() { return this.body_; };

	/**
	  * Sets this document's charset. Delegates to @see{np.HtmlHeadBuilder#charset}.
		* @param {string} charset='utf-8' - the charset
		* @return np.HtmlDocumentBuilder this instance
		*/
	HtmlDocumentBuilder.prototype.charset = function(charset) {
		this.head_.charset(charset);
		return this;
	};

	/**
	  * Adds or sets a meta element with html-equiv attribute.
		* @param {string} equiv - one of the http-equivs allowed in HTML (i.e.
		* 'refresh', 'default-style' and 'content-type')
		* @param {string} content - the content of the meta element
		* @return HtmlDocumentBuilder this instance
		*/
	HtmlDocumentBuilder.prototype.httpEquiv = function(equiv, content) {
		this.head_.httpEquiv(equiv, content);
		return this;
	};

	/**
	  * Adds or sets a meta element with a name attribute.
		* @param {string} name - the name of this meta element
		* @param {string} content - the content of this meta element
		* @return HtmlDocumentBuilder this instance
		*/
	HtmlDocumentBuilder.prototype.meta = function(name, content) {
		this.head_.meta(name, content);
		return this;
	};

	/**
		* Sets this document's title.
		* @param {string} title - the title
		* @return HtmlDocumentBuilder this instance
		*/
	HtmlDocumentBuilder.prototype.title = function(title) {
		this.head_.title(title);
		return this;
	};

	np.HtmlDocumentBuilder = HtmlDocumentBuilder;

	/**
	 * Returns a new HtmlDocumentBuilder instance.
	 * @method np.html
	 * @return {np.HtmlDocumentBuilder} a new HtmlDocumentBuilder
	 */
	np.html = function() { return new np.HtmlDocumentBuilder(); };
}(this.np));
