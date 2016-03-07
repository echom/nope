(function(np) {
  var DocText = np.inherits(function(text) {
    this.inv_ = new np.Invalidation();
    this.text_ = text;
  }, np.Leaf);


  Object.defineProperty(DocText.prototype, 'empty', {
    get: function() { return !this.text_; }
  });


  var DocElement = np.inherits(function(name, attributes, children) {
    this.attributes_ = {};

    if(attributes) {
      this.set(attributes);
    }

    if(children) {
      this.add(children);
    }
  }, np.Node);




  DocElement.prototype.type = 'element';
  DocElement.isElement = function(obj) { return obj.type === 'element'; };






}(this.np));
