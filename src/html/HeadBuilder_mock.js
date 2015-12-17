(function(mocks) {
  mocks.HeadBuilder = function() {
    var b = mocks.ElementBuilder();
    
    b.charset = jasmine.createSpy('charset');
    b.meta = jasmine.createSpy('meta');
    b.httpEquiv = jasmine.createSpy('httpEquiv');

    return b;
  };
}(np.mocks || (np.mocks = {})));
