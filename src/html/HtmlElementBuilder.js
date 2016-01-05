(function(np) {
  'use strict';

  var ElementBuilder = np.ElementBuilder;

  /**
   * @constructor np.HtmlElementBuilder
   * @augments {np.ElementBuilder}
   * @classdesc The HtmlElementBuilder is the abstract base class for all
   * element builders wrapping HTML elements.
   * @abstract
   * @param {np.HtmlElementBuilder} parentBuilder - this builder's parent
	 * @param {np.Element} element - the element this builder will apply changes to
   * @throws {Error} when the element argument is not provided
   */
  var HtmlElementBuilder = np.inherits(function(parentBuilder, element) {
    ElementBuilder.call(parentBuilder, element);
  }, ElementBuilder);

  /**
   * Defines a keyboard shortcut to activate or add focus to the element.
   * @method np.HtmlElementBuilder#accesskey
   * @param {string} accesskey - a space-separated list of characters
   * @return {np.HtmlElementBuilder} this HtmlElementBuilder instance.
   * @throws {Error} when the 'accesskey' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlElementBuilder, 'accesskey');

  /**
   * Defines a space-separated list of the classes of the element.
   * @method np.HtmlElementBuilder#class
   * @param {string} class - a space-separated list of class names
   * @return {np.HtmlElementBuilder} this HtmlElementBuilder instance.
   * @throws {Error} when the 'class' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlElementBuilder, 'class');

  /**
   * The contenteditable global attribute is an enumerated attribute indicating
   * if the element should be editable by the user.
   * @method np.HtmlElementBuilder#contenteditable
   * @param {boolean} contenteditable - whether or not the element's content
   * can be edited by the user.
   * @return {np.HtmlElementBuilder} this HtmlElementBuilder instance.
   * @throws {Error} when the 'contenteditable' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlElementBuilder, 'contenteditable');

  /**
   * The dir global attribute is an enumerated attribute indicates the
   * directionality of the element's text. Valid values are 'ltr', 'rtl' and
   * 'auto'.
   * @method np.HtmlElementBuilder#dir
   * @param {string} dir - the text direction of the element
   * @return {np.HtmlElementBuilder} this HtmlElementBuilder instance.
   * @throws {Error} when the 'dir' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlElementBuilder, 'dir');

  /**
   * Is a Boolean attribute indicates that the element is not yet, or is no
   * longer, relevant.
   * @method np.HtmlElementBuilder#hidden
   * @param {boolean} hidden - whether this element is hidden
   * @return {np.HtmlElementBuilder} this HtmlElementBuilder instance.
   * @throws {Error} when the 'hidden' argument is not provided.
   */
  ElementBuilder.addAttBoolAccess_(HtmlElementBuilder, 'hidden');

  /**
   * Defines a unique identifier (ID) which must be unique in the whole document.
   * @method np.HtmlElementBuilder#id
   * @param {string} id - the element's id
   * @return {np.HtmlElementBuilder} this HtmlElementBuilder instance.
   * @throws {Error} when the 'id' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlElementBuilder, 'id');

  /**
   * Participates in defining the language of the element, the language that
   * non-editable elements are written in or the language that editable elements
   * should be written in.
   * @method np.HtmlElementBuilder#lang
   * @param {string} id - the element's language
   * @return {np.HtmlElementBuilder} this HtmlElementBuilder instance.
   * @throws {Error} when the 'lang' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlElementBuilder, 'lang');

  /**
   * Is an enumerated attribute defines whether the element may be checked for
   * spelling errors.
   * @method np.HtmlElementBuilder#lang
   * @param {boolean} spellcheck - whether to check the element's spelling
   * @return {np.HtmlElementBuilder} this HtmlElementBuilder instance.
   * @throws {Error} when the 'spellcheck' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlElementBuilder, 'spellcheck');

  /**
   * Contains CSS styling declarations to be applied to the element. Note that
   * it is recommended for styles to be defined in a separate file or files.
   * @method np.HtmlElementBuilder#style
   * @param {string} style - the element's style definition.
   * @return {np.HtmlElementBuilder} this HtmlElementBuilder instance.
   * @throws {Error} when the 'style' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlElementBuilder, 'style');

  /**
   * Is an integer attribute indicates if the element can take input focus (is
   * focusable), if it should participate to sequential keyboard navigation,
   * and if so, at what position.
   * @method np.HtmlElementBuilder#tabindex
   * @param {string} tabindex - the element's tab index.
   * @return {np.HtmlElementBuilder} this HtmlElementBuilder instance.
   * @throws {Error} when the 'tabindex' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlElementBuilder, 'tabindex');

  /**
   * Contains a text representing advisory information related to the element it
   * belongs to.
   * @method np.HtmlElementBuilder#title
   * @param {string} title - the element's title.
   * @return {np.HtmlElementBuilder} this HtmlElementBuilder instance.
   * @throws {Error} when the 'title' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlElementBuilder, 'title');

  /**
   * Is an enumerated attribute that is used to specify whether an element's
   * attribute values and its text content are to be translated when the page is
   * localized, or whether to leave them unchanged.
   * @method np.HtmlElementBuilder#translate
   * @param {boolean} translate - whether to translate the element's contents.
   * @return {np.HtmlElementBuilder} this HtmlElementBuilder instance.
   * @throws {Error} when the 'title' argument is not provided.
   */
  ElementBuilder.addAttValueAccess_(HtmlElementBuilder, 'translate');


  HtmlElementBuilder.addHeadingAccess_ = function(ctor) {
    ctor.prototype.h1 = function() { return new np.HeadingBuilder(this, 1); }
    ctor.prototype.h2 = function() { return new np.HeadingBuilder(this, 2); }
    ctor.prototype.h3 = function() { return new np.HeadingBuilder(this, 3); }
    ctor.prototype.h4 = function() { return new np.HeadingBuilder(this, 4); }
    ctor.prototype.h5 = function() { return new np.HeadingBuilder(this, 5); }
    ctor.prototype.h6 = function() { return new np.HeadingBuilder(this, 6); }
  };



  np.HtmlElementBuilder = HtmlElementBuilder;
}(this.np));
