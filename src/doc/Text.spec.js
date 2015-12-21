describe('np.Text', function() {

  describe('#ctor', function() {

    it('creates an instance of text', function() {
      var text = new np.Text();
      expect(text instanceof np.Text).toBe(true);
    });

    it('has the text passed in as first argument', function() {
      var parent = new np.Node();
      var text = new np.Text('Hello world');
      expect(text.content).toBe('Hello world');
    });

    it('has the parent passed in as second argument', function() {
      var parent = new np.Node();
      var text = new np.Text(null, parent);
      expect(text.parent).toBe(parent);
    });

  });

  describe('#text', function() {
    it('sets the text content of the text node', function() {
      var text = new np.Text('Hello world');

      text.text('Goodbye world');

      expect(text.content).toBe('Goodbye world');
    });
  });

  describe('#nodeType_', function() {
    it('return "text"', function() {
      var tx = new np.Text();
      expect(tx.nodeType_).toBe('text');
    });
  });
  describe('#nodeIsElement_', function() {
    it('matches only elements', function() {
      var tx = new np.Text();
          nd = new np.Node();

      expect(np.Text.nodeIsText_(tx)).toBe(true);
      expect(np.Text.nodeIsText_(nd)).toBe(false);
    });
  });
});
