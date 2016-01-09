(function(np) {
  'use strict';

  var ElementBuilder = np.ElementBuilder,
      CONTENT_MODEL_TRANSPARENT = 'transparent',
      CONTENT_MODEL_METADATA = 'metadata',
      CONTENT_MODEL_PHRASING = 'phrasing',
      CONTENT_MODEL_FLOW = 'flow',
      hasConcreteContentModel_ = function(b) {
        return b.contentModel_ !== CONTENT_MODEL_TRANSPARENT;
      };

  /**
   * @constructor np.HtmlBuilder
   * @augments {np.ElementBuilder}
   * @classdesc The HtmlBuilder is the base class for element builders
   * which wrap HTML content elements (e.g. <br>, <hr>, <param>...).
   * @param {np.ElementBuilder} parentBuilder - this builder's parent
   * @param {string} type - the type of HTML element this builder wraps
   * @throws {Error} when the element argument is not provided
   */
  var HtmlBuilder = np.inherits(function(parentBuilder, type) {
    if(!type) {
      throw new Error(np.msg.argInvalid('type', 'must be a non-empty string'));
    }

    ElementBuilder.call(this, parentBuilder, new np.Element(type));

    this.contentModel_ = CONTENT_MODEL_TRANSPARENT;
  }, ElementBuilder);

  /**
   * Returns the first ancestor builder which fulfils the given predicate or
   * null if no ancestor matches.
   * @method np.HtmlBuilder#firstUp_
   * @param {function} predicate - the predicate function to apply
   * @return {np.ElementBuilder} the first matching ancestor builder or null
   * @throws {Error} when the 'predicate' argument is not provided.
   * @private
   */
  HtmlBuilder.prototype.firstUp_ = function(predicate, ctx) {
    if(!predicate) {
      throw new Error(np.msg.argEmpty('predicate'));
    }

    ctx = ctx || this;

    var builder = this;
    while(builder && !predicate.call(ctx, builder)) {
      builder = builder.parent;
    }
    return builder;
  };

  /**
   * Returns this element builder's current content model.
   * @method np.HtmlBuilder#getContentModel_
   * @return either 'flow' or 'phrasing'
   * @private
   */
  HtmlBuilder.prototype.getContentModel_ = function() {
    var builder= this.firstUp_(hasConcreteContentModel_);
    return builder && builder.contentModel_;
  };


  /**
   * Defines a keyboard shortcut to activate add focus to the element.
   * @method np.HtmlBuilder#accesskey
   * @param {string} accesskey - a space-separated list of characters
   * @return {np.ElementBuilder} this ElementBuilder instance.
   * @throws {Error} when the 'accesskey' argument is not provided.
   */
  ElementBuilder.attV_(HtmlBuilder, 'accesskey');

  /**
   * Defines a space-separated list of the classes of the element.
   * @method np.HtmlBuilder#class
   * @param {string} class - a space-separated list of class names
   * @return {np.ElementBuilder} this ElementBuilder instance.
   * @throws {Error} when the 'class' argument is not provided.
   */
  ElementBuilder.attV_(HtmlBuilder, 'class');

  /**
   * The contenteditable global attribute is an enumerated attribute indicating
   * if the element should be editable by the user.
   * @method np.HtmlBuilder#contenteditable
   * @param {boolean} contenteditable - whether not the element's content
   * can be edited by the user.
   * @return {np.ElementBuilder} this ElementBuilder instance.
   * @throws {Error} when the 'contenteditable' argument is not provided.
   */
  ElementBuilder.attV_(HtmlBuilder, 'contenteditable');

  /**
   * The dir global attribute is an enumerated attribute indicates the
   * directionality of the element's text. Valid values are 'ltr', 'rtl' and
   * 'auto'.
   * @method np.HtmlBuilder#dir
   * @param {string} dir - the text direction of the element
   * @return {np.ElementBuilder} this ElementBuilder instance.
   * @throws {Error} when the 'dir' argument is not provided.
   */
  ElementBuilder.attV_(HtmlBuilder, 'dir');

  /**
   * Is a Boolean attribute indicates that the element is not yet, is no
   * longer, relevant.
   * @method np.HtmlBuilder#hidden
   * @param {boolean} hidden - whether this element is hidden
   * @return {np.ElementBuilder} this ElementBuilder instance.
   * @throws {Error} when the 'hidden' argument is not provided.
   */
  ElementBuilder.attB_(HtmlBuilder, 'hidden');

  /**
   * Defines a unique identifier (ID) which must be unique in the whole document.
   * @method np.HtmlBuilder#id
   * @param {string} id - the element's id
   * @return {np.ElementBuilder} this ElementBuilder instance.
   * @throws {Error} when the 'id' argument is not provided.
   */
  ElementBuilder.attV_(HtmlBuilder, 'id');

  /**
   * Participates in defining the language of the element, the language that
   * non-editable elements are written in the language that editable elements
   * should be written in.
   * @method np.HtmlBuilder#lang
   * @param {string} id - the element's language
   * @return {np.ElementBuilder} this ElementBuilder instance.
   * @throws {Error} when the 'lang' argument is not provided.
   */
  ElementBuilder.attV_(HtmlBuilder, 'lang');

  /**
   * Is an enumerated attribute defines whether the element may be checked for
   * spelling errors.
   * @method np.HtmlBuilder#lang
   * @param {boolean} spellcheck - whether to check the element's spelling
   * @return {np.ElementBuilder} this ElementBuilder instance.
   * @throws {Error} when the 'spellcheck' argument is not provided.
   */
  ElementBuilder.attV_(HtmlBuilder, 'spellcheck');

  /**
   * Contains CSS styling declarations to be applied to the element. Note that
   * it is recommended for styles to be defined in a separate file files.
   * @method np.HtmlBuilder#style
   * @param {string} style - the element's style definition.
   * @return {np.ElementBuilder} this ElementBuilder instance.
   * @throws {Error} when the 'style' argument is not provided.
   */
  ElementBuilder.attV_(HtmlBuilder, 'style');

  /**
   * Is an integer attribute indicates if the element can take input focus (is
   * focusable), if it should participate to sequential keyboard navigation,
   * and if so, at what position.
   * @method np.HtmlBuilder#tabindex
   * @param {string} tabindex - the element's tab index.
   * @return {np.ElementBuilder} this ElementBuilder instance.
   * @throws {Error} when the 'tabindex' argument is not provided.
   */
  ElementBuilder.attV_(HtmlBuilder, 'tabindex');

  /**
   * Contains a text representing advisory information related to the element it
   * belongs to.
   * @method np.HtmlBuilder#title
   * @param {string} title - the element's title.
   * @return {np.ElementBuilder} this ElementBuilder instance.
   * @throws {Error} when the 'title' argument is not provided.
   */
  ElementBuilder.attV_(HtmlBuilder, 'title');

  /**
   * Is an enumerated attribute that is used to specify whether an element's
   * attribute values and its text content are to be translated when the page is
   * localized, whether to leave them unchanged.
   * @method np.HtmlBuilder#translate
   * @param {boolean} translate - whether to translate the element's contents.
   * @return {np.ElementBuilder} this ElementBuilder instance.
   * @throws {Error} when the 'title' argument is not provided.
   */
  ElementBuilder.attV_(HtmlBuilder, 'translate');

  /**
   * Transparent content model (accepting phrasing or prasing and flow content
   * depending on the parent builder's content model).
   * @member {string} np.HtmlBuilder.CONTENT_MODEL_TRANSPARENT
   * @readonly
   * @private
   */
  HtmlBuilder.CONTENT_MODEL_TRANSPARENT = CONTENT_MODEL_TRANSPARENT;

  /**
   * Phrasing content model (accepting only phrasing content).
   * @member {string} np.HtmlBuilder.CONTENT_MODEL_PHRASING
   * @readonly
   * @private
   */
  HtmlBuilder.CONTENT_MODEL_PHRASING = CONTENT_MODEL_PHRASING;

  /**
   * Meta data content model (accepting meta data)
   * @member {string} np.HtmlBuilder.CONTENT_MODEL_METADATA
   * @readonly
   * @private
   */
  HtmlBuilder.CONTENT_MODEL_METADATA = CONTENT_MODEL_METADATA;

  /**
   * Flow content model (accepting phrasing and flow elements)
   * @member {string} np.HtmlBuilder.CONTENT_MODEL_FLOW
   * @readonly
   * @private
   */
  HtmlBuilder.CONTENT_MODEL_FLOW = CONTENT_MODEL_FLOW;

  np.HtmlBuilder = HtmlBuilder;
}(this.np));
