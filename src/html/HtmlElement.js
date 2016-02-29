(function(np) {
  var hasConcreteContentModel_ = function(e) {
    return e.contentModel_ !== np.HtmlRules.CONTENT_MODEL_TRANSPARENT;
  };

  var HtmlElement = np.inherits(function(name, attributes, children, parent) {
    np.Element.call(this, name, attributes, children, parent);

    var rule = np.HtmlRules.getRule(name);
    this.contentModel_ = (rule.cm);
    this.selfClosing = !(rule.elements || rule.text);
  }, np.Element);

  HtmlElement.prototype.el_ = function(element) {
    //if(this.element_.contentModel_ === np.HtmlRules.CONTENT_MODEL_FLOW) {
    //  np.HtmlRules.checkFlowElementAccess(this.element_, element.name);
    //} else {
      np.HtmlRules.checkElementAccess(this, element.name);
    //}

    np.Element.prototype.el_.call(this, element);
  };
  HtmlElement.prototype.tx_ = function(text) {
    np.HtmlRules.checkTextAccess(this);
    np.Element.prototype.tx_.call(this, text);
  };
  HtmlElement.prototype.at_ = function(name, value) {
    if(name.substr(0, 5) !== 'data-') {
      np.HtmlRules.checkAttributeAccess(this, name);
    }
    np.Element.prototype.at_.call(this, name, value);
  };

  HtmlElement.prototype.firstParent_ = function(predicate, ctx) {
    if(!predicate) {
      return this.parent;
    }

    ctx = ctx || this;

    var element = this;
    while(element && !predicate.call(ctx, element)) {
      element = element.parent;
    }
    return element;
  };

  HtmlElement.prototype.getContentModel = function() {
    var element = this.firstParent_(hasConcreteContentModel_);
    return element && element.contentModel_;
  };

  np.HtmlElement = HtmlElement;
}(this.np));
