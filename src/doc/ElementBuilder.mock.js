(function(mocks) {
  mocks.ElementBuilder = function(parentBuilder, element) {
    return {
			parent: parentBuilder,
			element: element,
      up: jasmine.createSpy(),
      root: jasmine.createSpy(),
			attrib: jasmine.createSpy(),
      text: jasmine.createSpy(),
      compile: jasmine.createSpy()
    };
  };
}(np.mocks || (np.mocks = {})));
