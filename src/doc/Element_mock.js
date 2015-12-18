(function(mocks) {
  mocks.Element = function(type) {
    var el = np.mocks.Node();

    el.type = type;
    el.append = jasmine.createSpy('append');
    el.attributes = jasmine.createSpy('attributes');
    el.children = [];

    return el;
  };
}(np.mocks || (np.mocks = {})));
