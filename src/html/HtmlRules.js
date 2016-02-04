(function(np) {
  'use strict';

  var CONTENT_MODEL_FLOW = 'flow',
      CONTENT_MODEL_PHRASING = 'phrasing',
      CONTENT_MODEL_TRANSPARENT = 'transparent',
      GLOBAL_ATTRIBUTES = augment({}, [
        'accesskey', 'class', 'contenteditable', 'dir', 'hidden', 'id',
        'lang', 'spellcheck', 'style'
      ]),
      ALL_ATTRIBUTES = augment(GLOBAL_ATTRIBUTES, [
        'action', 'method', 'enctype', 'name', 'accept-charset', 'novalidate',
        'autocomplete', 'target', 'cite', 'open', 'disabled', 'form', 'value',
        'border', 'colspan', 'rowspan', 'headers', 'scope', 'datetime',
        'readonly', 'maxlength', 'autofocus', 'required', 'placeholder',
        'dirname', 'rows', 'wrap', 'cols', 'for', 'max', 'min', 'low', 'high',
        'optimum', 'type', 'size', 'list', 'pattern', 'checked', 'formenctype',
        'formaction', 'formmethod', 'formtarget', 'formnovalidate', 'multiple',
        'accept', 'height', 'width', 'alt', 'src', 'step', 'label', 'selected',
        'challenge', 'keytype', 'href', 'rel', 'hreflang', 'media', 'sizes',
        'charset', 'http-equiv', 'content', 'usemap', 'ismap', 'icon',
        'radiogroup', 'shape', 'coords', 'span', 'autoplay', 'preload',
        'controls', 'loop', 'mediagroup', 'muted', 'poster', 'srcdoc',
        'sandbox', 'seamless', 'data', 'language', 'defer', 'async', 'kind',
        'srclang', 'default', 'scoped'
      ]),
      VOID_CONTENT_ELEMENTS = augment({}, [
        'br', 'hr', 'wbr', 'img', 'command', 'embed', 'input'
      ]),
      VOID_ELEMENTS = augment(VOID_CONTENT_ELEMENTS, [
        'base', 'link', 'meta', 'param', 'area', 'col', 'keygen', 'source',
        'track', 'head'
      ]),
      TEXT_ONLY_CONTENT_ELEMENTS = augment({}, 'textarea'),
      TEXT_ONLY_ELEMENTS = augment(TEXT_ONLY_CONTENT_ELEMENTS, [
        'title', 'style', 'script'
      ]),
      PHRASING_ELEMENTS = augment({}, [
        'em', 'strong', 'small', 'mark', 'abbr', 'dfn', 'i', 'b', 's', 'u',
        'code', 'var', 'sup', 'sub', 'q', 'cite', 'span', 'bdo', 'bdi',
        'button', 'datalist', 'kbd', 'label', 'meter', 'output', 'progress',
        'ruby', 'samp', 'select', 'time'
      ]),
      FLOW_ELEMENTS = augment({}, [
        'p', 'pre', 'ul', 'ol', 'dl', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'hgroup', 'address', 'blockquote', 'section', 'nav', 'article', 'aside',
        'header', 'footer', 'figure', 'table', 'form', 'fieldset', 'menu',
        'canvas', 'details'
      ]),
      TRANSPARENT_ELEMENTS = augment({}, [
        'a', 'object', 'ins', 'del', 'map', 'noscript', 'video', 'audio'
      ]),
      OTHER_ELEMENTS = augment({}, [
        'html', 'head', 'body', 'caption', 'colgroup', 'li', 'dd', 'dt',
        'figcaption', 'iframe', 'legend', 'optgroup', 'option', 'rp', 'rt',
        'summary', 'thead', 'tbody', 'tfoot', 'th', 'tr', 'td'
      ]),
      PHRASING_CONTENT = augment({},
          Object.keys(VOID_CONTENT_ELEMENTS),
          Object.keys(TEXT_ONLY_CONTENT_ELEMENTS),
          Object.keys(PHRASING_ELEMENTS),
          Object.keys(TRANSPARENT_ELEMENTS)
      ),
      FLOW_CONTENT = augment({},
        Object.keys(PHRASING_CONTENT),
        Object.keys(FLOW_ELEMENTS)
      ),
      A_OR_BUTTON = augment({}, 'a', 'button'),

      elementRules = {};

  defineElementRule('html',
    GLOBAL_ATTRIBUTES,
    augment({}, 'head', 'body')
  );
  defineElementRule('head',
    GLOBAL_ATTRIBUTES,
    augment({}, 'meta', 'script', 'style', 'title', 'base', 'link')
  );
  defineElementRule('body',
    GLOBAL_ATTRIBUTES,
    augment(FLOW_CONTENT, 'style'),
    false,
    CONTENT_MODEL_FLOW
  );
  defineElementRule('p',
    GLOBAL_ATTRIBUTES,
    PHRASING_CONTENT,
    true,
    CONTENT_MODEL_PHRASING
  );
  defineElementRule('div',
    GLOBAL_ATTRIBUTES,
    augment(FLOW_CONTENT, 'style'),
    true,
    CONTENT_MODEL_FLOW
  );
  defineElementRule('figure',
    GLOBAL_ATTRIBUTES,
    augment(FLOW_CONTENT, 'figcaption'),
    true,
    CONTENT_MODEL_FLOW
  );
  defineElementRule('form',
    augment(GLOBAL_ATTRIBUTES,
      'action', 'method', 'enctype', 'name', 'accept-charset', 'novalidate',
      'autocomplete', 'target'
    ),
    FLOW_CONTENT,
    true,
    CONTENT_MODEL_FLOW,
    augment({}, 'form')
  );
  defineElementRule('blockquote',
    augment(GLOBAL_ATTRIBUTES, 'cite'),
    FLOW_CONTENT,
    true,
    CONTENT_MODEL_FLOW
  );
  defineElementRule('nav',
    GLOBAL_ATTRIBUTES,
    FLOW_CONTENT,
    true,
    CONTENT_MODEL_FLOW,
    augment({}, 'address')
  );
  defineElementRule('header',
    GLOBAL_ATTRIBUTES,
    FLOW_CONTENT,
    true,
    CONTENT_MODEL_FLOW,
    augment({}, 'address', 'header', 'footer')
  );
  defineElementRule('hgroup',
    GLOBAL_ATTRIBUTES,
    augment({}, 'h1', 'h2', 'h3', 'h4', 'h5', 'h6')
  );
  defineElementRule('details',
    augment(GLOBAL_ATTRIBUTES, 'open'),
    FLOW_CONTENT,
    true,
    CONTENT_MODEL_FLOW,
    A_OR_BUTTON
  );
  defineElementRule('summary',
    GLOBAL_ATTRIBUTES,
    PHRASING_CONTENT,
    true,
    CONTENT_MODEL_PHRASING
  );
  defineElementRule('fieldset',
    augment(GLOBAL_ATTRIBUTES, 'name', 'disabled', 'form'),
    augment(FLOW_CONTENT, 'legend'),
    true,
    CONTENT_MODEL_FLOW
  );
  defineElementRule('legend',
    GLOBAL_ATTRIBUTES,
    PHRASING_CONTENT,
    true,
    CONTENT_MODEL_PHRASING
  );
  defineElementRule('figcaption',
    GLOBAL_ATTRIBUTES,
    FLOW_CONTENT,
    true,
    CONTENT_MODEL_FLOW
  );
  defineElementRule('dl',
    GLOBAL_ATTRIBUTES,
    augment({}, 'dd', 'dt')
  );
  defineElementRule('dd',
    GLOBAL_ATTRIBUTES,
    FLOW_CONTENT,
    true,
    CONTENT_MODEL_FLOW
  );
  defineElementRule('ul',
    GLOBAL_ATTRIBUTES,
    augment({}, 'li')
  );
  defineElementRule('li',
    augment(GLOBAL_ATTRIBUTES, 'value'),
    FLOW_CONTENT,
    true,
    CONTENT_MODEL_FLOW
  );
  defineElementRule('table',
    augment(GLOBAL_ATTRIBUTES, 'border'),
    augment({}, 'caption', 'colgroup', 'thead', 'tfoot', 'tbody'),
    false,
    undefined,
    augment({}, 'caption')
  );
  defineElementRule('tbody',
    GLOBAL_ATTRIBUTES,
    augment({}, 'tr')
  );
  defineElementRule('tr',
    GLOBAL_ATTRIBUTES,
    augment({}, 'td', 'th')
  );
  defineElementRule('td',
    augment(GLOBAL_ATTRIBUTES, 'colspan', 'rowspan', 'headers'),
    FLOW_CONTENT,
    true,
    CONTENT_MODEL_FLOW
  );
  defineElementRule('th',
    augment(GLOBAL_ATTRIBUTES, 'colspan', 'rowspan', 'headers', 'scope'),
    FLOW_CONTENT,
    true,
    CONTENT_MODEL_FLOW
  );
  defineElementRule('em',
    GLOBAL_ATTRIBUTES,
    PHRASING_CONTENT,
    true,
    CONTENT_MODEL_PHRASING
  );
  defineElementRule('time',
    augment(GLOBAL_ATTRIBUTES, 'datetime'),
    PHRASING_CONTENT,
    true,
    CONTENT_MODEL_PHRASING,
    augment({}, 'time')
  );
  defineElementRule('bdo',
    augment(GLOBAL_ATTRIBUTES, 'dir'),
    PHRASING_CONTENT,
    true,
    CONTENT_MODEL_PHRASING
  );
  defineElementRule('textarea',
    augment(GLOBAL_ATTRIBUTES,
      'name', 'disabled', 'form', 'readonly', 'maxlength', 'autofocus',
      'required', 'placeholder', 'dirname', 'rows', 'wrap', 'cols'
    ),
    undefined,
    true
  );
  defineElementRule('output',
    augment(GLOBAL_ATTRIBUTES, 'name', 'form', 'for'),
    PHRASING_CONTENT,
    true,
    CONTENT_MODEL_PHRASING
  );
  defineElementRule('progress',
    augment(GLOBAL_ATTRIBUTES, 'value', 'max'),
    PHRASING_CONTENT,
    true,
    CONTENT_MODEL_PHRASING,
    augment({}, 'progress')
  );
  defineElementRule('ruby',
    GLOBAL_ATTRIBUTES,
    augment(PHRASING_CONTENT, 'rt', 'rp'),
    true,
    CONTENT_MODEL_PHRASING
  );
  defineElementRule('meter',
    augment(GLOBAL_ATTRIBUTES, 'value', 'min', 'max', 'low', 'high', 'optimum'),
    PHRASING_CONTENT,
    true,
    CONTENT_MODEL_PHRASING,
    augment({}, 'meter')
  );
  defineElementRule('input',
    augment(GLOBAL_ATTRIBUTES,
        'type', 'name', 'disabled', 'form', 'maxlength', 'readonly', 'size',
        'value', 'autocomplete', 'autofocus', 'list', 'pattern', 'required',
        'placeholder', 'dirname', 'checked', 'value', 'formenctype',
        'formaction', 'formmethod', 'formtarget', 'formnovalidate', 'multiple',
        'accept', 'height', 'width', 'alt', 'src', 'list', 'min', 'max', 'step'
      ),
    undefined,
    false,
    A_OR_BUTTON
  );
  defineElementRule('datalist',
    GLOBAL_ATTRIBUTES,
    augment(PHRASING_CONTENT, 'option'),
    true,
    CONTENT_MODEL_PHRASING
  );
  defineElementRule('optgroup',
    augment(GLOBAL_ATTRIBUTES, 'label', 'disabled'),
    augment({}, 'option')
  );
  defineElementRule('option',
    augment(GLOBAL_ATTRIBUTES, 'label', 'disabled', 'value', 'selected'),
    undefined,
    true
  );
  defineElementRule('select',
    augment(GLOBAL_ATTRIBUTES,
      'name', 'disabled', 'form', 'size', 'multiple', 'autofocus', 'required'
    ),
    augment({}, 'optgroup', 'option'),
    false,
    undefined,
    A_OR_BUTTON
  );
  defineElementRule('button',
    augment(GLOBAL_ATTRIBUTES,
      'name', 'disabled', 'formaction', 'autofocus', 'formenctype',
      'formmethod', 'formtarget', 'formnovalidate'
    ),
    PHRASING_CONTENT,
    true,
    CONTENT_MODEL_PHRASING,
    A_OR_BUTTON
  );
  defineElementRule('keygen',
    augment(GLOBAL_ATTRIBUTES,
      'challenge', 'keytype', 'autofocus', 'name', 'disabled', 'form'
    ),
    undefined,
    true,
    undefined,
    A_OR_BUTTON
  );
  defineElementRule('label',
    augment(GLOBAL_ATTRIBUTES, 'for', 'form'),
    PHRASING_CONTENT,
    true,
    CONTENT_MODEL_PHRASING,
    augment({}, 'label')
  );
  defineElementRule('caption',
    GLOBAL_ATTRIBUTES,
    FLOW_CONTENT,
    true,
    CONTENT_MODEL_FLOW
  );
  defineElementRule('base',
    augment(GLOBAL_ATTRIBUTES, 'href', 'target')
  );
  defineElementRule('link',
    augment(GLOBAL_ATTRIBUTES, 'rel', 'href', 'type', 'hreflang', 'media', 'sizes')
  );
  defineElementRule('meta',
    augment(GLOBAL_ATTRIBUTES, 'charset', 'http-equiv', 'name', 'content')
  );
  defineElementRule('param',
    augment(GLOBAL_ATTRIBUTES, 'name', 'value')
  );
  defineElementRule('br',
    GLOBAL_ATTRIBUTES
  );
  defineElementRule('img',
    augment(GLOBAL_ATTRIBUTES,
      'src', 'alt', 'height', 'width', 'usemap', 'ismap'
    )
  );
  defineElementRule('embed',
    augment(GLOBAL_ATTRIBUTES, 'src', 'type', 'height', 'width')
  );
  defineElementRule('command',
    augment(GLOBAL_ATTRIBUTES,
      'type', 'label', 'icon', 'disabled', 'radiogroup', 'checked'
    )
  );
  defineElementRule('menu',
    augment(GLOBAL_ATTRIBUTES, 'type', 'label'),
    augment(FLOW_CONTENT, 'li'),
    true,
    CONTENT_MODEL_FLOW
  );
  defineElementRule('map',
    augment(GLOBAL_ATTRIBUTES, 'name'),
    FLOW_CONTENT,
    true,
    CONTENT_MODEL_TRANSPARENT
  );
  defineElementRule('area',
    augment(GLOBAL_ATTRIBUTES,
      'href', 'target', 'rel', 'hreflang', 'media', 'type', 'shape', 'coords'
    )
  );
  defineElementRule('colgroup',
    augment(GLOBAL_ATTRIBUTES, 'span'),
    augment({},  'col')
  );
  defineElementRule('col',
    augment(GLOBAL_ATTRIBUTES, 'span')
  );
  defineElementRule('a',
    augment(GLOBAL_ATTRIBUTES,
      'href', 'target', 'rel', 'hreflang', 'media', 'type'
    ),
    FLOW_CONTENT,
    true,
    CONTENT_MODEL_TRANSPARENT,
    A_OR_BUTTON
  );
  defineElementRule('del',
    augment(GLOBAL_ATTRIBUTES, 'cite', 'datetime'),
    FLOW_CONTENT,
    true,
    CONTENT_MODEL_TRANSPARENT
  );
  defineElementRule('audio',
    augment(GLOBAL_ATTRIBUTES,
      'autoplay', 'preload', 'controls', 'loop', 'mediagroup', 'muted', 'src'
    ),
    augment(FLOW_CONTENT, 'source', 'track'),
    true,
    CONTENT_MODEL_TRANSPARENT,
    A_OR_BUTTON
  );
  defineElementRule('video',
    augment(GLOBAL_ATTRIBUTES,
      'autoplay', 'preload', 'controls', 'loop', 'poster', 'width', 'height',
      'mediagroup', 'muted', 'src'
    ),
    augment(FLOW_CONTENT, 'source', 'track'),
    true,
    CONTENT_MODEL_TRANSPARENT,
    A_OR_BUTTON
  );
  defineElementRule('canvas',
    augment(GLOBAL_ATTRIBUTES, 'width', 'height'),
    FLOW_CONTENT,
    true,
    CONTENT_MODEL_TRANSPARENT
  );
  defineElementRule('iframe',
    augment(GLOBAL_ATTRIBUTES,
      'src', 'srcdoc', 'name', 'width', 'height', 'sandbox', 'seamless'
    ),
    undefined,
    true,
    A_OR_BUTTON
  );
  defineElementRule('noscript',
    GLOBAL_ATTRIBUTES,
    augment(FLOW_CONTENT, 'link', 'meta', 'style'),
    true,
    CONTENT_MODEL_TRANSPARENT,
    augment({}, 'noscript')
  );
  defineElementRule('object',
    augment(GLOBAL_ATTRIBUTES,
      'data', 'type', 'height', 'width', 'usemap', 'name', 'form'
    ),
    augment(FLOW_CONTENT, 'param'),
    true,
    CONTENT_MODEL_TRANSPARENT,
    A_OR_BUTTON
  );
  defineElementRule('script',
    augment(GLOBAL_ATTRIBUTES,
      'type', 'language', 'src', 'defer', 'async', 'charset'
    ),
    true
  );
  defineElementRule('source',
    augment(GLOBAL_ATTRIBUTES, 'src', 'type', 'media')
  );
  defineElementRule('track',
    augment(GLOBAL_ATTRIBUTES, 'kind', 'src', 'srclang', 'label', 'default')
  );
  defineElementRule('style',
    augment(GLOBAL_ATTRIBUTES, 'type', 'media', 'scoped'),
    undefined,
    true
  );
  defineElementRule('title',
    GLOBAL_ATTRIBUTES,
    undefined,
    true
  );

  aliasElementRule('p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre');
  aliasElementRule('div', 'article', 'section', 'aside');
  aliasElementRule('nav', 'address');
  aliasElementRule('br', 'hr', 'wbr');
  aliasElementRule('del', 'ins');
  aliasElementRule('header', 'footer');
  aliasElementRule('ul', 'ol');
  aliasElementRule('dd', 'dt');
  aliasElementRule('tbody', 'thead', 'tfoot');
  aliasElementRule('em', 'strong', 'small', 'mark', 'abbr', 'dfn', 'i', 'b');
  aliasElementRule('em', 's', 'u', 'code', 'var', 'sup', 'sub', 'q', 'cite');
  aliasElementRule('em', 'span', 'bdi', 'kbd', 'rp', 'rt', 'samp');


  function defineElementRule(name, attributes, elements, text, contentModel, prohibitedAncestors) {
    var rule = { text: !!text };

    if(attributes) rule.attributes = attributes;
    if(elements) rule.elements = elements;
    if(contentModel) rule.cm = contentModel;
    if(prohibitedAncestors) rule.ancestors = prohibitedAncestors;

    elementRules[name] = rule;
  }
  function aliasElementRule(name) {
    var aliases = Array.prototype.slice.call(arguments, 1);
    aliases.forEach(function(a) { elementRules[a] = elementRules[name]; });
  }

  function checkElementAccess(element, childName) {
    var parentRule = elementRules[element.type],
        childRule = elementRules[childName];
    if(!parentRule.elements) {
      throw new Error(np.msg.opInvalid(
        childName + '()',
        '<' + element.type + '> cannot have child elements.',
        element.path()
      ));
    } else if(!parentRule.elements[childName]) {
      throw new Error(np.msg.opInvalid(
        childName + '()',
        '<' + element.type + '> cannot have <' + childName + '> child elements.',
        element.path()
      ));
    } else if(childRule.ancestors) {
      var match = element.firstParent_(function(e) {
            return !!childRule.ancestors[e.type];
          });
      if(match) {
        throw new Error(np.msg.opInvalid(
          childName + '()',
          '<' + childName + '> cannot have an ancestor <' + match.type + '>',
          element.path()
        ));
      }
    }
  }
  function checkFlowElementAccess(element, childName) {
    checkElementAccess(element, childName);

    if(element.getContentModel() === CONTENT_MODEL_PHRASING) {
      throw new Error(np.msg.opInvalid(
        name + '()',
        '<' + element.type + '> cannot have <' + childName + '> child elements ' +
        '(<' + element.type + '> is nested in an element that expects phrasing content only).',
        element.path()
      ));
    }
  }
  function checkTextAccess(element) {
    if(!elementRules[element.type].text) {
      throw new Error(np.msg.opInvalid(
        'text()',
        '<' + element.type + '> cannot have text content.',
        element.path()
      ));
    }
  }
  function checkAttributeAccess(element, name) {
    var attributes = elementRules[element.type].attributes;
    if(!attributes || !attributes[name]) {
      throw new Error(np.msg.opInvalid(
        name + '()',
        '<' + element.type + '> cannot have attribute "' + name + '".',
        element.path()
      ));
    }
  }

  function getRule(name) {
    var rule = elementRules[name];
    if(!rule) {
      throw new Error(np.msg.argInvalid(
        'name',
        'cannot find rule for <' + name + '>'
      ));
    }
    return rule;
  }

  function keysToMap(arr, map) {
    return arr.reduce(function(acc, item) { acc[item] = true; return acc; }, map || {});
  }
  function augment(map) {
    var obj = keysToMap(Object.keys(map)),
        arr = Array.prototype.slice.call(arguments, 1).reduce(function(acc, arg) {
          return acc.concat(arg);
        }, []);

    return keysToMap(arr, obj);
  }

  np.HtmlRules = {
    CONTENT_MODEL_FLOW: CONTENT_MODEL_FLOW,
    CONTENT_MODEL_PHRASING: CONTENT_MODEL_PHRASING,
    CONTENT_MODEL_TRANSPARENT: CONTENT_MODEL_TRANSPARENT,
    ATTRIBUTES: Object.keys(ALL_ATTRIBUTES),
    PHRASING_ELEMENTS: Object.keys(PHRASING_ELEMENTS),
    VOID_ELEMENTS: Object.keys(VOID_ELEMENTS),
    FLOW_ELEMENTS: Object.keys(FLOW_ELEMENTS),
    TRANSPARENT_ELEMENTS: Object.keys(TRANSPARENT_ELEMENTS),
    TEXT_ONLY_ELEMENTS: Object.keys(TEXT_ONLY_ELEMENTS),
    OTHER_ELEMENTS: Object.keys(OTHER_ELEMENTS),

    getRule: getRule,

    checkElementAccess: checkElementAccess,
    checkFlowElementAccess: checkFlowElementAccess,
    checkTextAccess: checkTextAccess,
    checkAttributeAccess: checkAttributeAccess
  };
}(this.np));
