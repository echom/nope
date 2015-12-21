describe('np.Node', function() {

  describe('#ctor', function() {

    it('creates an instance of node', function() {
      var node = new np.Node();
      expect(node instanceof np.Node).toBe(true);
    });

    it('has the parent passed in as an argument', function() {
      var parent = new np.Node();
      var node = new np.Node(parent);
      expect(node.parent).toBe(parent);
    });

    it('throws an error if the "node" argument is not a node', function() {
      var toThrow = function() { new np.Node({}); }
      expect(toThrow).toThrowError(/InvalidArgument/);
    });

  });

  describe('#root', function() {
    it('returns the root element of the tree', function() {
      var node1 = new np.Node(),
          node2 = new np.Node(node1),
          node3 = new np.Node();

      expect(node1.root()).toBe(node1);
      expect(node2.root()).toBe(node1);
      expect(node3.root()).toBe(node3);
    });
  });

  describe('#up', function() {

    it('returns the parent element', function() {
      var node1 = new np.Node(),
          node2 = new np.Node(node1);

      expect(node2.up()).toBe(node1);
      expect(node1.up()).toBeUndefined();
    });

  });

});
