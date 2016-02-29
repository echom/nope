(function(np) {
  var Attribute = function(name, value, owner) {
    this.inv_ = new np.Invalidation();
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

  Attribute.prototype.invalid = function(timestamp) {
    return this.inv_.check(timestamp);
  };

  np.Attribute = Attribute;
}(this.np));
