(function(mocks) {
  mocks.Element = function(name) {
    var el = np.mocks.Node();

    el.name = name;
    el.append = jasmine.createSpy('append');
    el.attributes = jasmine.createSpy('attributes');
    el.children = jasmine.createSpy('attributes');
    el.path = jasmine.createSpy('path').and.returnValue('mocked');

    return el;
  };
}(np.mocks || (np.mocks = {})));
