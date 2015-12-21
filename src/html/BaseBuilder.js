(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder;

	/**
	 * @constructor np.BaseBuilder
	 * @classdesc The HeadBuilder wraps a HTML <base> element.
	 * @param {np.ElementBuilder} parentBuilder - this builder's parent
	 * @augments np.ElementBuilder
	 */
	var BaseBuilder = np.inherits(function(parentBuilder) {
		ElementBuilder.call(this, parentBuilder, new np.Element('base'));
	}, ElementBuilder);

	/**
	 * Sets the "href" attribute on the <base> element. Valid values are URLs
	 * (@see http://www.w3.org/TR/html5/infrastructure.html#valid-url-potentially-surrounded-by-spaces).
	 * @method np.BaseBuilder#href
	 * @param {string} href - the href attribute
	 * @return {np.BaseBuilder} this BaseBuilder instance
	 */
	ElementBuilder.addAttributeSetter_(BaseBuilder, 'href');

	/**
	 * Sets the "target" attribute on the <base> element. Valid values include
	 * browsing context keywords ('_top', '_blank', '_self', '_blank') or browsing
	 * context names
	 * (@see http://www.w3.org/TR/html5/browsers.html#valid-browsing-context-name-or-keyword).
	 * @method np.BaseBuilder#target
	 * @param {string} target - the target attribute's value.
	 * @return {np.BaseBuilder} this BaseBuilder instance
	 */
  ElementBuilder.addAttributeSetter_(BaseBuilder, 'target');

	np.BaseBuilder = BaseBuilder;
}(this.np));
