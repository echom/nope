describe('np.Attribute', function() {
	describe('ctor', function() {
		it('creates an instance of attributes', function() {
      var att = new np.Attributes();
      expect(att instanceof np.Attributes).toBe(true);
    });
	});

	describe('get', function() {
		it('gets an attribute value', function() {
			var att = new np.Attributes();
			att.raw()['name'] = 'value';

			expect(att.get('name')).toBe('value');
			expect(att.get('other')).toBe(undefined);
		});
		it('expect a "name" argument', function() {
			var att = new np.Attributes(),
					toThrow = function() { return att.get(); };

			expect(toThrow).toThrowError(/InvalidArgument/);
		});
	});

	describe('set', function() {
		it('sets an attribute value', function() {
      var att = new np.Attributes();
			att.set('name', 'value');

      expect(att.get('name')).toBe('value');
    });

		it('expects a "name" argument', function() {
			var att = new np.Attributes(),
					toThrow = function() { return att.set(null, 'value'); };

			expect(toThrow).toThrowError(/InvalidArgument/);
		});
		it('expects a "value" argument', function() {
			var att = new np.Attributes(),
					toThrow = function() { return att.set('name'); };

			expect(toThrow).toThrowError(/InvalidArgument/);
		});
	});

	describe('raw', function() {
		it('gets the raw attribute map', function() {
      var att = new np.Attributes();
			att.set('name', 'value');

      //expect(att.raw()).toBe(jasmine.objectContaining({ name: 'value' }));
    });
	});

	describe('has', function() {
		it('returns true if the attribute exists', function() {
      var att = new np.Attributes();
			att.set('name', 'value');

      expect(att.has('name')).toBe(true);
    });
		it('returns false if the attribute exists', function() {
      var att = new np.Attributes();

      expect(att.has('name')).toBe(false);
    });
	});

	describe('raw', function() {
		it('gets the raw attribute map', function() {
      var att = new np.Attributes();
			att.set('name', 'value');

      expect(att.raw()['name']).toBe('value');
    });
	});

	describe('rem', function() {
		it('removes an attribute with the given name', function() {
      var att = new np.Attributes();
			att.set('name', 'value');
			att.rem('name');

      expect(att.has('name')).toBe(false);
    });
	});


});
