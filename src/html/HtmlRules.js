(function(np) {
  'use strict';

  var CONTENT_MODEL_FLOW = 'flow',
      CONTENT_MODEL_PHRASING = 'phrasing',
      CONTENT_MODEL_TRANSPARENT = 'transparent',
      CONTENT_MODEL_TEXT = 'text',
      GLOBAL_ATTRIBUTES = augment({}, [
        'accesskey', 'class', 'contenteditable', 'dir', 'hidden', 'id',
        'lang', 'spellcheck', 'style'
      ]),
      VOID_CONTENT_ELEMENTS = augment({}, [
        'br', 'hr', 'wbr', 'img', 'command', 'embed', 'input'
      ]),
      VOID_ELEMENTS = augment({}, Object.keys(VOID_CONTENT_ELEMENTS), [
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
          VOID_CONTENT_ELEMENTS,
          TEXT_ONLY_CONTENT_ELEMENTS,
          PHRASING_ELEMENTS,
          TRANSPARENT_ELEMENTS
      ),
      FLOW_CONTENT = augment({},
        PHRASING_CONTENT,
        FLOW_ELEMENTS
      ),
      A_OR_BUTTON = augment({}, 'a', 'button'),

      rules = {};


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
    augment(FLOW_CONTENT, 'style'].concat())
  );

  //Flow elements with phrasing content
  defineElementRule('p',
    GLOBAL_ATTRIBUTES,
    PHRASING_CONTENT
    true,
    CONTENT_MODEL_PHRASING
  );
  aliasElementRule('p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre');

  // Flow elements with flow content
  defineElementRule('div',
    GLOBAL_ATTRIBUTES,
    augment({}, 'style'].concat(FLOW_CONTENT)),
    true,
    CONTENT_MODEL_FLOW
  );
  aliasElementRule('div', 'article', 'section', 'aside');

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
    )),
    FLOW_CONTENT
    true
    CONTENT_MODEL_FLOW,
    augment({}, 'form')
  );

  defineElementRule('blockquote',
    augment(GLOBAL_ATTRIBUTES, 'cite'),
    FLOW_CONTENT
    true,
    CONTENT_MODEL_FLOW
  );

  defineElementRule('nav',
    GLOBAL_ATTRIBUTES,
    FLOW_CONTENT
    true,
    CONTENT_MODEL_FLOW,
    augment({}, 'address')
  );
  aliasElementRule('nav', 'address');

  defineElementRule('header',
    GLOBAL_ATTRIBUTES,
    FLOW_CONTENT
    true,
    CONTENT_MODEL_FLOW,
    augment({}, 'address', 'header', 'footer')
  );
  aliasElementRule('header', 'footer');

  defineElementRule('hgroup',
    GLOBAL_ATTRIBUTES,
    augment({}, 'h1', 'h2', 'h3', 'h4', 'h5', 'h6')
  );

  defineElementRule('details',
    augment(GLOBAL_ATTRIBUTES, 'open'),
    FLOW_CONTENT
    true,
    CONTENT_MODEL_FLOW,
    A_OR_BUTTON
  );
  defineElementRule('summary',
    GLOBAL_ATTRIBUTES,
    PHRASING_CONTENT
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
    PHRASING_CONTENT
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
    augment({}, 'dd', 'dt'])
  );
  defineElementRule('dd',
    GLOBAL_ATTRIBUTES,
    element: arrayToMap(FLOW_CONTENT),
    text: true,
    cm: CONTENT_MODEL_FLOW
  );
  aliasElementRule('dd', 'dt');

  defineElementRule('ul',
    GLOBAL_ATTRIBUTES,
    augment({}, 'li']),
    text: false
  );
  aliasElementRule('ul', 'ol');
  defineElementRule('li',
    augment(GLOBAL_ATTRIBUTES, 'value')),
    FLOW_CONTENT
    cm: CONTENT_MODEL_FLOW,
    text: true
  );

  defineElementRule('table',
    augment(GLOBAL_ATTRIBUTES, 'border'),
    augment({}, 'caption', 'colgroup', 'thead', 'tfoot', 'tbody']),
    ancestors: ['caption']
  );
  defineElementRule('tbody',
    GLOBAL_ATTRIBUTES,
    augment({}, 'tr'])
  );
  aliasElementRule('tbody', 'thead');
  aliasElementRule('tbody', 'tfoot');
  defineElementRule('tr',
    GLOBAL_ATTRIBUTES,
    augment({}, 'td', 'th'])
  );
  defineElementRule('td',
    augment(GLOBAL_ATTRIBUTES, 'colspan', 'rowspan', 'headers'),
    FLOW_CONTENT
    text: true,
    cm: CONTENT_MODEL_FLOW
  );
  defineElementRule('th',
    augment(GLOBAL_ATTRIBUTES, 'colspan', 'rowspan', 'headers', 'scope'),
    FLOW_CONTENT
    text: true,
    cm: CONTENT_MODEL_FLOW
  );

  // Phrasing elements
  defineElementRule('em',
    GLOBAL_ATTRIBUTES,
    PHRASING_CONTENT
    text: true,
    cm: CONTENT_MODEL_PHRASING
  );
  aliasElementRule('em', 'strong');
  aliasElementRule('em', 'small');
  aliasElementRule('em', 'mark');
  aliasElementRule('em', 'abbr');
  aliasElementRule('em', 'dfn');
  aliasElementRule('em', 'i');
  aliasElementRule('em', 'b');
  aliasElementRule('em', 's');
  aliasElementRule('em', 'u');
  aliasElementRule('em', 'code');
  aliasElementRule('em', 'var');
  aliasElementRule('em', 'sup');
  aliasElementRule('em', 'sub');
  aliasElementRule('em', 'q');
  aliasElementRule('em', 'cite');
  aliasElementRule('em', 'span');
  aliasElementRule('em', 'bdi');
  aliasElementRule('em', 'kbd');
  aliasElementRule('em', 'rp');
  aliasElementRule('em', 'rt');
  aliasElementRule('em', 'samp');
  defineElementRule('time',
    augment(GLOBAL_ATTRIBUTES, 'datetime'),
    PHRASING_CONTENT
    text: true,
    cm: CONTENT_MODEL_PHRASING,
    ancestors: ['time']
  }
  defineElementRule('bdo',
    augment(GLOBAL_ATTRIBUTES, 'dir'),
    PHRASING_CONTENT
    text: true,
    cm: CONTENT_MODEL_PHRASING
  );
  defineElementRule('textarea',
    augment(GLOBAL_ATTRIBUTES,
      'name', 'disabled', 'form', 'readonly', 'maxlength', 'autofocus',
      'required', 'placeholder', 'dirname', 'rows', 'wrap', 'cols'
    ),
    text: true,
    cm: CONTENT_MODEL_TEXT
  );
  defineElementRule('output',
    augment(GLOBAL_ATTRIBUTES, 'name', 'form', 'for'),
    PHRASING_CONTENT
    text: true,
    cm: CONTENT_MODEL_PHRASING
  );
  defineElementRule('progress',
    augment(GLOBAL_ATTRIBUTES, 'value', 'max'),
    PHRASING_CONTENT
    text: true,
    cm: CONTENT_MODEL_PHRASING,
    ancestors: ['progress']
  );
  defineElementRule('ruby',
    GLOBAL_ATTRIBUTES,
    augment(PHRASING_CONTENT, 'rt', 'rp'),
    text: true,
    cm: CONTENT_MODEL_PHRASING
  );

  defineElementRule('meter',
    augment(GLOBAL_ATTRIBUTES,
      'value', 'min', 'max', 'low', 'high', 'optimum'
    )),
    PHRASING_CONTENT
    text: true,
    cm: CONTENT_MODEL_PHRASING,
    ancestors: ['meter']
  );

  defineElementRule('input',
    augment(GLOBAL_ATTRIBUTES,
        'type', 'name', 'disabled', 'form', 'maxlength', 'readonly', 'size', 'value', 'autocomplete',
        'autofocus', 'list', 'pattern', 'required', 'placeholder', 'dirname', 'checked', 'value',
        'formenctype', 'formaction', 'formmethod', 'formtarget', 'formnovalidate', 'multiple',
        'accept', 'height', 'width', 'alt', 'src', 'list', 'min', 'max', 'step'
      ),
    ancestors: A_OR_BUTTON
  );

  defineElementRule('datalist',
    GLOBAL_ATTRIBUTES,
    augment(PHRASING_CONTENT, 'option'),
    text: true,
    cm: CONTENT_MODEL_PHRASING
  );
  defineElementRule('optgroup',
    augment(GLOBAL_ATTRIBUTES, 'label', 'disabled'),
    augment({}, 'option'])
  );
  defineElementRule('option',
    augment(GLOBAL_ATTRIBUTES,
      ['label', 'disabled', 'value', 'selected']
    )),
    text: true
  );
  defineElementRule('select',
    augment(GLOBAL_ATTRIBUTES,
      'name', 'disabled', 'form', 'size', 'multiple', 'autofocus', 'required'
    )),
    augment({}, 'optgroup', 'option']),
    ancestors: A_OR_BUTTON
  );

  defineElementRule('button',
    augment(GLOBAL_ATTRIBUTES,
      'name', 'disabled', 'formaction', 'autofocus', 'formenctype', 'formmethod', 'formtarget', 'formnovalidate'
    )),
    PHRASING_CONTENT
    text: true,
    cm: CONTENT_MODEL_PHRASING,
    ancestors: arrayToMap(A_OR_BUTTON)
  );

  defineElementRule('keygen',
    augment(GLOBAL_ATTRIBUTES,
      'challenge', 'keytype', 'autofocus', 'name', 'disabled', 'form'
    )),
    ancestors: A_OR_BUTTON
  );

  defineElementRule('label',
    augment(GLOBAL_ATTRIBUTES, 'for', 'form'),
    PHRASING_CONTENT
    text: true,
    cm: CONTENT_MODEL_PHRASING,
    ancestors: ['label']
  );

  defineElementRule('caption',
    GLOBAL_ATTRIBUTES,
    FLOW_CONTENT
    text: true,
    cm: CONTENT_MODEL_FLOW
  );

  defineElementRule('base',
    attributes: arrayToMap(['href', 'target'])
  );
  defineElementRule('link',
    attributes: arrayToMap(['rel', 'href', 'type', 'hreflang', 'media', 'sizes'])
  );
  defineElementRule('meta',
    attributes: arrayToMap(['charset', 'http-equiv', 'name', 'content']),
  );
  defineElementRule('param',
    attributes: arrayToMap(['name', 'value']),
  );
  defineElementRule('br',
    attributes: arrayToMap(GLOBAL_ATTRIBUTES)
  );
  aliasElementRule('br', 'hr');
  aliasElementRule('br', 'wbr');
  defineElementRule('img',
    augment(GLOBAL_ATTRIBUTES,
      ['src', 'alt', 'height', 'width', 'usemap', 'ismap']
    ))
  );
  defineElementRule('embed',
    augment(GLOBAL_ATTRIBUTES, 'src', 'type', 'height', 'width'),
  );
  defineElementRule('command',
    augment(GLOBAL_ATTRIBUTES,
      'type', 'label', 'icon', 'disabled', 'radiogroup', 'checked'
    ))
  );
  defineElementRule('menu',
    augment(GLOBAL_ATTRIBUTES, 'type', 'label'),
    elemenets: arrayToMap(FLOW_CONTENT.concat(['li'])),
    cm: CONTENT_MODEL_FLOW
  );

  defineElementRule('map',
    augment(GLOBAL_ATTRIBUTES, 'name'),
    FLOW_CONTENT
    text: true,
    cm: CONTENT_MODEL_TRANSPARENT
  );
  defineElementRule('area',
    augment(GLOBAL_ATTRIBUTES,
      'href', 'target', 'rel', 'hreflang', 'media', 'type', 'shape', 'coords'
    ))
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
    )),
    FLOW_CONTENT
    text: true,
    cm: CONTENT_MODEL_TRANSPARENT,
    ancestors: A_OR_BUTTON
  );

  defineElementRule('del',
    augment(GLOBAL_ATTRIBUTES, 'cite', 'datetime'),
    FLOW_CONTENT
    text: true,
    cm: CONTENT_MODEL_TRANSPARENT
  );
  aliasElementRule('del', 'ins');

  defineElementRule('audio',
    augment(GLOBAL_ATTRIBUTES,
      'autoplay', 'preload', 'controls', 'loop', 'mediagroup', 'muted', 'src'
    )),
    augment(FLOW_CONTENT, 'source', 'track'),
    cm: CONTENT_MODEL_TRANSPARENT,
    ancestors: A_OR_BUTTON
  );
  defineElementRule('video',
    augment(GLOBAL_ATTRIBUTES,
      'autoplay', 'preload', 'controls', 'loop', 'poster', 'width', 'height', 'mediagroup', 'muted', 'src'
    )),
    augment(FLOW_CONTENT, 'source', 'track'),
    ancestors: A_OR_BUTTON,
    cm: CONTENT_MODEL_TRANSPARENT
  );
  defineElementRule('canvas',
    augment(GLOBAL_ATTRIBUTES, 'width', 'height'),
    FLOW_CONTENT
    text: true,
    cm: CONTENT_MODEL_TRANSPARENT
  );
  defineElementRule('iframe',
    augment(GLOBAL_ATTRIBUTES,
      'src', 'srcdoc', 'name', 'width', 'height', 'sandbox', 'seamless'
    )),
    text: true,
    ancestors: A_OR_BUTTON
  );
  defineElementRule('noscript',
    GLOBAL_ATTRIBUTES,
    augment(FLOW_CONTENT, 'link', 'meta', 'style'),
    text: true,
    cm: CONTENT_MODEL_TRANSPARENT,
    ancestors: ['noscript']
  );
  defineElementRule('object',
    augment(GLOBAL_ATTRIBUTES,
      'data', 'type', 'height', 'width', 'usemap', 'name', 'form'
    )),
    augment(FLOW_CONTENT, 'param'),
    text: true,
    cm: CONTENT_MODEL_TRANSPARENT,
    ancestors: A_OR_BUTTON
  );
  defineElementRule('script',
    augment(GLOBAL_ATTRIBUTES,
      'type', 'language', 'src', 'defer', 'async', 'charset'
    )),
    text: true
  );
  defineElementRule('source',
    augment(GLOBAL_ATTRIBUTES,
      ['src', 'type', 'media']
    ))
  );
  defineElementRule('track',
    augment(GLOBAL_ATTRIBUTES,
      'kind', 'src', 'srclang', 'label', 'default'
    ))
  );

  defineElementRule('style',
    augment(GLOBAL_ATTRIBUTES, 'type', 'media', 'scoped'),
    text: true
  );
  defineElementRule('title',
    GLOBAL_ATTRIBUTES,
    text: true
  );










