describe('np.ElementBuilder', function() {
  describe('#ctor', function() {
    it('creates an instance of HtmlBuilder', function() {
      var html = new np.HtmlBuilder();

      expect(html instanceof np.HtmlBuilder).toBe(true);
    });
  });

  describe('#up (override)', function() {
    it('returns the HtmlBuilder itself', function() {
      var html = new np.HtmlBuilder();
      expect(html.up()).toBe(html);
    });
  });

  describe('#head', function() {
    it('returns the HeadBuilder of this HtmlBuilder', function() {
      var html = new np.HtmlBuilder(),
          head = html.head();
      expect(head).not.toBe(undefined);
      expect(head instanceof np.HeadBuilder).toBe(true);
    });
  });

  describe('#body', function() {
    it('returns the BodyBuilder of this HtmlBuilder', function() {
      var html = new np.HtmlBuilder(),
          body = html.body();
      expect(body).not.toBe(undefined);
      expect(body instanceof np.BodyBuilder).toBe(true);
    });
  });

  describe('#charset', function() {
    it('delegates to the HeadBuilder', function() {
      var html = new np.HtmlBuilder(),
          head = html.head();
      spyOn(head, 'charset');

      html.charset('a');

      expect(head.charset).toHaveBeenCalledWith('a');
    });
  });

  describe('#meta', function() {
    var html = new np.HtmlBuilder(),
        head = html.head();
    spyOn(head, 'meta');

    html.meta('a', 'b');

    expect(head.meta).toHaveBeenCalledWith('a');
  });
});
