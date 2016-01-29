describe('np.HtmlUnifiedBuilder', function() {

  var allElements = [
        'a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|blockquote|body',
        'br|button|canvas',
        'caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div',
        'dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6',
        'head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend',
        'li|link|map|mark|menu|meta|meter|nav|noscript|object|ol|optgroup|option',
        'output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select',
        'small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea',
        'tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr'
      ].join('|').split('|');

  describe('interface', function() {
    beforeEach(function() {
      var that = this;

      this.builder = new np.HtmlUnifiedBuilder();

      //TODO: proper compiler mock
      this.compilerMock = jasmine.createSpyObj('compiler', ['compile']);
      this.compilerMock.compile;
    });

    describe('#ctor', function() {
      it('creates a HtmlBuilder instance', function() {
        var b = new np.HtmlUnifiedBuilder();
      });
      it('it is empty when created', function() {
        var b = new np.HtmlUnifiedBuilder();
        expect(b.current_).toBe(null);
      });
    });

    describe('#<*>()', function() {
      it('produces an element', function() {
        this.builder.div();

        var element = this.builder.current_;

        expect(element).toEqual(jasmine.any(np.Element));
        expect(element.type).toBe('div');
      });
      it('produces a new element that is a child of the current one', function() {
        this.builder.div();
        var parent = this.builder.current_;
        this.builder.p();
        var current = this.builder.current_;

        expect(current).not.toBe(parent);
        expect(current.parent).toBe(parent);
      });
      it('should append the provided text to the created element', function() {
        this.builder.p('text to append');

        var children = this.builder.current_.children();
        expect(children.count()).toBe(1);
        expect(children.first()).toEqual(jasmine.any(np.Text));
        expect(children.first().content).toEqual('text to append');
      });
      it('should set the provided attributes to the created element', function() {
        this.builder.p(0, { style: 'style', class: 'cssClass'});

        var attributes = this.builder.current_.attributes();
        expect(attributes.get('style')).toBe('style');
        expect(attributes.get('class')).toBe('cssClass');
      });
    })

    allElements.forEach(function(item) {
      it('exposes <' + item + '> element BUILDER.', function() {
        expect(this.builder[item]).toEqual(jasmine.any(Function));
      });
      it('exposes <' + item + '> element RULE.', function() {
        expect(np.HtmlRules.getRule(item)).not.toBeUndefined();
      });
    });
  });
  describe('rules', function() {
    beforeEach(function() {
      this.builder = new np.HtmlUnifiedBuilder();
    });

    describe('global attributes', function() {
      var attributes = [
            'accesskey', 'class', 'contenteditable', 'dir', 'hidden', 'id',
            'lang', 'spellcheck', 'style'
          ];

      allElements.forEach(function(element) {
        it('accepts global attributes', function() {
          var builder = this.builder;
          builder[element]();

          attributes.forEach(function(attribute) {
            builder.att(attribute, 'test');
            expect(builder.current_.attributes().get(attribute)).toBe('test');
          });
        });
      });
    });

    describe('<a>', function() {
      it('accepts the correct attributes', function() {
        var builder = this.builder.a(),
            attributes = ['href', 'target', 'rel', 'hreflang', 'media', 'type'];

        attributes.forEach(function(attribute) {
          builder.att(attribute, 'test');
        });
      });
      it('accepts correct child elements', function() {

      });
    });
  });
});