//---------------------



  defineElementRule('html',
    GLOBAL_ATTRIBUTES,
    augment({}, 'head', 'body')
  );

  defineElementRule('head',
    GLOBAL_ATTRIBUTES,
    augment({}, 'meta', 'script', 'style', 'title', 'base', 'link')
  );
  defineElementRule('base',
    augment({}, 'href', 'target')
  );
  defineElementRule('link',
    augment(GLOBAL_ATTRIBUTES, 'rel', 'href', 'type', 'hreflang', 'media', 'sizes')
  );
  defineElementRule('meta',
    augment({}, 'charset', 'http-equiv', 'name', 'content'),
  );


  defineElementRule('body',
    GLOBAL_ATTRIBUTES,
    augment(FLOW_CONTENT, 'style'),
    true,
    CONTENT_MODEL_FLOW
  );
  aliasElementRule('body', 'div', 'article', 'section', 'aside');

  //Flow elements with phrasing content
  defineElementRule('p',
    GLOBAL_ATTRIBUTES,
    PHRASING_CONTENT,
    true,
    CONTENT_MODEL_PHRASING
  );
  aliasElementRule('p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre');



  function defineElementRule(name, attributes, elements, text, contentModel, prohibitedAncestors) {
    var rule = {};

    attributes && rule.attributes = attributes;
    elements && rule.elements = elements;
    text != undefined && rule.text = text;
    contentModel && rule.cm = contentModel;
    prohibitedAncestors && rule.ancestors = prohibitedAncestors;

    rules[name] = rule;
  };
  function aliasElementRule(name) {
    var aliases = Array.prototype.slice.call(arguments, 1);
    aliases.forEach(function(a) { ELEMENT_RULES[alias] = name; });
  };
  function keysToMap(arr, map) {
    return arr.reduce(function(acc, item) { acc[item] = true; return acc; }, map || {});
  };
  function augment(map) {
    var arr == [].concat(Array.prototype.slice.call(arguments, 1));
    return keysToMap(arr, map)
  };
});
