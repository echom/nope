describe('np.ElementBuilder', function() {
  var mockElement;

  beforeEach(function() {
    mockElement = np.mocks.Element();
  });

  describe('#ctor', function() {
    it('creates an instance of ElementBuilder', function() {
      var builder = new np.ElementBuilder(null, mockElement);

      expect(builder instanceof np.ElementBuilder).toBe(true);
    });
    it('sets its parent builder', function() {
      var builder1 = new np.ElementBuilder(null, mockElement),
          builder2 = new np.ElementBuilder(builder1, np.mocks.Element());

      expect(builder2.parent).toBe(builder1);
    });
    it('sets its element', function() {
      var builder = new np.ElementBuilder(null, mockElement);
      expect(builder.element).toBe(mockElement);
    });
    it('appends its element to the parent\'s element', function() {
      var parent = { element: np.mocks.Element() },
          builder = new np.ElementBuilder(parent, mockElement);
      expect(parent.element.append).toHaveBeenCalledWith(mockElement);
    });

    it('should require an element', function() {
      var toThrow = function() { return new np.ElementBuilder(null, null); };
      expect(toThrow).toThrowError(/InvalidArgument/);
    });
  });

  describe('root', function() {
    it('returns the root builder of the tree', function() {
      var builder1 = new np.ElementBuilder(null, np.mocks.Element()),
          builder2 = new np.ElementBuilder(builder1, np.mocks.Element()),
          builder3 = new np.ElementBuilder(builder2, np.mocks.Element());

      expect(builder1.root()).toBe(builder1);
      expect(builder2.root()).toBe(builder1);
      expect(builder3.root()).toBe(builder1);
    });
  });

  describe('#up', function() {
    it('returns the parent builder', function() {
      var builder1 = new np.ElementBuilder(null, np.mocks.Element()),
          builder2 = new np.ElementBuilder(builder1, np.mocks.Element());

      expect(builder2.up()).toBe(builder1);
      expect(builder1.up()).toBeUndefined();
    });
  });

  describe('#attrib', function() {
    it('sets and attribute on the element', function() {
      var element = np.mocks.Element(),
          attributes = np.mocks.Attributes(),
          builder = new np.ElementBuilder(null, element);

      element.attributes.and.returnValue(attributes);

      builder.attrib('name', 'value');

      expect(element.attributes).toHaveBeenCalled();
      expect(attributes.set).toHaveBeenCalledWith('name', 'value');
    });
  });
});
