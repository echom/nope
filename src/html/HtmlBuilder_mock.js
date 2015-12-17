(function(mocks) {
  mocks.HeadBuilder = function() {
    var b = mocks.ElementBuilder();

    b.charset = jasmine.createSpy('charset');
    b.meta = jasmine.createSpy('meta');
    b.httpEquiv = jasmine.createSpy('httpEquiv');
    b.body = jasmine.createSpy('body');
    b.head = jasmine.createSpy('head');

    return b;
  };
}(np.mocks || (np.mocks = {})));
