(function(mocks) {
  mocks.ElementBuilder = function(parentBuilder, element) {
    return {
			parent: parentBuilder,
			element: element,
      up: jasmine.createSpy(),
      current: jasmine.createSpy(),
      root: jasmine.createSpy(),
      el: jasmine.createSpy(),
			att: jasmine.createSpy(),
      text: jasmine.createSpy(),
      save: jasmine.createSpy(),
      load: jasmine.createSpy(),
      compile: jasmine.createSpy()
    };
  };
}(np.mocks || (np.mocks = {})));
