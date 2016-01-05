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

  describe('#root', function() {
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

  describe('#compile', function() {
    it('calls the provided compiler', function() {
      var element = np.mocks.Element(),
          compilerMock = { compile: jasmine.createSpy('compile') },
          builder = new np.ElementBuilder(null, element);

      builder.compile(compilerMock);

      expect(compilerMock.compile).toHaveBeenCalledWith(element);
    });
  });

  describe('.addAttValueAccess_', function() {
    beforeEach(function() {
      var fakeElement = np.mocks.Element(),
          fakeAttributes = np.mocks.AttributeCollection(),
          FakeBuilder = function() { this.element = fakeElement; },
          fakeBuilder = new FakeBuilder();

      fakeElement.attributes.and.returnValue(fakeAttributes);

      this.fakeElement = fakeElement;
      this.fakeAttributes = fakeAttributes;
      this.FakeBuilder = FakeBuilder;
      this.fakeBuilder = fakeBuilder;
    });

    it('adds an attribute setter to the provided constructor', function() {
      expect(this.FakeBuilder.prototype.hello).toBe(undefined);
      np.ElementBuilder.addAttValueAccess_(this.FakeBuilder, 'hello');

      expect(this.FakeBuilder.prototype.hello).not.toBe(undefined);
    });
    it('adds a function that expects an argument', function() {
      np.ElementBuilder.addAttValueAccess_(this.FakeBuilder, 'hello');
      var fakeBuilder = this.fakeBuilder,
          toFail = function() { fakeBuilder.hello(); };

      expect(toFail).toThrowError(/InvalidArgument/);
    });
    it('adds a function which will set the appropriate attribute', function() {
      np.ElementBuilder.addAttValueAccess_(this.FakeBuilder, 'hello');
      this.fakeBuilder.hello('world');

      expect(this.fakeAttributes.set).toHaveBeenCalledWith('hello', 'world');
    });
  });
  describe('.addAttBoolAccess_', function() {
    beforeEach(function() {
      var fakeElement = np.mocks.Element(),
          fakeAttributes = np.mocks.AttributeCollection(),
          FakeBuilder = function() { this.element = fakeElement; },
          fakeBuilder = new FakeBuilder();

      fakeElement.attributes.and.returnValue(fakeAttributes);

      this.fakeElement = fakeElement;
      this.fakeAttributes = fakeAttributes;
      this.FakeBuilder = FakeBuilder;
      this.fakeBuilder = fakeBuilder;
    });

    it('adds an attribute setter to the provided constructor', function() {
      expect(this.FakeBuilder.prototype.hello).toBe(undefined);
      np.ElementBuilder.addAttBoolAccess_(this.FakeBuilder, 'hello');

      expect(this.FakeBuilder.prototype.hello).not.toBe(undefined);
    });
    it('adds a function that expects an argument', function() {
      np.ElementBuilder.addAttBoolAccess_(this.FakeBuilder, 'hello');
      var fakeBuilder = this.fakeBuilder,
          toFail = function() { fakeBuilder.hello(); };

      expect(toFail).toThrowError(/InvalidArgument/);
    });
    it('adds a function which will set the appropriate attribute', function() {
      np.ElementBuilder.addAttBoolAccess_(this.FakeBuilder, 'hello');
      this.fakeBuilder.hello(true);

      expect(this.fakeAttributes.set).toHaveBeenCalledWith('hello', 'hello');
    });
    it('adds a function which will remove the appropriate attribute', function() {
      np.ElementBuilder.addAttBoolAccess_(this.FakeBuilder, 'hello');

      this.fakeBuilder.hello(true);
      this.fakeBuilder.hello(false);

      expect(this.fakeAttributes.remove).toHaveBeenCalledWith('hello');
    });
  });

  describe('.addTextAccess_', function() {
    beforeEach(function() {
      var fakeElement = np.mocks.Element(),
          fakeChildren = np.mocks.NodeCollection(),
          FakeBuilder = function() { this.element = fakeElement; },
          fakeBuilder = new FakeBuilder();

      fakeElement.children.and.returnValue(fakeChildren);

      this.fakeElement = fakeElement;
      this.FakeBuilder = FakeBuilder;
      this.fakeBuilder = fakeBuilder;
    });

    it('adds a text setter to the provided constructor', function() {
      expect(this.FakeBuilder.prototype.text).toBe(undefined);
      np.ElementBuilder.addTextAccess_(this.FakeBuilder);

      expect(this.FakeBuilder.prototype.text).not.toBe(undefined);
    });
    it('adds a function which will append a text node', function() {
      np.ElementBuilder.addTextAccess_(this.FakeBuilder);
      this.fakeBuilder.text('world');

      expect(this.fakeElement.append).toHaveBeenCalledWith(jasmine.any(np.Text));
      expect(this.fakeElement.append).toHaveBeenCalledWith(jasmine.objectContaining({
        content: 'world'
      }));
    });
    it('adds a function which will return the builder', function() {
      np.ElementBuilder.addTextAccess_(this.FakeBuilder);
      expect(this.fakeBuilder.text('world')).toBe(this.fakeBuilder);
    });
  });
});
