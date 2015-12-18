describe('np.BaseBuilder', function() {
  describe('#ctor', function() {
    it('creates an instance of BaseBuilder', function() {
      var base = new np.BaseBuilder();

      expect(base instanceof np.BaseBuilder).toBe(true);
    });
  });

  describe('#href', function() {
    it('sets the href attribute on the wrapped element', function() {
      var base = new np.BaseBuilder();
      spyOn(base, 'attrib');

      base.href('http://www.test.com');
      expect(base.attrib).toHaveBeenCalledWith('href', 'http://www.test.com');
    });
  });

  describe('#target', function() {
    it('set the target attribute', function() {
      var base = new np.BaseBuilder();
      spyOn(base, 'attrib');

      base.target('_blank');
      expect(base.attrib).toHaveBeenCalledWith('target', '_blank');
    });
  });
});
