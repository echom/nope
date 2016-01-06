(function(np) {
  'use strict';

  var HtmlBuilder = np.HtmlBuilder;

  /**
   * @constructor np.HtmlVoidBuilder
   * @augments {np.HtmlBuilder}
   * @classdesc The HtmlVoidBuilder is the abstract base class for all
   * element builders wrapping HTML void elements.
   * @abstract
   * @param {np.HtmlBuilder} parentBuilder - this builder's parent
   * @param {np.Element} element - the element this builder will apply changes to
   * @throws {Error} when the element argument is not provided
   */
  var HtmlVoidBuilder = np.inherits(function(parentBuilder, element) {
    HtmlBuilder.call(this, parentBuilder, element, 'phrasing');
  }, ElementBuilder);

  np.HtmlVoidBuilder = HtmlVoidBuilder;
}(this.np));
