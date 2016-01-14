(function(np) {
	'use strict';

	var ElementBuilder = np.ElementBuilder;

	/**
	 * @constructor np.HtmlLinkBuilder
	 * @param {string} rel - the link's relationship to this document
   * @param {string} href - the link destination URL
	 * @param {np.ElementBuilder} parentBuilder - this builder's parent
	 * @augments np.ElementBuilder
   * @throws {Error} when the href attribute is empty
	 */
	var HtmlLinkBuilder = np.inherits(function(rel, href, parentBuilder) {
		ElementBuilder.call(this, parentBuilder, new np.Element('link'));

		if(!rel) {
      throw new Error(np.msg.argEmpty('rel', this.element.path()));
    }
    if(!href) {
      throw new Error(np.msg.argEmpty('href', this.element.path()));
    }

		this.element.attributes().set('rel', rel);
    this.element.attributes().set('href', href);
	}, ElementBuilder);

  /**
   * Sets the mime-type of the link destination.
   * @method np.HtmlLinkBuilder#type
   * @param {string} type - the mime-type of the link destination
   * @return {np.HtmlLinkBuilder} this HtmlLinkBuilder instance.
   * @throws {Error} when the 'type' argument is empty.
   */
  ElementBuilder.attV_(HtmlLinkBuilder, 'type');

  /**
   * Sets the language of the link destination.
   * @method np.HtmlLinkBuilder#hreflang
   * @param {string} hreflang - the language of the link destination
   * @return {np.HtmlLinkBuilder} this HtmlLinkBuilder instance.
   * @throws {Error} when the 'hreflang' argument is empty.
   */
  ElementBuilder.attV_(HtmlLinkBuilder, 'hreflang');

  /**
   * Sets the media for which the link destination was designed.
   * @method np.HtmlLinkBuilder#media
   * @param {string} media - the media for which the link destination was designed
   * @return {np.HtmlLinkBuilder} this HtmlLinkBuilder instance.
   * @throws {Error} when the 'media' argument is empty.
   */
  ElementBuilder.attV_(HtmlLinkBuilder, 'media');

  /**
   * Sets the sizes of icons for visual media.
   * @method np.HtmlLinkBuilder#sizes
   * @param {string} sizes - the sizes of icons for visual media
   * @return {np.HtmlLinkBuilder} this HtmlLinkBuilder instance.
   * @throws {Error} when the 'sizes' argument is empty.
   */
  ElementBuilder.attV_(HtmlLinkBuilder, 'sizes');

	np.HtmlLinkBuilder = HtmlLinkBuilder;
}(this.np));
