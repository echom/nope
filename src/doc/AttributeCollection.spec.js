describe('np.AttributeCollection', function() {
	describe('#ctor', function() {
		it('creates an instance of attributes', function() {
      var att = new np.AttributeCollection();
      expect(att instanceof np.AttributeCollection).toBe(true);
    });
	});

	describe('#get', function() {
		it('gets an attribute value', function() {
			var att = new np.AttributeCollection();
			att.set('name', 'value');

			expect(att.get('name')).toBe('value');
			expect(att.get('other')).toBe(undefined);
		});
		it('expect a "name" argument', function() {
			var att = new np.AttributeCollection(),
					toThrow = function() { return att.get(); };

			expect(toThrow).toThrowError(/InvalidArgument/);
		});
	});

	describe('#set', function() {
		it('sets an attribute value', function() {
      var att = new np.AttributeCollection();
			att.set('name', 'value');

      expect(att.get('name')).toBe('value');
    });

		it('expects a "name" argument', function() {
			var att = new np.AttributeCollection(),
					toThrow = function() { return att.set(null, 'value'); };

			expect(toThrow).toThrowError(/InvalidArgument/);
		});
		it('expects a "value" argument', function() {
			var att = new np.AttributeCollection(),
					toThrow = function() { return att.set('name'); };

			expect(toThrow).toThrowError(/InvalidArgument/);
		});
	});

	describe('#has', function() {
		it('returns true if the attribute exists', function() {
      var att = new np.AttributeCollection();
			att.set('name', 'value');

      expect(att.has('name')).toBe(true);
    });
		it('returns false if the attribute exists', function() {
      var att = new np.AttributeCollection();

      expect(att.has('name')).toBe(false);
    });
	});

	// describe('#raw', function() {
	// 	it('gets the raw attribute map', function() {
  //     var att = new np.AttributeCollection();
	// 		att.set('name', 'value');
	//
  //     expect(att.raw()['name']).toBe('value');
  //   });
	// });

	describe('#remove', function() {
		it('removes an attribute with the given name', function() {
      var att = new np.AttributeCollection();
			att.set('name', 'value');
			att.remove('name');

      expect(att.has('name')).toBe(false);
    });
	});

	describe('#each', function() {
		beforeEach(function() {
			this.att = new np.AttributeCollection();
			this.cb = jasmine.createSpy();
		});
		it('calls the callback function for each attribute', function() {
			this.att.set('name0', 'value0');
			this.att.set('name1', 'value1');
			this.att.set('name2', 'value2');

			this.att.forEach(this.cb);

			expect(this.cb).toHaveBeenCalledWith('name0', jasmine.any(Object));
			expect(this.cb).toHaveBeenCalledWith('name1', jasmine.any(Object));
			expect(this.cb).toHaveBeenCalledWith('name2', jasmine.any(Object));
		});
		it('does not call the callback function if attributes are empty', function() {
			this.att.forEach(this.cb);
			expect(this.cb).not.toHaveBeenCalled();
		});

		it('calls the callback with itself as the context by default', function() {
			this.att.set('name0', 'value0');
			this.att.forEach(this.cb);
			expect(this.cb.calls.mostRecent().object).toBe(this.att);
		});

		it('calls the callback with in the provided context', function() {
			var ctx = {};
			this.att.set('name0', 'value0');
			this.att.forEach(this.cb, ctx);
			expect(this.cb.calls.mostRecent().object).toBe(ctx);
		});

		it('throws if no callback is provided', function() {
			var att = this.att,
          toFail = function() { att.forEach(); };
			expect(toFail).toThrowError(/InvalidArgument/);
		});
	});
});
