(function(np) {
	'use strict';

	/**
	 * @constructor np.BaseBuilder
	 * @classdesc The HeadBuilder wraps a HTML <base> element.
	 * @param {np.HtmlBuilder} parentBuilder - this builder's parent
	 * @augments np.ElementBuilder
	 */
	var BaseBuilder = np.inherits(function(parentBuilder) {
		np.ElementBuilder.call(this, parentBuilder, new np.Element('base'));
	}, np.ElementBuilder);

	/**
	 * Sets the "href" attribute on the <base> element. Valid values are URLs
	 * (@see http://www.w3.org/TR/html5/infrastructure.html#valid-url-potentially-surrounded-by-spaces).
	 * @member np.BaseBuilder#href
	 * @param {string} href - the href attribute
	 * @return {np.BaseBuilder} this BaseBuilder instance
	 */
  BaseBuilder.prototype.href = function(href) {
    this.attrib('href', href);
		return this;
  };

	/**
	 * Sets the "target" attribute on the <base> element. Valid values include
	 * browsing context keywords ('_top', '_blank', '_self', '_blank') or browsing
	 * context names
	 * (@see http://www.w3.org/TR/html5/browsers.html#valid-browsing-context-name-or-keyword).
	 * @member np.BaseBuilder#target
	 * @param {string} target - the target attribute's value.
	 * @return {np.BaseBuilder} this BaseBuilder instance
	 */
  BaseBuilder.prototype.target = function(target) {
    this.attrib('target', target);
		return this;
  };

	np.BaseBuilder = BaseBuilder;
}(this.np));
