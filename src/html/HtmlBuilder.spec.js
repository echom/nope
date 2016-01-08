describe('np.HtmlBuilder', function() {
  beforeEach(function() {
    this.builder = new np.HtmlBuilder(null, 'unit');
  });

  describe('#ctor', function() {
    it('creates an instance of HtmlBaseBuilder', function() {
      expect(this.builder instanceof np.HtmlBuilder).toBe(true);
    });

    it('initializes an element with the given type', function() {
      expect(this.builder.element.type).toBe('unit');
    });

    it('throws an error when the type argument is not provided', function() {
      var toThrow = function() { new np.HtmlBuilder(null); };
      expect(toThrow).toThrowError(/InvalidArgument/);
    });
  });

  describe('global attributes', function() {
    it('exposes the global attributes', function() {
      //expect(this.builder.)
    });
  });
});
