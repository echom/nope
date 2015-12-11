describe('np.ElementBuilder', function() {
  var mockElement;

  beforeEach(function() {
    mockElement = np.mocks.Element();
  });

  describe('#ctor', function() {
    it('should create an instance of ElementBuilder', function() {
      var builder = new np.ElementBuilder(null, mockElement);

      expect(builder instanceof np.ElementBuilder).toBe(true);
    });
    it('should set its parent builder', function() {
      var builder1 = new np.ElementBuilder(null, mockElement),
          builder2 = new np.ElementBuilder(builder1, np.mocks.Element());

      expect(builder2.parent).toBe(builder1);
    });
    it('should append set its element', function() {
      var builder = new np.ElementBuilder(null, mockElement);
      expect(builder.element).toBe(mockElement);
    });
  });
});
