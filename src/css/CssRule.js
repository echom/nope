(function(np) {

  var CssRuleset = np.inherits(function(selectors, declarations, children) {
    np.Element.call(this, 'css', declarations, children);
    this.selectors = new CssSelectorSet(selectors);
  }, np.Element);

  CssRuleset.prototype.el_ = function(rule) {

  };

}(this.np));
