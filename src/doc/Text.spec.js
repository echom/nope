describe('np.Text', function() {

  describe('#ctor', function() {

    it('creates an instance of text', function() {
      var text = new np.Text();
      expect(text instanceof np.Text).toBe(true);
    });

    it('has the text passed in as first argument', function() {
      var parent = new np.Node();
      var text = new np.Text('Hello world');
      expect(text.get()).toBe('Hello world');
    });

    it('has the parent passed in as second argument', function() {
      var parent = new np.Node();
      var text = new np.Text(null, parent);
      expect(text.parent).toBe(parent);
    });

  });

  describe('#set', function() {
    it('sets the text content of the text node', function() {
      var text = new np.Text('Hello world');

      text.set('Goodbye world');

      expect(text.get()).toBe('Goodbye world');
    });
  });

  describe('#nodeType_', function() {
    it('return "text"', function() {
      var tx = new np.Text();
      expect(tx.nodeType_).toBe('text');
    });
  });
  describe('#isText', function() {
    it('matches only elements', function() {
      var tx = new np.Text();
          nd = new np.Node();

      expect(np.Text.isText(tx)).toBe(true);
      expect(np.Text.isText(nd)).toBe(false);
    });
  });
});
