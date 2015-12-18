(function(mocks) {
  mocks.Attributes = function() {
    return {
      get: jasmine.createSpy(),
      set: jasmine.createSpy(),
      rem: jasmine.createSpy(),
      has: jasmine.createSpy(),
      raw: jasmine.createSpy()
    };
  };
}(np.mocks || (np.mocks = {})));
