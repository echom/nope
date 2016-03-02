(function(np) {
  var HtmlBuilder = np.inherits(function() {}, np.DocumentBuilder);
  HtmlBuilder.prototype.el_ = function(name, attributes, children) {
    return new np.HtmlElement(name, attributes, children);
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

  np.HtmlBuilder = HtmlBuilder;

  np.html = function(createFn) {
    var builder = new HtmlBuilder(),
        element = createFn && createFn(builder);
    return element || builder;
  };
}(this.np));
