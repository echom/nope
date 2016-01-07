(function(np) {
  'use strict';

  var ElementBuilder = np.ElementBuilder,
      CONTENT_MODEL_TRANSPARENT = 'transparent',
      CONTENT_MODEL_METADATA = 'metadata',
      CONTENT_MODEL_PHRASING = 'phrasing',
      CONTENT_MODEL_FLOW = 'flow',
      hasConcreteContentModel = function(b) {
        return b.contentModel_ !== CONTENT_MODEL_TRANSPARENT;
      },
      isAOrButtonAncestor = function(b) {
        return b.element.type === 'a' || b.element.type === 'button';
      },
      addPhrasingAccess_ = function(ctor, type) {
        ctor.prototype[type] = function() {
          return new np.HtmlBuilder(this, type, CONTENT_MODEL_PHRASING);
        };
      };

  /**
   * @constructor np.HtmlBuilder
   * @augments {np.ElementBuilder}
   * @classdesc The HtmlBuilder is the abstract base class for all
   * element builders wrapping HTML elements.
   * @abstract
   * @param {np.HtmlBuilder} parentBuilder - this builder's parent
	 * @param {np.Element} element - the element this builder will apply changes to
   * @throws {Error} when the element argument is not provided
   */
  var HtmlBuilder = np.inherits(function(parentBuilder, type, contentModel) {
    ElementBuilder.call(this, parentBuilder, new np.Element(type));

    this.contentModel_ = contentModel || CONTENT_MODEL_TRANSPARENT;
  }, ElementBuilder);

  HtmlBuilder.prototype.firstUp_ = function(predicate) {
    var builder = this;
    while(builder && !predicate(builder)) {
      builder = builder.up();
    }
    return builder;
  };

  HtmlBuilder.prototype.getContentModel = function() {
    var builder= this.firstUp_(hasConcreteContentModel);
    return return builder && builder.contentModel_;
  };

  addPhrasingAccess_(HtmlBuilder, 'em');
  addPhrasingAccess_(HtmlBuilder, 'strong');
  addPhrasingAccess_(HtmlBuilder, 'small');
  addPhrasingAccess_(HtmlBuilder, 'mark');
  addPhrasingAccess_(HtmlBuilder, 'abbr');
  addPhrasingAccess_(HtmlBuilder, 'dfn');
  addPhrasingAccess_(HtmlBuilder, 'i');
  addPhrasingAccess_(HtmlBuilder, 'b');
  addPhrasingAccess_(HtmlBuilder, 's');
  addPhrasingAccess_(HtmlBuilder, 'u');
  addPhrasingAccess_(HtmlBuilder, 'code');
  addPhrasingAccess_(HtmlBuilder, 'var');
  addPhrasingAccess_(HtmlBuilder, 'samp');
  addPhrasingAccess_(HtmlBuilder, 'kbd');
  addPhrasingAccess_(HtmlBuilder, 'var');

  HtmlBuilder.prototype.br = function() { return new HtmlVoidBuilder(this, 'br'); };

  HtmlBuilder.prototype.wbr = function() { return new HtmlVoidBuilder(this, 'wbr'); };

  HtmlBuilder.prototype.a = function() {
    if(this.firstUp_(isAOrButtonAncestor)) {
      throw new Error(np.msg.opInvalid(
        'a()',
        '<a> cannot be nested in <a> or <button>'
      ));
    }
    return new HtmlABuilder(this);
  };

  HtmlBuilder.prototype.ins = function() { return new HtmlInsBuilder(this); };

  HtmlBuilder.prototype.del = function() { return new HtmlDelBuilder(this); };

  HtmlBuilder.prototype.map = function() { return new HtmlMapBuilder(this); };

  HtmlBuilder.prototype.h = function(level) {
    if(this.getContentModel() !== CONTENT_MODEL_FLOW) {
      throw new Error(np.msg.opInvalid(
        'h()',
        '<h' + level + '> cannot be nested in phrasing content'
      ));
    }
    return new np.HtmlHeadingBuilder(this, level);
  };

  HtmlBuilder.prototype.embed = function() {
    if(this.firstUp_(isAOrButtonAncestor)) {
      throw new Error(np.msg.opInvalid(
        'embed()',
        '<embed> cannot be nested in <a> or <button>'
      ));
    }
    return new HtmlEmbedBuilder(this);
  };

  // transparents: a, ins, del, map, object (constrained), noscript (constrained),
  //               video (constrained), audio (constrained)
  // voids: br, wbr, img, embed, area,
  // text-only: script
  // phrasing: ruby (constrained),
  // special: iframe, textarea, input

  /**
   * Defines a keyboard shortcut to activate add focus to the element.
   * @method np.HtmlBuilder#accesskey
   * @param {string} accesskey - a space-separated list of characters
   * @return {np.HtmlBuilder} this HtmlBuilder instance.
   * @throws {Error} when the 'accesskey' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlBuilder, 'accesskey');

  /**
   * Defines a space-separated list of the classes of the element.
   * @method np.HtmlBuilder#class
   * @param {string} class - a space-separated list of class names
   * @return {np.HtmlBuilder} this HtmlBuilder instance.
   * @throws {Error} when the 'class' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlBuilder, 'class');

  /**
   * The contenteditable global attribute is an enumerated attribute indicating
   * if the element should be editable by the user.
   * @method np.HtmlBuilder#contenteditable
   * @param {boolean} contenteditable - whether not the element's content
   * can be edited by the user.
   * @return {np.HtmlBuilder} this HtmlBuilder instance.
   * @throws {Error} when the 'contenteditable' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlBuilder, 'contenteditable');

  /**
   * The dir global attribute is an enumerated attribute indicates the
   * directionality of the element's text. Valid values are 'ltr', 'rtl' and
   * 'auto'.
   * @method np.HtmlBuilder#dir
   * @param {string} dir - the text direction of the element
   * @return {np.HtmlBuilder} this HtmlBuilder instance.
   * @throws {Error} when the 'dir' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlBuilder, 'dir');

  /**
   * Is a Boolean attribute indicates that the element is not yet, is no
   * longer, relevant.
   * @method np.HtmlBuilder#hidden
   * @param {boolean} hidden - whether this element is hidden
   * @return {np.HtmlBuilder} this HtmlBuilder instance.
   * @throws {Error} when the 'hidden' argument is not provided.
   */
  ElementBuilder.addAttBoolAccess_(HtmlBuilder, 'hidden');

  /**
   * Defines a unique identifier (ID) which must be unique in the whole document.
   * @method np.HtmlBuilder#id
   * @param {string} id - the element's id
   * @return {np.HtmlBuilder} this HtmlBuilder instance.
   * @throws {Error} when the 'id' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlBuilder, 'id');

  /**
   * Participates in defining the language of the element, the language that
   * non-editable elements are written in the language that editable elements
   * should be written in.
   * @method np.HtmlBuilder#lang
   * @param {string} id - the element's language
   * @return {np.HtmlBuilder} this HtmlBuilder instance.
   * @throws {Error} when the 'lang' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlBuilder, 'lang');

  /**
   * Is an enumerated attribute defines whether the element may be checked for
   * spelling errors.
   * @method np.HtmlBuilder#lang
   * @param {boolean} spellcheck - whether to check the element's spelling
   * @return {np.HtmlBuilder} this HtmlBuilder instance.
   * @throws {Error} when the 'spellcheck' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlBuilder, 'spellcheck');

  /**
   * Contains CSS styling declarations to be applied to the element. Note that
   * it is recommended for styles to be defined in a separate file files.
   * @method np.HtmlBuilder#style
   * @param {string} style - the element's style definition.
   * @return {np.HtmlBuilder} this HtmlBuilder instance.
   * @throws {Error} when the 'style' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlBuilder, 'style');

  /**
   * Is an integer attribute indicates if the element can take input focus (is
   * focusable), if it should participate to sequential keyboard navigation,
   * and if so, at what position.
   * @method np.HtmlBuilder#tabindex
   * @param {string} tabindex - the element's tab index.
   * @return {np.HtmlBuilder} this HtmlBuilder instance.
   * @throws {Error} when the 'tabindex' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlBuilder, 'tabindex');

  /**
   * Contains a text representing advisory information related to the element it
   * belongs to.
   * @method np.HtmlBuilder#title
   * @param {string} title - the element's title.
   * @return {np.HtmlBuilder} this HtmlBuilder instance.
   * @throws {Error} when the 'title' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlBuilder, 'title');

  /**
   * Is an enumerated attribute that is used to specify whether an element's
   * attribute values and its text content are to be translated when the page is
   * localized, whether to leave them unchanged.
   * @method np.HtmlBuilder#translate
   * @param {boolean} translate - whether to translate the element's contents.
   * @return {np.HtmlBuilder} this HtmlBuilder instance.
   * @throws {Error} when the 'title' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlBuilder, 'translate');

  HtmlBuilder.addPhrasingAccess_ = addPhrasingAccess_;


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
  var HtmlVoidBuilder = np.inherits(function(parentBuilder, type) {
    HtmlBuilder.call(this, parentBuilder, type, CONTENT_MODEL_PHRASING);
  }, ElementBuilder);

  var HtmlABuilder = np.inherits(function(parentBuilder) {
    HtmlBuilder.call(this, parentBuilder, 'a', CONTENT_MODEL_TRANSPARENT);
  }, HtmlBuilder);

  ElementBuilder.addAttValueAccess_(HtmlABuilder, 'href');
  ElementBuilder.addAttValueAccess_(HtmlABuilder, 'target');
  ElementBuilder.addAttValueAccess_(HtmlABuilder, 'rel');
  ElementBuilder.addAttValueAccess_(HtmlABuilder, 'hreflang');
  ElementBuilder.addAttValueAccess_(HtmlABuilder, 'media');
  ElementBuilder.addAttValueAccess_(HtmlABuilder, 'type');

  var HtmlInsBuilder = np.inherits(function(parentBuilder) {
    HtmlBuilder.call(this, parentBuilder, np.Element('ins'), CONTENT_MODEL_TRANSPARENT);
  }, HtmlBuilder);
  ElementBuilder.addAttValueAccess_(HtmlInsBuilder, 'cite');
  ElementBuilder.addAttValueAccess_(HtmlInsBuilder, 'datetime');

  var HtmlDelBuilder = np.inherits(function(parentBuilder) {
    HtmlBuilder.call(this, parentBuilder, np.Element('del'), CONTENT_MODEL_TRANSPARENT);
  }, HtmlBuilder);
  ElementBuilder.addAttValueAccess_(HtmlDelBuilder, 'cite');
  ElementBuilder.addAttValueAccess_(HtmlDelBuilder, 'datetime');

  var HtmlEmbedBuilder = np.inherits(function(parentBuilder) {
    HtmlVoidBuilder.call(this, parentBuilder, np.Element('embed'), CONTENT_MODEL_TRANSPARENT);
  }, HtmlVoidBuilder);
  ElementBuilder.addAttValueAccess_(HtmlEmbedBuilder, 'src');
  ElementBuilder.addAttValueAccess_(HtmlEmbedBuilder, 'type');
  ElementBuilder.addAttValueAccess_(HtmlEmbedBuilder, 'height');
  ElementBuilder.addAttValueAccess_(HtmlEmbedBuilder, 'width');

  np.HtmlBuilder = HtmlBuilder;
  np.HtmlABuilder = HtmlABuilder;
  np.HtmlVoidBuilder = HtmlVoidBuilder;
  np.HtmlInsBuilder = HtmlInsBuilder;
  np.HtmlDelBuilder = HtmlDelBuilder;
  np.HtmlEmbedBuilder = HtmlDelBuilder;
}(this.np));
