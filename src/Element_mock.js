(function(mocks) {
  mocks.Element = function() {
    return {
      up: jasmine.createSpy(),
      root: jasmine.createSpy(),
      append: jasmine.createSpy(),
      children: [],
      attributes: {}
    };
  };
}(np.mocks || (np.mocks = {})));
