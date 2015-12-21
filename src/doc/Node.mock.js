(function(mocks) {
  mocks.Node = function(type) {
    return {
      up: jasmine.createSpy('up'),
      root: jasmine.createSpy('root')
    };
  };
}(np.mocks || (np.mocks = {})));
