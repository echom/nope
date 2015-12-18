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

});
