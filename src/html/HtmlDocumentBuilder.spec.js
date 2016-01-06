describe('np.HtmlDocumentBuilder', function() {
  describe('#ctor', function() {
    it('creates an instance of HtmlDocumentBuilder', function() {
      var html = new np.HtmlDocumentBuilder();

      expect(html instanceof np.HtmlDocumentBuilder).toBe(true);
    });
  });

  describe('#up (override)', function() {
    it('returns the HtmlDocumentBuilder itself', function() {
      var html = new np.HtmlDocumentBuilder();
      expect(html.up()).toBe(html);
    });
  });

  describe('#head', function() {
    it('returns the HtmlHeadBuilder of this HtmlDocumentBuilder', function() {
      var html = new np.HtmlDocumentBuilder(),
          head = html.head();
      expect(head).not.toBe(undefined);
      expect(head instanceof np.HtmlHeadBuilder).toBe(true);
    });
  });

  describe('#body', function() {
    it('returns the HtmlBodyBuilder of this HtmlDocumentBuilder', function() {
      var html = new np.HtmlDocumentBuilder(),
          body = html.body();
      expect(body).not.toBe(undefined);
      expect(body instanceof np.HtmlBodyBuilder).toBe(true);
    });
  });

  describe('#charset, #meta, #httpEquiv', function() {
    it('delegates to the HtmlHeadBuilder', function() {
      var html = new np.HtmlDocumentBuilder(),
          head = html.head();
      spyOn(head, 'charset');
      spyOn(head, 'meta');
      spyOn(head, 'httpEquiv');
      spyOn(head, 'title');

      html.charset('a');
      html.meta('b', 'c');
      html.httpEquiv('d', 'e');
      html.title('the title');

      expect(head.charset).toHaveBeenCalledWith('a');
      expect(head.meta).toHaveBeenCalledWith('b', 'c');
      expect(head.httpEquiv).toHaveBeenCalledWith('d', 'e');
      expect(head.title).toHaveBeenCalledWith('the title');
    });
  });
});
