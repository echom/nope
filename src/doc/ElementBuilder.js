(function(np) {
  var DocumentBuilder = function() {};
  DocumentBuilder.prototype.el_ = function(name, attributes, children) {
    return new Element(new np.Element(name, attributes, children));
  };
  DocumentBuilder.prototype.el = function(name, attributes, children) {
    //TODO: tighten + meaningful error messages
    if(!np.isA(attributes, 'object') && !children) {
      children = attributes;
      attributes = undefined;
    }

    return this.el_(name, attributes, children);
  };

  np.DocumentBuilder = DocumentBuilder;

  np.doc = function(createFn) {
    var doc = new DocumentBuilder(),
        element = createFn && createFn(doc);
    return element || doc;
  };
}(this.np));
