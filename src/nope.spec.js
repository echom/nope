describe('nope', function() {
  describe('#isA', function() {
    it('checks the type by "typeof" when the type argument is a string', function() {
      var a = 'a',
          b = 1,
          c = function() {},
          d = false,
          e = {};

      expect(np.isA(a, 'string')).toBe(true);
      expect(np.isA(b, 'number')).toBe(true);
      expect(np.isA(c, 'function')).toBe(true);
      expect(np.isA(d, 'boolean')).toBe(true);
      expect(np.isA(e, 'object')).toBe(true);
      expect(np.isA(a, 'number')).toBe(false);
      expect(np.isA(b, 'function')).toBe(false);
      expect(np.isA(c, 'boolean')).toBe(false);
      expect(np.isA(d, 'object')).toBe(false);
      expect(np.isA(e, 'string')).toBe(false);
    });
    it('checks the type by "instanceof" when the type argument is a function', function() {
      var ctor = function() {},
          a = new ctor(),
          b = {};

      expect(np.isA(a, ctor)).toBe(true);
      expect(np.isA(b, ctor)).toBe(false);
    });
    it('returns false for any other type of type argument', function() {
      expect(np.isA({}, 1)).toBe(false);
      expect(np.isA({}, true)).toBe(false);
      expect(np.isA(true, true)).toBe(false);
      expect(np.isA({}, {})).toBe(false);
      expect(np.isA({}, [])).toBe(false);
    });
  });
});
