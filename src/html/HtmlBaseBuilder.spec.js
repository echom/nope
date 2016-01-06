describe('np.HtmlBaseBuilder', function() {
  describe('#ctor', function() {
    it('creates an instance of HtmlBaseBuilder', function() {
      var base = new np.HtmlBaseBuilder();

      expect(base instanceof np.HtmlBaseBuilder).toBe(true);
    });
  });

  describe('#href', function() {
    it('sets the href attribute on the wrapped element', function() {
      var base = new np.HtmlBaseBuilder();
      spyOn(base.element.attributes(), 'set');

      base.href('http://www.test.com');
      expect(base.element.attributes().set).toHaveBeenCalledWith('href', 'http://www.test.com');
    });
  });

  describe('#target', function() {
    it('set the target attribute', function() {
      var base = new np.HtmlBaseBuilder();
      spyOn(base.element.attributes(), 'set');

      base.target('_blank');
      expect(base.element.attributes().set).toHaveBeenCalledWith('target', '_blank');
    });
  });
});
