(function(mocks) {
  mocks.ElementBuilder = function() {
    return {
			parent: null,
			element: null,
      up: jasmine.createSpy(),
      root: jasmine.createSpy(),
			attr: jasmine.createSpy()
    };
  };
}(np.mocks || (np.mocks = {})));
