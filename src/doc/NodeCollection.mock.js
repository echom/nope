(function(mocks) {
  mocks.NodeCollection = function() {
    return {
      add: jasmine.createSpy(),
      remove: jasmine.createSpy(),
      first: jasmine.createSpy(),
      where: jasmine.createSpy()
    };
  };
}(np.mocks || (np.mocks = {})));
