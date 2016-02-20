(function(np) {
  var HtmlElementBuilder = np.inherits(function(element, attributes, children) {
    np.ElementBuilder.call(this, element, attributes, children);
  }, np.ElementBuilder);

  HtmlElementBuilder.prototype.el_ = function(element) {
    //if(this.element_.contentModel_ === np.HtmlRules.CONTENT_MODEL_FLOW) {
    //  np.HtmlRules.checkFlowElementAccess(this.element_, element.type);
    //} else {
      np.HtmlRules.checkElementAccess(this.element_, element.type);
    //}

    np.ElementBuilder.prototype.el_.call(this, element);
  };
  HtmlElementBuilder.prototype.tx_ = function(text) {
    np.HtmlRules.checkTextAccess(this.element_);
    np.ElementBuilder.prototype.tx_.call(this, text);
  };
  HtmlElementBuilder.prototype.at_ = function(name, value) {
    np.HtmlRules.checkAttributeAccess(this.element_, name);
    np.ElementBuilder.prototype.at_.call(this, name, value);
  };

  HtmlElementBuilder.prototype.compile = function(compiler) {
    return compiler.compile(this.element_);
  };

  var HtmlBuilder = np.inherits(function() {}, np.DocumentBuilder);
  HtmlBuilder.prototype.el_ = function(name, attributes, children) {
    return new HtmlElementBuilder(new np.HtmlElement(name), attributes, children);
  };

  [].concat(
    np.HtmlRules.VOID_ELEMENTS,
    np.HtmlRules.TEXT_ONLY_ELEMENTS,
    np.HtmlRules.PHRASING_ELEMENTS,
    np.HtmlRules.TRANSPARENT_ELEMENTS,
    np.HtmlRules.FLOW_ELEMENTS,
    np.HtmlRules.OTHER_ELEMENTS
  ).forEach(function(name) {
    HtmlBuilder.prototype[name] = function(attributes, children) {
      return this.el(name, attributes, children);
    };
  });

  HtmlBuilder.prototype.discard = undefined;

  np.HtmlBuilder = HtmlBuilder;

  np.html = function(createFn) {
    var doc = new HtmlBuilder(),
        element = createFn && createFn(doc);
    return element || doc;
  };
}(this.np));
