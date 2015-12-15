(function(mocks) {
  mocks.Element = function(type) {
    return {
      up: jasmine.createSpy(),
      root: jasmine.createSpy(),
      append: jasmine.createSpy(),
      attributes: jasmine.createSpy(),
      type: type,
      children: []
    };
  };
}(np.mocks || (np.mocks = {})));
