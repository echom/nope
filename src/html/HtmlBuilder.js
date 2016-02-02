(function(np) {
  'use strict';

  var rules = np.HtmlRules,
      elementFactories = {},
      attributeFactories = {};

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
    return e.contentModel_ !== rules.CONTENT_MODEL_TRANSPARENT;
  }
  HtmlElement.prototype.getContentModel = function() {
    var element = this.firstParent_(hasConcreteContentModel_);
    return element && element.contentModel_;
  };

  function HtmlBuilder() {
    this.current_ = null;
  }
  np.inherits(HtmlBuilder, np.ElementBuilder);

  HtmlBuilder.prototype.makeText_ = function(element, text) {
    rules.checkTextAccess(element);
    element.append(new np.Text(text));
  };
  HtmlBuilder.prototype.makeAttribute_ = function(element, name, value) {
    var that = this,
        attributes = element.attributes(),
        factory;
    if(np.isA(name, 'string') && (factory = attributeFactories[name])) {
      factory(element, name, value);
    } else if(np.isA(name, 'object')){
      Object.keys(name).forEach(function(key) {
        that.makeAttribute_(element, key, name[key]);
      });
    } else {
      throw new Error(np.msg.argInvalid(
        'name',
        '"' + name + '" is neither an object nor an allowed attribute name',
        element && element.path()
      ));
    }

  };
  HtmlBuilder.prototype.makeElement_ = function(parent, name, text, attributes) {
    var element = elementFactories[name](parent),
        key;

    if(parent) {
      parent.append(element);
    }

    if(text) {
      this.makeText_(element, text);
    }

    if(attributes) {
      this.makeAttribute_(element, attributes);
    }

    return element;
  };


  HtmlBuilder.prototype.text = function(text) {
    this.makeText_(this.current_, text);
  };
  HtmlBuilder.prototype.att = function(name, value) {
    this.makeAttribute_(this.current_, name, value);
  };
  HtmlBuilder.prototype.up = function() {
    this.current_ = this.current_.up();
    return this;
  };



  rules.ATTRIBUTES.forEach(function(name) {
    attributeFactories[name] = function(element, name, value) {
      rules.checkAttributeAccess(element, name);
      element.attributes().set(name, value);
    };
  });

  rules.TEXT_ONLY_ELEMENTS.forEach(function(name) {
    elementFactories[name] = function(parent) {
      if(parent) {
        rules.checkElementAccess(parent, name);
      }
      return new HtmlElement(name, parent, rules.getRule(name).cm);
    };
  });

  rules.PHRASING_ELEMENTS.forEach(function(name) {
    elementFactories[name] = function(parent) {
      if(parent) {
        rules.checkElementAccess(parent, name);
      }
      return new HtmlElement(name, parent, rules.getRule(name).cm);
    };
  });

  rules.TRANSPARENT_ELEMENTS.forEach(function(name) {
    elementFactories[name] = function(parent) {
      if(parent) {
        rules.checkElementAccess(parent, name);
      }
      return new HtmlElement(name, parent, rules.getRule(name).cm);
    };
  });

  rules.OTHER_ELEMENTS.forEach(function(name) {
    elementFactories[name] = function(parent) {
      if(parent) {
        rules.checkElementAccess(parent, name);
      }
      return new HtmlElement(name, parent, rules.getRule(name).cm);
    };
  });

  rules.VOID_ELEMENTS.forEach(function(name) {
    elementFactories[name] = function(parent) {
      if(parent) {
        rules.checkElementAccess(parent, name);
      }
      return new HtmlElement(name, parent, rules.getRule(name).cm, true);
    };
  });

  rules.FLOW_ELEMENTS.forEach(function(name) {
    elementFactories[name] = function(parent) {
      if(parent) {
        rules.checkFlowElementAccess(parent, name);
      }
      return new HtmlElement(name, parent, rules.getRule(name).cm);
    };
  });

  elementFactories.html = function() {
    var element = new HtmlElement('html');
    element.isDocument = true;
    element.head = elementFactories.head(element);
    return element;
  };
  elementFactories.head = function(parent) {
    var element;

    if(parent) {
      if(parent.type === "html" && parent.head) {
        return parent.head;
      } else {
        rules.checkElementAccess(parent, 'head');
      }
    }

    element = new HtmlElement('head', parent);
    element.charset = elementFactories.meta(element);
    element.charset.attributes().set('charset', 'utf-8');
    element.title = elementFactories.title(element);

    return element;
  };

  elementFactories.title = function(parent) {
    var element;

    if(parent) {
      if(parent.type === 'head' && parent.title) {
        return parent.title;
      } else {
        rules.checkElementAccess(parent, 'title');
      }
    }
    element = new HtmlElement('title', parent);

    return element;
  };


  [].concat(
    rules.VOID_ELEMENTS,
    rules.TEXT_ONLY_ELEMENTS,
    rules.PHRASING_ELEMENTS,
    rules.TRANSPARENT_ELEMENTS,
    rules.FLOW_ELEMENTS,
    rules.OTHER_ELEMENTS
  ).forEach(function(name) {
    var methodName = HtmlBuilder.prototype[name] ? name + 'Element' : name;
    HtmlBuilder.prototype[methodName] = function(text, attributes) {
      this.current_ = this.makeElement_(this.current_, name, text, attributes);
      return this;
    };
  });

  HtmlBuilder.prototype.title = function(text, attributes) {
    var current = this.current_;
    if(current && current.type === 'html') {
      current = current.head;
    }

    this.makeElement_(current, 'title', text, attributes);
    return this;
  };


  np.HtmlBuilder = HtmlBuilder;

  np.html = function(element, text, attributes) {
    var builder = new np.HtmlBuilder();
    return builder[element || 'html'](text, attributes);
  };

  // TODO: methods with special treatment:
  // HtmlBuilder.html() -> creates <head> and <body>

  // TODO: advanced rules: input@type=submit, etc...
}(this.np));
