(function(np) {
  'use string';

  var indent = " ";
  for(i = 0; i < 10; i++) { indent += indent; }

  var StreamCompiler = function(stream) {
    this.stream = stream;
  };

  StreamCompiler.prototype.text = function(text, stream, indentCount) {
    var indentString = indent.substr(0, indentCount);
    stream.write('\n' + indentString + text.content);
  };

  StreamCompiler.prototype.element = function(element, stream, indentCount) {
    var type = element.type,
        children = element.children(),
        childCount = children.count(),
        str = '<' + type,
        indentString = indent.substr(0, indentCount);

    element.attributes().each(function(name, value) {
      str += ' ' + name + '="' + value + '"';
    }, this);

    if(childCount > 0) {
      stream.write('\n' + indentString + str + '>');
      children.each(function(e) {
        if(np.Element.nodeIsElement_(e)) {
          this.element(e, stream, indentCount + 1);
        } else if(np.Text.nodeIsText_(e)) {
          this.text(e, stream, indentCount + 1);
        }
      }, this);
      stream.write('\n' + indentString + '</' + type + '>');
    } else if(element.selfClosing) {
      stream.write('\n' + indentString + str + ' />');
    }
  };

  StreamCompiler.prototype.compile = function(root) {
    this.element(root, this.stream, 0);
    this.stream.end();
  };

  np.stream = function(stream) { return new StreamCompiler(stream); };

}(this.np));
