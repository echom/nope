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

  HtmlBuilder.prototype.text = function(text) {
    rules.checkTextAccess(this.current_);
    this.current_.append(new np.Text(text));
  };

  HtmlBuilder.prototype.att = function(name, value) {
    var attributes = this.current_.attributes(),
        factory;
    if(np.isA(name, 'string') && (factory = attributeFactories[name])) {
      factory(this.current_, name, value);
    } else {
      Object.keys(name).forEach(key, function() { this.att(key, name[key]); });
    }
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
      var element = this.current_,
          key;

      this.current_ = elementFactories[name](element);

      if(element) {
        element.append(this.current_);
      }

      if(text) {
        this.text(text);
      }

      if(attributes) {
        this.att(attributes);
      }

      return this;
    };
  });

  np.HtmlUnifiedBuilder = HtmlBuilder;

  np.html = function(element, text, attributes) {
    var builder = new np.HtmlUnifiedBuilder();
    builder[element || 'html'](text, attributes);
  };

  // TODO: methods with special treatment:
  // HtmlBuilder.html() -> creates <head> and <body>

  // TODO: advanced rules: input@type=submit, etc...
}(this.np));
