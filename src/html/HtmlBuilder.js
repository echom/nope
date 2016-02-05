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
    np.ElementBuilder.call(this);
  }
  np.inherits(HtmlBuilder, np.ElementBuilder);

  HtmlBuilder.prototype.at_ = function(element, name, value) {
    var factory = attributeFactories[name];
    if(factory) {
      factory(element, name, value);
    } else {
      throw new Error(np.msg.argInvalid(
        'name',
        '"' + name + '" is not an allowed attribute name',
        element && element.path()
      ));
    }
  };
  HtmlBuilder.prototype.tx_ = function(element, text) {
    rules.checkTextAccess(element);
    np.ElementBuilder.prototype.tx_.call(this, element, text);
  };
  HtmlBuilder.prototype.el_ = function(parent, name, text, attributes) {
    var that = this,
        factory = elementFactories[name],
        element;
    if(factory) {
      element = factory(parent);
      if(text) {
        this.tx_(element, text);
      }
      if(attributes) {
        Object.keys(attributes).forEach(function(key) {
  				that.at_(element, key, attributes[key]);
  			});
      }

      if(parent) {
        parent.append(element);
      }
    } else {
      throw new Error(np.msg.argInvalid(
        'name',
        '"' + name + '" is not a valid HTML element name',
        parent && parent.path()
      ));
    }
    return element;
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
      return this.el(name, text, attributes);
    };
  });

  np.HtmlBuilder = HtmlBuilder;

  np.html = function(element, text, attributes) {
    var builder = new HtmlBuilder();
    return builder.el(element || 'html', text, attributes);
  };

  // TODO: methods with special treatment:
  // HtmlBuilder.html() -> creates <head> and <body>

  // TODO: advanced rules: input@type=submit, etc...
}(this.np));
