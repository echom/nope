(function(np) {
  'use strict';

  var t = new Date();

  var CONTENT_MODEL_FLOW = 'flow',
      CONTENT_MODEL_PHRASING = 'phrasing',
      CONTENT_MODEL_TRANSPARENT = 'transparent',
      CONTENT_MODEL_TEXT = 'text',
      GLOBAL_ATTRIBUTES =
        'accesskey|class|contenteditable|dir|hidden|id|lang|spellcheck|style'
        .split('|'),
      ALL_ATTRIBUTES = GLOBAL_ATTRIBUTES.concat([
          'href|target|rel|hreflang|media|type|target|src|type|height|width',
          'cite|datetime|sizes|name|value|start|reversed|charset|http|content',
          'charset|http-equiv|data|form|defer|async|scoped|disabled|formaction',
          'autofocus|formenctype|formmethod|formtarget|formnovalidate'
        ].join('|').split('|')),
      VOID_CONTENT_ELEMENTS = [
          'br|hr|wbr|img|command|embed|input'
        ].join('|').split('|'),
      VOID_ELEMENTS = VOID_CONTENT_ELEMENTS.concat([
          'base|link|meta|param|area|col|keygen|source|track|head'
        ].join('|').split('|')),
      TEXT_ONLY_CONTENT_ELEMENTS = ['textarea'],
      TEXT_ONLY_ELEMENTS = TEXT_ONLY_CONTENT_ELEMENTS.concat(
        'title|style|script'.split('|')),
      PHRASING_ELEMENTS = [
          'em|strong|small|mark|abbr|dfn|i|b|s|u|code|var|sup|sub|q|cite|span',
          'bdo|bdi|button|datalist|kbd|label|meter|output|progress|ruby|samp',
          'select'
        ].join('|').split('|'),
      FLOW_ELEMENTS = [
          'p|pre|ul|ol|dl|div|h1|h2|h3|h4|h5|h6|hgroup|address|blockquote',
          'section|nav|article|aside|header|footer|figure|table|form|fieldset',
          'menu|canvas|details'
        ].join('|').split('|'),
      TRANSPARENT_ELEMENTS = [
          'a|object|ins|del|map|noscript|video|audio'
        ].join('|').split('|'),
      OTHER_ELEMENTS = [
        'html|head|body|caption|colgroup|li|dd|dt|figcaption|iframe|legend',
        'optgroup|option|rp|rt'
      ].join('|').split('|'),
      PHRASING_CONTENT = [].concat(
        VOID_CONTENT_ELEMENTS,
        TEXT_ONLY_CONTENT_ELEMENTS,
        PHRASING_ELEMENTS,
        TRANSPARENT_ELEMENTS
      ),
      FLOW_CONTENT = PHRASING_CONTENT.concat(
        FLOW_ELEMENTS
      ),
      ALL_ELEMENTS = [].concat(
        VOID_ELEMENTS,
        TEXT_ONLY_ELEMENTS,
        PHRASING_ELEMENTS,
        TRANSPARENT_ELEMENTS,
        FLOW_ELEMENTS,
        OTHER_ELEMENTS
      ),
      A_OR_BUTTON = ['a', 'button'],
      ELEMENT_RULES = {},
      ELEMENT_FACTORIES = {},
      ATTRIBUTE_FACTORIES = {};

  ELEMENT_RULES.html = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(['head', 'body'])
  };
  ELEMENT_RULES.head = {
    elements: arrayToMap('meta|script|style|title|base|link'.split('|'))
  };
  ELEMENT_RULES.body = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(['style'].concat(FLOW_CONTENT))
  };

  //Flow elements with phrasing content
  ELEMENT_RULES.p = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(PHRASING_CONTENT),
    text: true,
    cm: CONTENT_MODEL_PHRASING
  };
  ELEMENT_RULES.h1 = ELEMENT_RULES.p;
  ELEMENT_RULES.h2 = ELEMENT_RULES.p;
  ELEMENT_RULES.h3 = ELEMENT_RULES.p;
  ELEMENT_RULES.h4 = ELEMENT_RULES.p;
  ELEMENT_RULES.h5 = ELEMENT_RULES.p;
  ELEMENT_RULES.h6 = ELEMENT_RULES.p;
  ELEMENT_RULES.pre = ELEMENT_RULES.p;

  // Flow elements with flow content
  ELEMENT_RULES.div = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(['style'].concat(FLOW_CONTENT)),
    text: true,
    cm: CONTENT_MODEL_FLOW
  };
  ELEMENT_RULES.article = ELEMENT_RULES.div;
  ELEMENT_RULES.aside = ELEMENT_RULES.div;
  ELEMENT_RULES.section = ELEMENT_RULES.div;

  ELEMENT_RULES.figure = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(FLOW_CONTENT.concat(['figcaption'])),
    text: true,
    cm: CONTENT_MODEL_FLOW
  };

  ELEMENT_RULES.form = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(
      'action|method|enctype|name|accept-charset|novalidate|autocomplete|target'.split('|')
    )),
    elements: arrayToMap(FLOW_CONTENT),
    text: true,
    cm: CONTENT_MODEL_FLOW,
    ancestors: ['form']
  };

  ELEMENT_RULES.blockquote = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['cite'])),
    elements: arrayToMap(FLOW_CONTENT),
    text: true,
    cm: CONTENT_MODEL_FLOW
  };

  ELEMENT_RULES.nav = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(FLOW_CONTENT),
    text: true,
    cm: CONTENT_MODEL_FLOW,
    ancestors: arrayToMap(['address'])
  };
  ELEMENT_RULES.address = ELEMENT_RULES.nav;

  ELEMENT_RULES.header = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(FLOW_CONTENT),
    text: true,
    cm: CONTENT_MODEL_FLOW,
    ancestors: arrayToMap(['address', 'header', 'footer'])
  };
  ELEMENT_RULES.footer = ELEMENT_RULES.header;

  ELEMENT_RULES.hgroup = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  };

  ELEMENT_RULES.details = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['open'])),
    elements: arrayToMap(FLOW_CONTENT),
    text: true,
    cm: CONTENT_MODEL_FLOW,
    ancestors: arrayToMap(A_OR_BUTTON)
  };
  ELEMENT_RULES.fieldset = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['name', 'disabled', 'form'])),
    elements: arrayToMap(FLOW_CONTENT.concat(['legend'])),
    text: true,
    cm: CONTENT_MODEL_FLOW
  };
  ELEMENT_RULES.legend = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(PHRASING_CONTENT),
    text: true,
    cm: CONTENT_MODEL_PHRASING
  };

  ELEMENT_RULES.figcaption = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    content: arrayToMap(FLOW_CONTENT),
    text: true,
    cm: CONTENT_MODEL_FLOW
  };

  ELEMENT_RULES.dl = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(['dd', 'dt'])
  };
  ELEMENT_RULES.dd = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    element: arrayToMap(FLOW_CONTENT),
    text: true,
    cm: CONTENT_MODEL_FLOW
  };
  ELEMENT_RULES.dt = ELEMENT_RULES.dd;

  ELEMENT_RULES.ul = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(['li']),
    text: false
  };
  ELEMENT_RULES.ol = ELEMENT_RULES.ul;
  ELEMENT_RULES.li = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat('value')),
    elements: arrayToMap(FLOW_CONTENT),
    cm: CONTENT_MODEL_FLOW,
    text: true
  };

  // Phrasing elements
  ELEMENT_RULES.em = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(PHRASING_CONTENT),
    text: true,
    cm: CONTENT_MODEL_PHRASING
  };
  ELEMENT_RULES.strong = ELEMENT_RULES.em;
  ELEMENT_RULES.small = ELEMENT_RULES.em;
  ELEMENT_RULES.mark = ELEMENT_RULES.em;
  ELEMENT_RULES.abbr = ELEMENT_RULES.em;
  ELEMENT_RULES.dfn = ELEMENT_RULES.em;
  ELEMENT_RULES.i = ELEMENT_RULES.em;
  ELEMENT_RULES.b = ELEMENT_RULES.em;
  ELEMENT_RULES.s = ELEMENT_RULES.em;
  ELEMENT_RULES.u = ELEMENT_RULES.em;
  ELEMENT_RULES.code = ELEMENT_RULES.em;
  ELEMENT_RULES.var = ELEMENT_RULES.em;
  ELEMENT_RULES.sup = ELEMENT_RULES.em;
  ELEMENT_RULES.sub = ELEMENT_RULES.em;
  ELEMENT_RULES.q = ELEMENT_RULES.em;
  ELEMENT_RULES.cite = ELEMENT_RULES.em;
  ELEMENT_RULES.span = ELEMENT_RULES.em;
  ELEMENT_RULES.bdi = ELEMENT_RULES.em;
  ELEMENT_RULES.kbd = ELEMENT_RULES.em;
  ELEMENT_RULES.rp = ELEMENT_RULES.em;
  ELEMENT_RULES.rt = ELEMENT_RULES.em;
  ELEMENT_RULES.samp = ELEMENT_RULES.em;
  ELEMENT_RULES.bdo = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['dir'])),
    elements: arrayToMap(PHRASING_CONTENT),
    text: true,
    cm: CONTENT_MODEL_PHRASING
  };
  ELEMENT_RULES.textarea = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat([
      'name', 'disabled', 'form', 'readonly', 'maxlength', 'autofocus',
      'required', 'placeholder', 'dirname', 'rows', 'wrap', 'cols'
    ])),
    text: true,
    cm: CONTENT_MODEL_TEXT
  };
  ELEMENT_RULES.output = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['name', 'form', 'for'])),
    elements: arrayToMap(PHRASING_CONTENT),
    text: true,
    cm: CONTENT_MODEL_PHRASING
  };
  ELEMENT_RULES.progress = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['value', 'max'])),
    elements: arrayToMap(PHRASING_CONTENT),
    text: true,
    cm: CONTENT_MODEL_PHRASING,
    ancestors: ['progress']
  };
  ELEMENT_RULES.ruby = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(PHRASING_CONTENT.concat(['rt', 'rp'])),
    text: true,
    cm: CONTENT_MODEL_PHRASING
  };

  ELEMENT_RULES.meter = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(
      'value|min|max|low|high|optimum'.split('|')
    )),
    elements: arrayToMap(PHRASING_CONTENT),
    text: true,
    cm: CONTENT_MODEL_PHRASING,
    ancestors: ['meter']
  };

  ELEMENT_RULES.input = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat([
        'type|name|disabled|form|maxlength|readonly|size|value|autocomplete',
        'autofocus|list|pattern|required|placeholder|dirname|checked|value',
        'formenctype|formaction|formmethod|formtarget|formnovalidate|multiple',
        'accept|height|width|alt|src|list|min|max|step'
      ].join('|').split('|'))),
    ancestors: A_OR_BUTTON
  };

  ELEMENT_RULES.datalist = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(PHRASING_CONTENT.concat(['option'])),
    text: true,
    cm: CONTENT_MODEL_PHRASING
  };
  ELEMENT_RULES.optgroup = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['label', 'disabled'])),
    elements: arrayToMap(['option'])
  };
  ELEMENT_RULES.option = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(
      ['label', 'disabled', 'value', 'selected']
    )),
    text: true
  };
  ELEMENT_RULES.select = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(
      'name|disabled|form|size|multiple|autofocus|required'.split('|')
    )),
    elements: arrayToMap(['optgroup', 'option']),
    ancestors: A_OR_BUTTON
  };

  ELEMENT_RULES.button = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(
      'name|disabled|formaction|autofocus|formenctype|formmethod|formtarget|formnovalidate'.split('|')
    )),
    elements: arrayToMap(PHRASING_CONTENT),
    text: true,
    cm: CONTENT_MODEL_PHRASING,
    ancestors: arrayToMap(A_OR_BUTTON)
  };

  ELEMENT_RULES.keygen = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(
      'challenge|keytype|autofocus|name|disabled|form'.split('|')
    )),
    ancestors: A_OR_BUTTON
  };

  ELEMENT_RULES.label = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['for', 'form'])),
    elements: arrayToMap(PHRASING_CONTENT),
    text: true,
    cm: CONTENT_MODEL_PHRASING,
    ancestors: ['label']
  };

  ELEMENT_RULES.caption = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(FLOW_CONTENT),
    text: true,
    cm: CONTENT_MODEL_FLOW
  };

  ELEMENT_RULES.base = {
    attributes: arrayToMap(['href', 'target'])
  };
  ELEMENT_RULES.link = {
    attributes: arrayToMap(['rel', 'href', 'type', 'hreflang', 'media', 'sizes'])
  };
  ELEMENT_RULES.meta = {
    attributes: arrayToMap(['charset', 'http-equiv', 'name', 'content']),
  };
  ELEMENT_RULES.param = {
    attributes: arrayToMap(['name', 'value']),
  };
  ELEMENT_RULES.br = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES)
  };
  ELEMENT_RULES.hr = ELEMENT_RULES.br;
  ELEMENT_RULES.wbr = ELEMENT_RULES.br;
  ELEMENT_RULES.img = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(
      ['src', 'alt', 'height', 'width', 'usemap', 'ismap']
    ))
  };
  ELEMENT_RULES.embed = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['src', 'type', 'height', 'width'])),
  };
  ELEMENT_RULES.command = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(
      'type|label|icon|disabled|radiogroup|checked'.split('|')
    ))
  };
  ELEMENT_RULES.menu = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['type', 'label'])),
    elemenets: arrayToMap(FLOW_CONTENT.concat(['li'])),
    cm: CONTENT_MODEL_FLOW
  };

  ELEMENT_RULES.map = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['name'])),
    elements: arrayToMap(FLOW_CONTENT),
    text: true,
    cm: CONTENT_MODEL_TRANSPARENT
  };
  ELEMENT_RULES.area = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(
      'href|target|rel|hreflang|media|type|shape|coords'.split('|')
    ))
  };

  ELEMENT_RULES.colgroup = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['span'])),
    elements: arrayToMap(['col'])
  };
  ELEMENT_RULES.col = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['span']))
  };


  ELEMENT_RULES.a = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(
      'href|target|rel|hreflang|media|type'.split('|')
    )),
    elements: arrayToMap(FLOW_CONTENT),
    text: true,
    cm: CONTENT_MODEL_TRANSPARENT,
    ancestors: A_OR_BUTTON
  };

  ELEMENT_RULES.del = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['cite', 'datetime'])),
    elements: arrayToMap(FLOW_CONTENT),
    text: true,
    cm: CONTENT_MODEL_TRANSPARENT
  };
  ELEMENT_RULES.ins = ELEMENT_RULES.del;

  ELEMENT_RULES.audio = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(
      'autoplay|preload|controls|loop|mediagroup|muted|src'.split('|')
    )),
    elements: arrayToMap(FLOW_CONTENT),
    cm: CONTENT_MODEL_TRANSPARENT
  };
  ELEMENT_RULES.canvas = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['width', 'height'])),
    elements: arrayToMap(FLOW_CONTENT),
    text: true,
    cm: CONTENT_MODEL_TRANSPARENT
  };
  ELEMENT_RULES.iframe = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(
      'src|srcdoc|name|width|height|sandbox|seamless'.split('|')
    )),
    text: true,
    ancestors: A_OR_BUTTON
  };
  ELEMENT_RULES.noscript = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(FLOW_CONTENT.concat(['link', 'meta', 'style'])),
    text: true,
    cm: CONTENT_MODEL_TRANSPARENT,
    ancestors: ['noscript']
  };
  ELEMENT_RULES.object = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(
      'data|type|height|width|usemap|name|form'.split('|')
    )),
    elements: arrayToMap(FLOW_CONTENT.concat(['param'])),
    text: true,
    cm: CONTENT_MODEL_TRANSPARENT,
    ancestors: A_OR_BUTTON
  };
  ELEMENT_RULES.script = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(
      'type|language|src|defer|async|charset'.split('|')
    )),
    text: true
  };


  ALL_ATTRIBUTES.forEach(function(name) {
    ATTRIBUTE_FACTORIES[name] = function(element, name, value) {
      checkAttributeAccess(element, name);
      element.attributes().set(name, value);
    };
  });

  ALL_ELEMENTS.forEach(function(name) {
    ELEMENT_FACTORIES[name] = function(parent) {
      if(parent) {
        checkElementAccess(parent, name);
      }
      return new HtmlElement(name, parent, ELEMENT_RULES[name].cm);
    };
  });

  VOID_ELEMENTS.forEach(function(name) {
    ELEMENT_FACTORIES[name] = function(parent) {
      if(parent) {
        checkElementAccess(parent, name);
      }
      return new HtmlElement(name, parent, ELEMENT_RULES[name].cm, true);
    };
  });

  FLOW_ELEMENTS.forEach(function(name) {
    ELEMENT_FACTORIES[name] = function(parent) {
      if(parent) {
        checkFlowElementAccess(parent, name);
      }
      return new HtmlElement(name, parent, ELEMENT_RULES[name].cm);
    };
  });


  function HtmlElement(type, parent, contentModel, selfClosing) {
    np.Element.call(this, type, parent);
    this.selfClosing = !!selfClosing;
    this.contentModel_ = contentModel;
  }
  np.inherits(HtmlElement, np.Element);

  HtmlElement.prototype.firstParent_ = function(predicate, ctx) {
    if(!predicate) {
      throw new Error(np.msg.argEmpty('predicate'));
    }

    ctx = ctx || this;

    var element = this;
    while(element && !predicate.call(ctx, element)) {
      element = element.parent;
    }
    return element;
  };

  function hasConcreteContentModel_(e) {
    return e.contentModel_ !== CONTENT_MODEL_TRANSPARENT;
  }
  HtmlElement.prototype.getContentModel_ = function() {
    var element = this.firstParent_(hasConcreteContentModel_);
    return element && element.contentModel_;
  };

  function HtmlBuilder() {
    this.root_ = null;
    this.head_ = null;
    this.body_ = null;

    this.current_ = null;
  }
  np.inherits(HtmlBuilder, np.ElementBuilder);

  HtmlBuilder.prototype.text = function(text) {
    checkTextAccess(this.current_);
    this.current_.append(new np.Text(text));
  };

  HtmlBuilder.prototype.up = function() {
    this.current_ = this.current_.up();
    return this;
  };

  ALL_ATTRIBUTES.reduce(function(builder, attrib) {
    builder[attrib] = function(value) {
      ATTRIBUTE_FACTORIES[attrib](this.current_, attrib, value);
      return this;
    };
    return builder;
  }, HtmlBuilder.prototype);

  ALL_ELEMENTS.reduce(function(builder, name) {
    var methodName = builder[name] ? name + 'Element' : name;
    builder[methodName] = function(attributes, text) {
      var element = this.current_,
          child = ELEMENT_FACTORIES[name](element),
          key;

      if(element) {
        element.append(child);
      }
      this.current_ = child;

      if(attributes) {
        for(key in attributes) {
          if(attributes.hasOwnProperty(key)) {
            ATTRIBUTE_FACTORIES[key](child, key, attributes[key]);
          }
        }
      }

      if(text) {
        this.text(text);
      }

      return this;
    };
    return builder;
  }, HtmlBuilder.prototype);

  function checkAttributeAccess(element, name) {
    var attributes = ELEMENT_RULES[element.type].attributes;
    if(!attributes || !attributes[name]) {
      throw new Error(np.msg.opInvalid(
        name + '()',
        '<' + element.type + '> cannot have attribute "' + name + '".',
        element.path()
      ));
    }
  }
  function checkTextAccess(element) {
    if(!ELEMENT_RULES[element.type].text) {
      throw new Error(np.msg.opInvalid(
        'text()',
        '<' + element.type + '> cannot have text content.',
        element.path()
      ));
    }
  }
  function checkElementAccess(element, childName) {
    var parentRule = ELEMENT_RULES[element.type],
        childRule = ELEMENT_RULES[childName];
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
            return childRule.ancestors.indexOf(e.type) >= 0;
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

    if(element.getContentModel_() === CONTENT_MODEL_PHRASING) {
      throw new Error(np.msg.opInvalid(
        name + '()',
        '<' + element.type + '> cannot have <' + childName + '> child elements ' +
        '(a is nested in an element that expects phrasing content only).',
        element.path()
      ));
    }
  }

  function arrayToMap(array) {
    return array.reduce(function(acc, item) { acc[item] = true; return acc; }, {});
  }

  HtmlBuilder.ELEMENT_RULES = ELEMENT_RULES;
  HtmlBuilder.ELEMENT_FACTORIES = ELEMENT_FACTORIES;
  HtmlBuilder.ATTRIBUTE_FACTORIES = ATTRIBUTE_FACTORIES;
  np.HtmlUnifiedBuilder = HtmlBuilder;

  // TODO: methods with special treatment:
  // HtmlBuilder.html() -> creates <head> and <body>
  // HtmlBuilder.title() -> does it have to accept attributes?

  // TODO: special methods for hyphenated attributes:
  // meta@http-equiv, form@accept-charset

  // TODO: missing elements...
  // title

  // TODO: ancestors should not be arrays, they should be maps, too

  // TODO: fix multiple arrayToMap with better system

  // TODO: ELEMENT_FACTORIES seem a bit obsolete now...

  // TODO: advanced rules: input@type=submit, etc...
  console.log('ready in: ' + (new Date() - t) + 'ms');

}(this.np));
