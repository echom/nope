(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder;

	/**
	 * Creates a new HeadBuilder instance.
	 * @constructor np.HeadBuilder
	 * @classdesc The HeadBuilder wraps a HTML <head> element and provides
	 * methods to add common child elements.
	 * @param {np.ElementBuilder} parentBuilder this builder's parent
	 * @augments np.ElementBuilder
	 */
	var HeadBuilder = np.inherits(function(parentBuilder) {
		ElementBuilder.call(this, parentBuilder, new np.Element('head'));

		this.charset_ = new np.MetaBuilder(this).charset('utf-8');
		this.title_ = new np.ElementBuilder(this, new np.Element('title'));
		this.equivs_ = {};
		this.metas_ = {};
	}, ElementBuilder);

	/**
	  * Sets this document's charset.
		* @method np.HeadBuilder#charset
		* @param {string} [charset='utf-8'] - the charset (e.g. 'utf-8')
		* @return {HeadBuilder} this instance
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
		* @return {HeadBuilder} this instance
		*/
	HeadBuilder.prototype.meta = function(name, content) {
		var builder = this.metas_[equiv] || (this.metas_ = np.MetaBuilder(this));
		builder.meta(name, content);
		return this;
	};

	/**
	  * Adds or sets a meta element with html-equiv attribute.
		* @method np.HeadBuilder#httpEquiv
		* @param {string} equiv - one of the http-equivs allowed in HTML (i.e.
		* 'refresh', 'default-style' and 'content-type')
		* @param {string} content - the content of the meta element
		* @return {HeadBuilder} this instance
		*/
	HeadBuilder.prototype.httpEquiv = function(equiv, content) {
		var builder = this.equivs_[equiv] || (this.equivs_ = np.MetaBuilder(this));
		builder.httpEquiv(equiv, content);
		return this;
	};

	/**
	 * Sets this document's base element given href and target.
	 * @method np.HeadBuilder#base
	 * @param {string} [href] - the href attribute
	 * @param {string} [target] - the target attribute
	 * @return {HeadBuilder} this instance
	 */
	HeadBuilder.prototype.base = function(href, target) {
		if(!href && !target) {
			throw new Error(np.msg.opInvalid('base', 'neither "href" nor "target" were provided.'));
		}
		var base = this.base_ || (this.base_ = new np.BaseBuilder(this));
		if(href) base.href(href);
		if(target) base.target(target);
		return this;
	};

	/**
	 * Sets this document's title.
	 * @method np.HeadBuilder#title
	 * @param {string} title - the title
	 * @return {HeadBuilder} this HeadBuilder instance
	 */
	HeadBuilder.prototype.title = function(title) {
		var text = this.title_.element.children().first(np.Text.nodeIsText_) || new np.Text().text(title);
		this.title_.element.append(text);
		return this;
	};

	/**
	 * Adds a link element to this head element
	 * @method np.HeadBuilder#link
	 * @param {string} href - the destination of the link element
	 * @return {np.LinkBuilder} the new LinkBuilder instance.
	 */
	HeadBuilder.prototype.link = function(href) {
		return new np.LinkBuilder(href, this);
	};

	/**
	 * Adds a script element to this head element.
	 * @method np.HeadBuilder#script
	 * @param {string} [src] - the source attribute for the script element
	 * @return {np.ScriptBuilder} the new ScriptBuilder instance.
	 */
	HeadBuilder.prototype.script = function() {
		return new np.ScriptBuilder(this);
	};


	np.HeadBuilder = HeadBuilder;
}(this.np));
