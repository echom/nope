xdescribe('np.ElementBuilder', function() {
  var mockElement;

  beforeEach(function() {
    mockElement = np.mocks.Element();
  });

  describe('#ctor', function() {
    it('creates an instance of ElementBuilder', function() {
      var builder = new np.ElementBuilder(mockElement);

      expect(builder instanceof np.ElementBuilder).toBe(true);
    });

    it('should require an element', function() {
      var toThrow = function() { return new np.ElementBuilder(null, null); };
      expect(toThrow).toThrowError(/InvalidArgument/);
    });
  });

  describe('#current', function() {
    it('returns the root of the tree', function() {
      var root = np.mocks.Element(),
          builder = new np.ElementBuilder();

      expect(builder1.root()).toBe(root);
    });
  });

  describe('#root', function() {
    it('returns the root of the tree', function() {
      var root = np.mocks.Element(),
          builder = new np.ElementBuilder();

      expect(builder1.root()).toBe(root);
    });
  });

  describe('#up', function() {
    it('sets the current element to be the current element\'s parent', function() {
      var builder = new np.ElementBuilder();


      expect(builder2.up()).toBe(builder1);
      expect(builder1.up()).toBeUndefined();
    });
  });

  describe('#compile', function() {
    it('calls the provided compiler', function() {
      var element = np.mocks.Element(),
          compilerMock = { compile: jasmine.createSpy('compile') },
          builder = new np.ElementBuilder(null, element);

      builder.compile(compilerMock);

      expect(compilerMock.compile).toHaveBeenCalledWith(element);
    });
  });
});
