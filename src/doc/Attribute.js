(function(np) {
  var Attribute = function(name, value, owner) {
    this.inv_ = new np.Invalidation(owner && owner.inv());
    this.name = name;
    this.set(value);
  };

  Attribute.prototype.set = function(value) {
    this.value_ = value;
    this.inv_.set();
  };

  Attribute.prototype.get = function() {
    return this.value_;
  };

  Attribute.prototype.inv = function() {
    return this.inv_;
  };

  np.Attribute = Attribute;
}(this.np));
