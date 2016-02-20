(function(np) {
  var hasConcreteContentModel_ = function(e) {
    return e.contentModel_ !== np.HtmlRules.CONTENT_MODEL_TRANSPARENT;
  };

  var HtmlElement = np.inherits(function(type, parent) {
    np.Element.call(this, type, parent);

    var rule = np.HtmlRules.getRule(type);
    this.contentModel_ = (rule.cm);
    this.selfClosing = !(rule.elements || rule.text);
  }, np.Element);

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
