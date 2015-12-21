describe('np.Element', function() {

  describe('#ctor', function() {

    it('creates an instance of element', function() {
      var el = new np.Element('type');
      expect(el instanceof np.Element).toBe(true);
    });

    it('has the type passed in as 1st argument', function() {
      var el = new np.Element('head');
      expect(el.type).toBe('head');
    });

    it('fails when no type is passed in as 1st argument', function(){
      var toThrow = function() { new np.Element(); };
      expect(toThrow).toThrowError(/InvalidArgument/);
    });

  });

  describe('#attributes', function() {
    it('returns an attributes collection', function() {
      var el = new np.Element('html'),
          attribs = el.attributes();

      expect(attribs).not.toBe(undefined);
      expect(attribs instanceof np.AttributeCollection).toBe(true);
    });
  });

  describe('#append', function() {

    it('adds an element to another element\'s child collection', function() {
      var el1 = new np.Element('html'),
          el2 = new np.Element('head'),
          el3 = new np.Element('body');
      spyOn(el1.children(), 'add');

      el1.append(el2);
      el1.append(el3);

      expect(el1.children().add).toHaveBeenCalledWith(el2);
      expect(el1.children().add).toHaveBeenCalledWith(el3);
    });

    it('assigns the parent element of elements being appended', function() {
      var el1 = new np.Element('html'),
          el2 = new np.Element('head'),
          el3 = new np.Element('body');
      el1.append(el2);
      el1.append(el3);

      expect(el2.parent).toBe(el1);
      expect(el3.parent).toBe(el1);
    });

    it('moves an already existing node to the end of the child list', function() {
      var el1 = new np.Element('html'),
          el2 = new np.Element('head'),
          el3 = new np.Element('body');

      el1.append(el2);
      el1.append(el3);
      el1.append(el2);

      expect(el1.children().toArray().indexOf(el2)).toBe(1);
      expect(el1.children().toArray().indexOf(el3)).toBe(0);
    });

    it('does not accept itself as appendee', function() {
      var el1 = new np.Element('html'),
          toThrow = function() { el1.append(el1); };

      expect(toThrow).toThrowError(/InvalidOperation/);
    });

    it('expects the "element" argument to be an np.Element', function() {
      var el1 = new np.Element('html'),
          toThrow = function() { el1.append({}); };

      expect(toThrow).toThrowError(/InvalidArgument/);
    });

    it('expects an argument to be supplied', function() {
      var el1 = new np.Element('html'),
          toThrow = function() { el1.append(); };

      expect(toThrow).toThrowError(/InvalidArgument/);
    });

  });

  describe('#nodeType_', function() {
    it('return "element"', function() {
      var el = new np.Element('x');
      expect(el.nodeType_).toBe('element');
    });
  });
  describe('#nodeIsElement_', function() {
    it('matches only elements', function() {
      var el = new np.Element('x'),
          nd = new np.Node();

      expect(np.Element.nodeIsElement_(el)).toBe(true);
      expect(np.Element.nodeIsElement_(nd)).toBe(false);
    });
  });
});
