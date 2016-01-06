(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder;

	/**
	 * Creates a new HtmlHeadBuilder instance.
	 * @constructor np.HtmlHeadBuilder
	 * @classdesc The HtmlHeadBuilder wraps a HTML <head> element and provides
	 * methods to add common child elements.
	 * @param {np.ElementBuilder} parentBuilder this builder's parent
	 * @augments np.ElementBuilder
	 */
	var HtmlHeadBuilder = np.inherits(function(parentBuilder) {
		ElementBuilder.call(this, parentBuilder, new np.Element('head'));

		this.charset_ = new np.HtmlMetaBuilder(this).charset('utf-8');
		this.title_ = new np.ElementBuilder(this, new np.Element('title'));
		this.equivs_ = {};
		this.metas_ = {};
	}, ElementBuilder);

	/**
	  * Sets this document's charset.
		* @method np.HtmlHeadBuilder#charset
		* @param {string} [charset='utf-8'] - the charset (e.g. 'utf-8')
		* @return {HtmlHeadBuilder} this instance
		*/
	HtmlHeadBuilder.prototype.charset = function(charset) {
		this.charset_.charset(charset);
		return this;
	};

	/**
	  * Adds or sets a meta element with a name attribute.
		* @method np.HtmlHeadBuilder#meta
		* @param {string} name - the name of this meta element
		* @param {string} content - the content of this meta element
		* @return {HtmlHeadBuilder} this instance
		*/
	HtmlHeadBuilder.prototype.meta = function(name, content) {
		var builder = this.metas_[equiv] || (this.metas_ = np.HtmlMetaBuilder(this));
		builder.meta(name, content);
		return this;
	};

	/**
	  * Adds or sets a meta element with html-equiv attribute.
		* @method np.HtmlHeadBuilder#httpEquiv
		* @param {string} equiv - one of the http-equivs allowed in HTML (i.e.
		* 'refresh', 'default-style' and 'content-type')
		* @param {string} content - the content of the meta element
		* @return {HtmlHeadBuilder} this instance
		*/
	HtmlHeadBuilder.prototype.httpEquiv = function(equiv, content) {
		var builder = this.equivs_[equiv] || (this.equivs_ = np.HtmlMetaBuilder(this));
		builder.httpEquiv(equiv, content);
		return this;
	};

	/**
	 * Sets this document's base element given href and target.
	 * @method np.HtmlHeadBuilder#base
	 * @param {string} [href] - the href attribute
	 * @param {string} [target] - the target attribute
	 * @return {HtmlHeadBuilder} this instance
	 */
	HtmlHeadBuilder.prototype.base = function(href, target) {
		if(!href && !target) {
			throw new Error(np.msg.opInvalid('base', 'neither "href" nor "target" were provided.'));
		}
		var base = this.base_ || (this.base_ = new np.HtmlBaseBuilder(this));
		if(href) base.href(href);
		if(target) base.target(target);
		return this;
	};

	/**
	 * Sets this document's title.
	 * @method np.HtmlHeadBuilder#title
	 * @param {string} title - the title
	 * @return {HtmlHeadBuilder} this HtmlHeadBuilder instance
	 */
	HtmlHeadBuilder.prototype.title = function(title) {
		var text = this.title_.element.children().first(np.Text.nodeIsText_) || new np.Text().text(title);
		this.title_.element.append(text);
		return this;
	};

	/**
	 * Adds a link element to this head element
	 * @method np.HtmlHeadBuilder#link
	 * @param {string} href - the destination of the link element
	 * @return {np.HtmlLinkBuilder} the new HtmlLinkBuilder instance.
	 */
	HtmlHeadBuilder.prototype.link = function(href) {
		return new np.HtmlLinkBuilder(href, this);
	};

	/**
	 * Adds a script element to this head element.
	 * @method np.HtmlHeadBuilder#script
	 * @param {string} [src] - the source attribute for the script element
	 * @return {np.HtmlScriptBuilder} the new HtmlScriptBuilder instance.
	 */
	HtmlHeadBuilder.prototype.script = function() {
		return new np.HtmlScriptBuilder(this);
	};


	np.HtmlHeadBuilder = HtmlHeadBuilder;
}(this.np));
