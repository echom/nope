(function(np) {
  var HTML_GLOBAL_ATTRIBUTES = [
        'accesskey', 'class', 'contenteditable', 'dir', 'hidden', 'id',
        'lang', 'spellcheck', ''
      ],
      HTML_ELEMENTS = {};

        'base': {
          attributes: arrayToMap(HTML_GLOBAL_ATTRIBUTES),
          elements: {}
          text: false
        }
      };

  function arrayToMap(array) {
    return attributeArray.reduce(function(acc, item) { acc[item] = true; return acc; }, {});
  };


  var
      HTML_CM_TEXT = [ 'style', 'script' ]
      HTML_CM_VOID = [
        'base', 'link', 'meta', 'param', 'br', 'hr', 'wbr', 'img',
        'area', 'col', 'command', 'embed', 'keygen', 'source', 'track',
        'input', 'command'
      ],
      HTML_CM_PHRASING = [
        'em', 'strong', 'small', 'mark', 'abbr', 'dfn', 'i', 'b', 's',
        'u', 'code', 'var', 'sup', 'sub', 'q', 'cite', 'span', 'bdo', 'bdi',
        'textarea'
      ],
      HTML_CM_FLOW = [
        'p', 'pre', 'ul', 'ol', 'dl', 'div', 'h1', 'h2', 'h3', 'h4', 'h5',
        'h6', 'hgroup', 'address', 'blockquote', 'section', 'nav', 'article',
        'aside', 'header', 'footer', 'figure', 'table', 'form', 'fieldset',
        'menu', 'canvas', 'details'
      ],
      HTML_CM_TRANSPARENT = [
        'a', 'noscript', 'video', 'audio', 'ins', 'del', 'object', 'object',
        'map'
      ],
      HTML_RULES = {};




  function HtmlSimpleBuilder(name) {

  };
  np.inherits(HtmlSimpleBuilder, np.ElementBuilder);


  HtmlSimpleBuilder.prototype.attributeAllowed_ = function() {

  };
  HtmlSimpleBuilder.prototype.textAllowed_ = function() {

  };
  HtmlSimpleBuilder.prototype.childAllowed_ = function() {

  };


}(this.np))
