(function(np) {
  var Invalidation = function(parent) {
    this.time = np.now();
    this.name = name;
    this.parent = parent || null;
  };

  Invalidation.prototype.get = function() {
    return this.time;
  };

  Invalidation.prototype.set = function() {
    this.time = np.now();
    if(this.parent) {
      this.parent.set();
    }
  };

  Invalidation.prototype.check = function(timestamp) {
    return !timestamp || this.time > timestamp;
  };

  np.Invalidation = Invalidation;


  // var Invalidations = function(parent) {
  //   this.invalidations = {};
  //   this.any = new Invalidation(parent);
  // };
  //
  // Invalidations.prototype.get = function(key) {
  //   return this.invalidations[key].get();
  // };
  //
  // Invalidations.prototype.set = function(key) {
  //   var invalidations = this.invalidations,
  //       invalidation = invalidations[key];
  //   if(!invalidation) {
  //     invalidations[key] = invalidation = new Invalidation(this.any);
  //   }
  //   invalidation.set();
  // };
  //
  // Invalidations.prototype.check = function(key, timestamp) {
  //   return this.invalidations[key].check(timestamp);
  // };
  //
  // Invalidations.prototype.checkAny = function(timestamp) {
  //   return this.any.check(timestamp);
  // };
  //
  // Invalidations.prototype.keys = function() {
  //   return Object.keys(this.invalidations);
  // };
  // np.Invalidations = Invalidations;

}(this.np));
