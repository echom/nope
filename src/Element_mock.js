np.mock.Element = function() {
  return {
    up: jasmine.createSpy(),
    root: jasmine.createSpy(),
    append: jasmine.createSpy(),
    children: [],
    attributes: {}
  };
};
