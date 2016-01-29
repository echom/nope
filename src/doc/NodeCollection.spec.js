describe('np.NodeCollection', function() {
  describe('#ctor', function() {
    it('initializes an empty collection', function() {
      var coll = new np.NodeCollection();
      expect(coll.toArray()).toEqual([]);
    });
    it('initializes a collection with the provided nodes', function() {
      var nodes = [np.mocks.Node(), np.mocks.Node()],
          coll = new np.NodeCollection(nodes);

      expect(coll.toArray()).toEqual(nodes);
    });
    it('initializes a readonly collection', function() {
      var coll = new np.NodeCollection(null, true),
          toFailAdd = function() { coll.add(np.mocks.Node()); },
          toFailRem = function() { coll.remove(np.mocks.Node()); }

      expect(toFailAdd).toThrowError(/InvalidOperation/);
      expect(toFailRem).toThrowError(/InvalidOperation/);
    });
  });

  describe('#add', function() {
    beforeEach(function() {
      this.initialNode = new np.Node();
      this.coll = new np.NodeCollection([this.initialNode]);
    });
    it('adds an element to the collection', function() {
      var addedNode = new np.Node();
      this.coll.add(addedNode);

      expect(this.coll.toArray()).toEqual([this.initialNode, addedNode]);
    });
    it('ignores nodes that are already in the collection', function() {
      this.coll.add(this.initialNode);

      expect(this.coll.toArray()).toEqual([this.initialNode]);
    });
    it('throws if the "node" argument is not provided', function() {
      var coll = this.coll,
          toFail = function() { coll.add(); };

      expect(toFail).toThrowError(/InvalidArgument/);
    });
    it('throws if the "node" argument is not a node', function() {
      var coll = this.coll,
          toFail = function() { coll.add({}); };

      expect(toFail).toThrowError(/InvalidArgument/);
    });
  });
  describe('#remove', function() {
    beforeEach(function() {
      this.initialNode = new np.Node();
      this.coll = new np.NodeCollection([this.initialNode]);
    });
    it('removes an element from the collection', function() {
      this.coll.remove(this.initialNode);

      expect(this.coll.toArray()).toEqual([]);
    });
    it('ignores nodes that are not in the collection', function() {
      this.coll.remove(new np.Node());

      expect(this.coll.toArray()).toEqual([this.initialNode]);
    });
    it('throws if the "node" argument is not provided', function() {
      var coll = this.coll,
          toFail = function() { coll.remove(); };

      expect(toFail).toThrowError(/InvalidArgument/);
    });
    it('throws if the "node" argument is not a node', function() {
      var coll = this.coll,
          toFail = function() { coll.remove({}); };

      expect(toFail).toThrowError(/InvalidArgument/);
    });
  });
  describe('#first', function() {
    beforeEach(function() {
      this.nodeA = new np.Node();
      this.nodeB = new np.Text();
      this.nodeC = new np.Element('x');
      this.coll = new np.NodeCollection([this.nodeA, this.nodeB, this.nodeC]);
    });
    it('returns the first element matching the predicate', function() {
      var node = this.coll.first(function(node) {
        return node instanceof np.Text;
      });

      expect(node).toBe(this.nodeB);
    });
    it('returns undefined if the predicate does not match any node', function() {
      var node = this.coll.first(function(node) {
        return (typeof node === 'string');
      });

      expect(node).toBe(undefined);
    });
    it('call the predicate in the optional context or itself', function() {
      var coll = this.coll,
          ctx = {};

      coll.first(function(node) {
        expect(this).toBe(coll);
      });

      coll.first(function(node) {
        expect(this).toBe(ctx);
      }, ctx);
    });
    it('returns the first item if the predicate is not provided', function() {
      var node = this.coll.first();

      expect(node).toBe(this.nodeA);
    });
  });
  describe('#where', function() {
    beforeEach(function() {
      this.nodeA = new np.Node();
      this.nodeB = new np.Text();
      this.nodeC = new np.Element('x');
      this.coll = new np.NodeCollection([this.nodeA, this.nodeB, this.nodeC]);
    });
    it('returns the all elements matching the predicate', function() {
      var nodes = this.coll.where(function(node) {
            return (node instanceof np.Text) || (node instanceof np.Element);
          });

      expect(nodes.toArray()).toEqual([this.nodeB, this.nodeC]);
    });
    it('returns a readonly collection', function() {
      var nodes = this.coll.where(function(node) {
          return (node instanceof np.Text) || (node instanceof np.Element);
        }),
        toFail = function() { nodes.add(new np.Node())};

      expect(toFail).toThrowError(/InvalidOperation/);
    });

    it('returns an empty collection if the predicate does not match any node', function() {
      var nodes = this.coll.where(function(node) {
        return (typeof node === 'string');
      });

      expect(nodes.toArray()).toEqual([]);
    });
    it('call the predicate in the optional context or itself', function() {
      var coll = this.coll,
          ctx = {};

      coll.where(function(node) {
        expect(this).toBe(coll);
      });

      coll.where(function(node) {
        expect(this).toBe(ctx);
      }, ctx);
    });
    it('throws if the predicate is not provided', function() {
      var coll = this.coll,
          toFail = function() { coll.where(); };

      expect(toFail).toThrowError(/InvalidArgument/);
    });
  });

  describe('#each', function() {
		beforeEach(function() {
      this.el1 = new np.Element('x');
      this.el2 = new np.Element('y');
      this.el3 = new np.Element('z');

			this.nodes = new np.NodeCollection([this.el1]);
			this.cb = jasmine.createSpy();
		});
		it('calls the callback function for each attribute', function() {
			this.nodes.add(this.el2);
			this.nodes.add(this.el3);

			this.nodes.each(this.cb);

			expect(this.cb).toHaveBeenCalledWith(this.el1);
			expect(this.cb).toHaveBeenCalledWith(this.el2);
			expect(this.cb).toHaveBeenCalledWith(this.el3);
		});
		it('does not call the callback function if attributes are empty', function() {
      this.nodes = new np.NodeCollection();
			this.nodes.each(this.cb);
			expect(this.cb).not.toHaveBeenCalled();
		});

		it('calls the callback with itself as the context by default', function() {
			this.nodes.each(this.cb);
			expect(this.cb.calls.mostRecent().object).toBe(this.nodes);
		});

		it('calls the callback with in the provided context', function() {
			var ctx = {};
			this.nodes.each(this.cb, ctx);
			expect(this.cb.calls.mostRecent().object).toBe(ctx);
		});

    it('throws if no callback is provided', function() {
			var nodes = this.nodes,
          toFail = function() { nodes.each(); };
			expect(toFail).toThrowError(/InvalidArgument/);
		});
	});
});
