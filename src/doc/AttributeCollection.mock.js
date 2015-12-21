(function(mocks) {
  mocks.AttributeCollection = function() {
    return {
      get: jasmine.createSpy(),
      set: jasmine.createSpy(),
      remove: jasmine.createSpy(),
      has: jasmine.createSpy(),
      raw: jasmine.createSpy()
    };
  };
}(np.mocks || (np.mocks = {})));
