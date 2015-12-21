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
      spyOn(base, 'attrib_');

      base.href('http://www.test.com');
      expect(base.attrib_).toHaveBeenCalledWith('href', 'http://www.test.com');
    });
  });

  describe('#target', function() {
    it('set the target attribute', function() {
      var base = new np.BaseBuilder();
      spyOn(base, 'attrib_');

      base.target('_blank');
      expect(base.attrib_).toHaveBeenCalledWith('target', '_blank');
    });
  });
});
