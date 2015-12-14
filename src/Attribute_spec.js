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
	});

	describe('set', function() {
		it('sets an attribute value', function() {
      var att = new np.Attributes();
			att.set('name', 'value');

      expect(att.get('name')).toBe('value');
    });
	});

	describe('raw', function() {
		it('gets the raw attribute map', function() {
      var att = new np.Attributes();
			att.set('name', 'value');

      //expect(att.raw()).toBe(jasmine.objectContaining({ name: 'value' }));
    });
	});
});
