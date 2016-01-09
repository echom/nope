(function(np) {
  'use strict';

  var ElementBuilder = np.ElementBuilder,
      HtmlBuilder = np.HtmlBuilder,
      HtmlContentModel = np.HtmlContentModel,
      CONTENT_MODEL_TRANSPARENT = HtmlBuilder.CONTENT_MODEL_TRANSPARENT,
      CONTENT_MODEL_PHRASING = HtmlBuilder.CONTENT_MODEL_PHRASING,
      CONTENT_MODEL_FLOW = HtmlBuilder.CONTENT_MODEL_FLOW,
      styleParents = ['div', 'noscript', 'section', 'article', 'aside'],
      isAOrButtonAncestor_ = function(b) {
        return b.element.type === 'a' || b.element.type === 'button';
      },
      addPhrasingAccess_ = function(ctor, type, contentModel) {
        ctor.prototype[type] = function(text) {
          return new np.HtmlSimpleBuilder(this, type, contentModel).text(text);
        };
      },
      addFlowAccess_ = function(ctor, type, contentModel) {
        ctor.prototype[type] = function(text) {
          if(this.getContentModel_() === CONTENT_MODEL_PHRASING) {
            throw new Error(np.msg.opInvalid(
              type + '()',
              '<' + type + '> cannot be nested as phrasing content'
            ));
          }
          return new np.HtmlSimpleBuilder(this, type, contentModel).text(text);
        };
      },
      addVoidAccess_ = function(ctor, type) {
        ctor.prototype[type] = function() {
          return new np.HtmlBuilder(this, type);
        };
      };

  /**
   * @constructor np.HtmlSimpleBuilder
   * @augments {np.HtmlBuilder}
   * @classdesc The HtmlSimpleBuilder is the abstract base class for many concrete
   * element builders wrapping HTML elements.
   * @abstract
   * @param {np.HtmlSimpleBuilder} parentBuilder - this builder's parent
	 * @param {np.Element} element - the element this builder will apply changes to
   * @throws {Error} when the type argument is not provided
   */
  var HtmlSimpleBuilder = np.inherits(function(parentBuilder, type, contentModel) {
    HtmlBuilder.call(this, parentBuilder, type);

    this.contentModel_ = contentModel || CONTENT_MODEL_TRANSPARENT;
  }, HtmlBuilder);

  /**
	 * Adds a <em> element to this builder.
	 * @method np.HtmlSimpleBuilder#em
	 * @param {string} [text] - an optional text content
	 * @return {np.HtmlSimpleBuilder} the new HtmlSimpleBuilder instance for the
   * <em> element.
	 */
  addPhrasingAccess_(HtmlSimpleBuilder, 'em', CONTENT_MODEL_PHRASING);

  /**
	 * Adds a <strong> element to this builder.
	 * @method np.HtmlSimpleBuilder#strong
	 * @param {string} [text] - an optional text content
	 * @return {np.HtmlSimpleBuilder} the new HtmlSimpleBuilder instance for the
   * <strong> element.
	 */
  addPhrasingAccess_(HtmlSimpleBuilder, 'strong', CONTENT_MODEL_PHRASING);

  /**
	 * Adds a <small> element to this builder.
	 * @method np.HtmlSimpleBuilder#small
	 * @param {string} [text] - an optional text content
	 * @return {np.HtmlSimpleBuilder} the new HtmlSimpleBuilder instance for the
   * <small> element.
	 */
  addPhrasingAccess_(HtmlSimpleBuilder, 'small', CONTENT_MODEL_PHRASING);

  /**
	 * Adds a <mark> element to this builder.
	 * @method np.HtmlSimpleBuilder#mark
	 * @param {string} [text] - an optional text content
	 * @return {np.HtmlSimpleBuilder} the new HtmlSimpleBuilder instance for the
   * <mark> element.
	 */
  addPhrasingAccess_(HtmlSimpleBuilder, 'mark', CONTENT_MODEL_PHRASING);

  /**
	 * Adds a <abbr> element to this builder.
	 * @method np.HtmlSimpleBuilder#abbr
	 * @param {string} [text] - an optional text content
	 * @return {np.HtmlSimpleBuilder} the new HtmlSimpleBuilder instance for the
   * <abbr> element.
	 */
  addPhrasingAccess_(HtmlSimpleBuilder, 'abbr', CONTENT_MODEL_PHRASING);

  /**
	 * Adds a <dfn> element to this builder.
	 * @method np.HtmlSimpleBuilder#dfn
	 * @param {string} [text] - an optional text content
	 * @return {np.HtmlSimpleBuilder} the new HtmlSimpleBuilder instance for the
   * <dfn> element.
	 */
  addPhrasingAccess_(HtmlSimpleBuilder, 'dfn', CONTENT_MODEL_PHRASING);

  /**
	 * Adds a <i> element to this builder.
	 * @method np.HtmlSimpleBuilder#i
	 * @param {string} [text] - an optional text content
	 * @return {np.HtmlSimpleBuilder} the new HtmlSimpleBuilder instance for the
   * <i> element.
	 */
  addPhrasingAccess_(HtmlSimpleBuilder, 'i', CONTENT_MODEL_PHRASING);

  /**
	 * Adds a <b> element to this builder.
	 * @method np.HtmlSimpleBuilder#b
	 * @param {string} [text] - an optional text content
	 * @return {np.HtmlSimpleBuilder} the new HtmlSimpleBuilder instance for the
   * <b> element.
	 */
  addPhrasingAccess_(HtmlSimpleBuilder, 'b', CONTENT_MODEL_PHRASING);

  /**
	 * Adds a <s> element to this builder.
	 * @method np.HtmlSimpleBuilder#s
	 * @param {string} [text] - an optional text content
	 * @return {np.HtmlSimpleBuilder} the new HtmlSimpleBuilder instance for the
   * <s> element.
	 */
  addPhrasingAccess_(HtmlSimpleBuilder, 's', CONTENT_MODEL_PHRASING);

  /**
	 * Adds a <u> element to this builder.
	 * @method np.HtmlSimpleBuilder#u
	 * @param {string} [text] - an optional text content
	 * @return {np.HtmlSimpleBuilder} the new HtmlSimpleBuilder instance for the
   * <u> element.
	 */
  addPhrasingAccess_(HtmlSimpleBuilder, 'u', CONTENT_MODEL_PHRASING);

  /**
	 * Adds a <code> element to this builder.
	 * @method np.HtmlSimpleBuilder#code
	 * @param {string} [text] - an optional text content
	 * @return {np.HtmlSimpleBuilder} the new HtmlSimpleBuilder instance for the
   * <code> element.
	 */
  addPhrasingAccess_(HtmlSimpleBuilder, 'code', CONTENT_MODEL_PHRASING);

  /**
	 * Adds a <var> element to this builder.
	 * @method np.HtmlSimpleBuilder#var
	 * @param {string} [text] - an optional text content
	 * @return {np.HtmlSimpleBuilder} the new HtmlSimpleBuilder instance for the
   * <var> element.
	 */
  addPhrasingAccess_(HtmlSimpleBuilder, 'var', CONTENT_MODEL_PHRASING);


  addPhrasingAccess_(HtmlSimpleBuilder, 'samp', CONTENT_MODEL_PHRASING);
  addPhrasingAccess_(HtmlSimpleBuilder, 'kbd', CONTENT_MODEL_PHRASING);
  addPhrasingAccess_(HtmlSimpleBuilder, 'var', CONTENT_MODEL_PHRASING);

  //flow elements
  addFlowAccess_(HtmlSimpleBuilder, 'p', CONTENT_MODEL_PHRASING);
  addFlowAccess_(HtmlSimpleBuilder, 'pre', CONTENT_MODEL_PHRASING);

  addVoidAccess_(HtmlSimpleBuilder, 'br');
  addVoidAccess_(HtmlSimpleBuilder, 'wbr');
  addVoidAccess_(HtmlSimpleBuilder, 'hr');

  HtmlSimpleBuilder.prototype.a = function() {
    if(this.firstUp_(isAOrButtonAncestor_)) {
      throw new Error(np.msg.opInvalid(
        'a()',
        '<a> cannot be nested in <a> or <button>'
      ));
    }
    return new np.HtmlABuilder(this);
  };

  HtmlSimpleBuilder.prototype.ins = function() { return new np.HtmlInsBuilder(this); };

  HtmlSimpleBuilder.prototype.del = function() { return new np.HtmlDelBuilder(this); };

  HtmlSimpleBuilder.prototype.map = function() { return new np.HtmlMapBuilder(this); };

  HtmlSimpleBuilder.prototype.h = function(level) {
    if(this.getContentModel_() !== CONTENT_MODEL_FLOW) {
      throw new Error(np.msg.opInvalid(
        'h()',
        '<h' + level + '> cannot be nested in phrasing content'
      ));
    }
    return new np.HtmlHeadingBuilder(this, level);
  };

  HtmlSimpleBuilder.prototype.embed = function() {
    if(this.firstUp_(isAOrButtonAncestor_)) {
      throw new Error(np.msg.opInvalid(
        'embed()',
        '<embed> cannot be nested in <a> or <button>'
      ));
    }
    return new np.HtmlEmbedBuilder(this);
  };

  HtmlSimpleBuilder.prototype.object = function() { return new np.HtmlObjectBuilder(this); };

  HtmlSimpleBuilder.prototype.styleElement = function() {
    if(styleParents.indexOf(this.parent.element.type) < 0) {
      throw new Error(np.msg.opInvalid(
        'styleElement()',
        '<style> cannot be nested in <' + this.parent.element.type + '>'
      ));
    }
    return new np.HtmlStyleBuilder(this);
  };

  ElementBuilder.chlT_(HtmlSimpleBuilder);

  HtmlSimpleBuilder.isAOrButtonAncestor_ = isAOrButtonAncestor_;

  np.HtmlSimpleBuilder = HtmlSimpleBuilder;
}(this.np));
