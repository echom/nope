(function(np) {
  'use strict';

  var ElementBuilder = np.ElementBuilder,
      HtmlBuilder = np.HtmlBuilder;

  /**
   * @constructor np.HtmlPhrasingBuilder
   * @augments {np.ElementBuilder}
   * @classdesc The HtmlPhrasingBuilder is the abstract base class for all
   * element builders wrapping HTML phrasing elements.
   * @abstract
   * @param {np.HtmlBuilder} parentBuilder - this builder's parent
	 * @param {np.Element} element - the element this builder will apply changes to
   * @throws {Error} when the element argument is not provided
   */
  var HtmlPhrasingBuilder = np.inherits(function(parentBuilder, element) {
    HtmlBuilder.call(this, parentBuilder, element, 'phrasing');
  }, HtmlBuilder);

  HtmlBuilder.addPhrasingAccess_(HtmlPhrasingBuilder, 'em');
  HtmlBuilder.addPhrasingAccess_(HtmlPhrasingBuilder, 'strong');
  HtmlBuilder.addPhrasingAccess_(HtmlPhrasingBuilder, 'small');
  HtmlBuilder.addPhrasingAccess_(HtmlPhrasingBuilder, 'mark');
  HtmlBuilder.addPhrasingAccess_(HtmlPhrasingBuilder, 'abbr');
  HtmlBuilder.addPhrasingAccess_(HtmlPhrasingBuilder, 'dfn');
  HtmlBuilder.addPhrasingAccess_(HtmlPhrasingBuilder, 'i');
  HtmlBuilder.addPhrasingAccess_(HtmlPhrasingBuilder, 'b');
  HtmlBuilder.addPhrasingAccess_(HtmlPhrasingBuilder, 's');
  HtmlBuilder.addPhrasingAccess_(HtmlPhrasingBuilder, 'u');
  HtmlBuilder.addPhrasingAccess_(HtmlPhrasingBuilder, 'code');
  HtmlBuilder.addPhrasingAccess_(HtmlPhrasingBuilder, 'var');
  HtmlBuilder.addPhrasingAccess_(HtmlPhrasingBuilder, 'samp');
  HtmlBuilder.addPhrasingAccess_(HtmlPhrasingBuilder, 'kbd');
  HtmlBuilder.addPhrasingAccess_(HtmlPhrasingBuilder, 'var');

  HtmlPhrasingBuilder.prototype.q = function() {
    // http://www.w3.org/TR/html-markup/q.html#q
  };

  HtmlPhrasingBuilder.prototype.br = function() {
    return new HtmlVoidBuilder(this, new np.Element('br'));
  };

  HtmlPhrasingBuilder.prototype.wbr = function() {
    return new HtmlVoidBuilder(this, new np.Element('wbr'));
  };

  HtmlPhrasingBuilder.prototype.a = function() { return new HtmlPhrasingABuilder(this); };

  HtmlPhrasingBuilder.prototype.ins = function() { return new HtmlPhrasingInsBuilder(this); }

  HtmlPhrasingBuilder.prototype.del = function() { return new HtmlPhrasingDelBuilder(this); }

  HtmlPhrasingBuilder.prototype.map = function(name) { return new HtmlPhrasingMapBuilder(this).name(name); }


  var HtmlPhrasingABuilder = np.inherits(function(parentBuilder) {
    HtmlPhrasingBuilder.call(this, parentBuilder, np.Element('a'), 'phrasing');
  }, HtmlPhrasingBuilder);

  ElementBuilder.addAttValueAccess_(HtmlPhrasingABuilder, 'href');
  ElementBuilder.addAttValueAccess_(HtmlPhrasingABuilder, 'target');
  ElementBuilder.addAttValueAccess_(HtmlPhrasingABuilder, 'rel');
  ElementBuilder.addAttValueAccess_(HtmlPhrasingABuilder, 'hreflang');
  ElementBuilder.addAttValueAccess_(HtmlPhrasingABuilder, 'media');
  ElementBuilder.addAttValueAccess_(HtmlPhrasingABuilder, 'type');

  var HtmlPhrasingInsBuilder = np.inherits(function(parentBuilder) {
    HtmlPhrasingBuilder.call(this, parentBuilder, np.Element('ins'), 'phrasing');
  }, HtmlPhrasingBuilder);
  ElementBuilder.addAttValueAccess_(HtmlPhrasingInsBuilder, 'cite');
  ElementBuilder.addAttValueAccess_(HtmlPhrasingInsBuilder, 'datetime');

  /**
   * @implements {np.HtmlDelBuilder}
   */
  var HtmlPhrasingDelBuilder = np.inherits(function(parentBuilder) {
    HtmlPhrasingBuilder.call(this, parentBuilder, np.Element('del'), 'phrasing');
  }, HtmlPhrasingBuilder);
  ElementBuilder.addAttValueAccess_(HtmlPhrasingDelBuilder, 'cite');
  ElementBuilder.addAttValueAccess_(HtmlPhrasingDelBuilder, 'datetime');



  var HtmlPhrasingMapBuilder = np.inherits(function(parentBuilder) {
    HtmlPhrasingBuilder.call(this, parentBuilder, np.Element('map'), 'phrasing');
  });
  ElementBuilder.addAttValueAccess_(HtmlPhrasingDelBuilder, 'name');


  np.HtmlPhrasingBuilder = HtmlPhrasingBuilder;


}(this.np));
