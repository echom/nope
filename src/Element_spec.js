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
      expect(toThrow).toThrow();
    });
  });
});
