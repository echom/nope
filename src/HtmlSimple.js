(function(np) {
  var CONTENT_MODEL_FLOW = 'flow',
      CONTENT_MODEL_PHRASING = 'phrasing',
      CONTENT_MODEL_TRANSPARENT = 'transparent',
      GLOBAL_ATTRIBUTES =
        'accesskey|class|contenteditable|dir|hidden|id|lang|spellcheck'
        .split('|'),
      ALL_ATTRIBUTES = [
          GLOBAL_ATTRIBUTES,
          'href|target|rel|hreflang|media|type|target|src|type|height|width',
          'cite|datetime|sizes|name|value|start|reversed|charset|http|content',
          'charset|http-equiv|data|form|defer|async|scoped'
        ].join('|').split('|'),
      VOID_ELEMENTS = [
          'base|link|meta|param|br|hr|wbr|img|area|col|command|embed|keygen',
          'source|track|input|head'
        ].join('|').split('|'),
      TEXT_ONLY_ELEMENTS = 'style|script|textarea'.split('|'),
      PHRASING_ELEMENTS = [
          'em|strong|small|mark|abbr|dfn|i|b|s|u|code|var|sup|sub|q|cite|span',
          'bdo|bdi'
        ].join('|').split('|'),
      FLOW_ELEMENTS = [
          'p|pre|ul|ol|dl|div|h1|h2|h3|h4|h5|h6|hgroup|address|blockquote',
          'section|nav|article|aside|header|footer|figure|table|form|fieldset',
          'menu|canvas|details'
        ].join('|').split('|'),
      TRANSPARENT_ELEMENTS = [
          'a|embed|object|ins|del|map|noscript|video|audio'
        ].split('|'),
      ALL_ELEMENTS = [
          VOID_ELEMENTS,
          TEXT_ONLY_ELEMENTS,
          PHRASING_ELEMENTS,
          CONTENT_MODEL_TRANSPARENT,
          FLOW_ELEMENTS
        ].join('|').split('|'),
      ELEMENT_RULES = {},
      ELEMENT_FACTORIES = {},
      ATTRIBUTE_FACTORIES = {};

  //Flow elements with phrasing content
  ELEMENT_RULES.p = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(PHRASING_ELEMENTS.concat(CONTENT_MODEL_TRANSPARENT)),
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

  ELEMENT_RULES.div = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(['style']
        .concat(PHRASING_ELEMENTS)
        .concat(CONTENT_MODEL_TRANSPARENT)
        .concat(FLOW_ELEMENTS)
    ),
    text: true,
    cm: CONTENT_MODEL_FLOW
  };
  ELEMENT_RULES.article = ELEMENT_RULES.div;
  ELEMENT_RULES.aside = ELEMENT_RULES.div;
  ELEMENT_RULES.section = ELEMENT_RULES.div;

  ELEMENT_RULES.nav = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap([]
        .concat(PHRASING_ELEMENTS)
        .concat(CONTENT_MODEL_TRANSPARENT)
        .concat(FLOW_ELEMENTS)
    ),
    text: true,
    cm: CONTENT_MODEL_FLOW
    ancestors: arrayToMap(['address']);
  };
  ELEMENT_RULES.address = ELEMENT_RULES.nav;

  ELEMENT_RULES.header = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap([]
        .concat(PHRASING_ELEMENTS)
        .concat(CONTENT_MODEL_TRANSPARENT)
        .concat(FLOW_ELEMENTS)
    ),
    text: true,
    cm: CONTENT_MODEL_FLOW,
    ancestors: arrayToMap(['address', 'header', 'footer']);
  };
  ELEMENT_RULES.footer = ELEMENT_RULES.header;

  ELEMENT_RULES.ul = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(['ul']),
    text: false
  };
  ELEMENT_RULES.ol = ELEMENT_RULES.ul;

  ELEMENT_RULES.li = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat('value')),
    elements: arrayToMap([]
        .concat(PHRASING_ELEMENTS)
        .concat(CONTENT_MODEL_TRANSPARENT)
        .concat(FLOW_ELEMENTS)
    ),
    cm: CONTENT_MODEL_FLOW
    text: true
  }

  // Phrasing elements
  ELEMENT_RULES.em = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES),
    elements: arrayToMap(PHRASING_ELEMENTS.concat(CONTENT_MODEL_TRANSPARENT)),
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
  ELEMENT_RULES.bdo = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['dir'])),
    elements: arrayToMap(PHRASING_ELEMENTS),
    text: true
  };
  ELEMENT_RULES.textarea = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat([
      'name', 'disabled', 'form', 'readonly', 'maxlength', 'autofocus',
      'required', 'placeholder', 'dirname', 'rows', 'wrap', 'cols'
    ])),
    text: true
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
  ELEMENT_RULES.wbr = ELEMENT_RULES.wbr;
  ELEMENT_RULES.img = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['src', 'alt', 'height', 'width', 'usemap', 'ismap']))
  };
  ELEMENT_RULES.embed = {
    attributes: arrayToMap(GLOBAL_ATTRIBUTES.concat(['src', 'type', 'height', 'width']))
  };
  //TODO: ELEMENT_RULES.area
  //TODO: ELEMENT_RULES.col
  //TODO: ELEMENT_RULES.command
  //TODO: ELEMENT_RULES.keygen
  //TODO: ELEMENT_RULES.source
  //TODO: ELEMENT_RULES.track
  //TODO: ELEMENT_RULES.input

  ALL_ATTRIBUTES.forEach(function(name) {
    ATTRIBUTE_FACTORIES[name] = function(element, name, value) {
      if(!attributeAllowed(element.name, name)) {

      }
      element.attributes().set(name, value);
    }
  });

  ALL_ELEMENTS.forEach(function(name) {
    ELEMENT_FACTORIES[name] = function(builder, attributes, text) {
      var parent = builder.current_,
          element,
          key;
      if(!elementAllowed(parent.type, name)) {
        throw new Error(np.msg.opInvalid(
          name + '()',
          '<' + name + '> cannot be nested in <' + builder.current_.type + '>.',
          builder.current_.path()
        );
      }

      element = np.Element(name);
      if(attributes) {
        for(key in attributes) {
          if(attributes.hasOwnProperty(key)) {
            ATTRIBUTE_FACTORIES[key](element, key, attributes[key]);
          }
        }
      }
      if(text) {
        builder.text(text);
      }
    }
  });


  function HtmlSimpleBuilder() {
    this.root_ = null;
    this.head_ = null;
    this.body_ = null;

    this.current_ = null;
  };
  np.inherits(HtmlSimpleBuilder, np.ElementBuilder);

  HtmlSimpleBuilder.prototype.text = function(text) {
    this.checkTextAccess(this.current_);
    this.current_.append(new np.Text(text));
  };

  HtmlSimpleBuilder.prototype.up = function() {
    this.current_ = this.current_.up();
    return this;
  };

  ALL_ATTRIBUTES.reduce(function(builder, attrib) {
    builder[attrib] = function(name, value) {
      ATTRIBUTE_FACTORIES[attrib](this.current_, name, value);
    };
    return this;
  }, HtmlSimpleBuilder.prototype);

  ALL_ELEMENTS.reduce(function(builder, name) {
    var methodName = builder[name] ? name + 'Element' : name;
    builder[methodName] = function(name, attributes, text) {
      ELEMENT_FACTORIES[name](this, attributes, text);
    };
    return this;
  }, HtmlSimpleBuilder.prototype);

  function checkAttributeAccess = function(element, name) {
    var attributes = ELEMENTS[element.type].attributes;
    if(!attributes || !attributes[name]) {
      throw new Error(np.msg.opInvalid(
        name + '()',
        '<' + element.type + '> cannot have attribute "' + name + '".',
        element.path()
      );
    }
  };
  function checkTextAccess = function(element) {
    if(!ELEMENTS[element.type].text) {
      throw new Error(np.msg.opInvalid(
        'text()',
        '<' + element.type + '> cannot have text content.',
        element.path()
      );
    }
  }
  function checkElementAccess = function(element, childName) {

  };


  function textAllowed = function(elementName) {
    return !!;
  };
  function elementAllowed = function(elementName, childName) {
    return !!ELEMENTS[elementName].elements[childName];
  };
  function contentModelAllowed = function(element, childName) {
    var cm = ELEMENT_RULES[childName].cm,
        parent = element;
    if(cm === CONTENT_MODEL_FLOW) {
      while(parent) {
        if()
      }
    };
  };

  //TODO: transparent content model

  function arrayToMap(array) {
    return array.reduce(function(acc, item) { acc[item] = true; return acc; }, {});
  };
}(this.np))
