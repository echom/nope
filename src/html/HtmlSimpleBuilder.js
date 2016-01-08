(function(np) {
  'use strict';

  var ElementBuilder = np.ElementBuilder,
      HtmlBuilder = np.HtmlBuilder,
      HtmlContentModel = np.HtmlContentModel,
      CONTENT_MODEL_TRANSPARENT = HtmlContentModel.transparent,
      CONTENT_MODEL_PHRASING = HtmlContentModel.phrasing,
      CONTENT_MODEL_FLOW = HtmlContentModel.flow,
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
          if(this.getContentModel() === CONTENT_MODEL_PHRASING) {
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
   * @augments {np.ElementBuilder}
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

  //phrasing elements
  addPhrasingAccess_(HtmlSimpleBuilder, 'em', CONTENT_MODEL_PHRASING);
  addPhrasingAccess_(HtmlSimpleBuilder, 'strong', CONTENT_MODEL_PHRASING);
  addPhrasingAccess_(HtmlSimpleBuilder, 'small', CONTENT_MODEL_PHRASING);
  addPhrasingAccess_(HtmlSimpleBuilder, 'mark', CONTENT_MODEL_PHRASING);
  addPhrasingAccess_(HtmlSimpleBuilder, 'abbr', CONTENT_MODEL_PHRASING);
  addPhrasingAccess_(HtmlSimpleBuilder, 'dfn', CONTENT_MODEL_PHRASING);
  addPhrasingAccess_(HtmlSimpleBuilder, 'i', CONTENT_MODEL_PHRASING);
  addPhrasingAccess_(HtmlSimpleBuilder, 'b', CONTENT_MODEL_PHRASING);
  addPhrasingAccess_(HtmlSimpleBuilder, 's', CONTENT_MODEL_PHRASING);
  addPhrasingAccess_(HtmlSimpleBuilder, 'u', CONTENT_MODEL_PHRASING);
  addPhrasingAccess_(HtmlSimpleBuilder, 'code', CONTENT_MODEL_PHRASING);
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
    if(this.getContentModel() !== CONTENT_MODEL_FLOW) {
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

  ElementBuilder.addTextAccess_(HtmlSimpleBuilder);

  HtmlSimpleBuilder.addPhrasingAccess_ = addPhrasingAccess_;

  HtmlSimpleBuilder.isAOrButtonAncestor_ = isAOrButtonAncestor_;

  np.HtmlSimpleBuilder = HtmlSimpleBuilder;
}(this.np));
