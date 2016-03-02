(function(np) {
  'use string';

  var indent = " ";
  for(i = 0; i < 10; i++) { indent += indent; }

  var StreamCompiler = function(stream) {
    this.stream = stream;
  };

  StreamCompiler.prototype.text = function(text, stream, indentCount) {
    var indentString = indent.substr(0, indentCount);
    stream.write('\n' + indentString + text.get());
  };

  StreamCompiler.prototype.element = function(element, stream, indentCount) {
    var name = element.name,
        children = element.children(),
        childCount = children.count(),
        str = '<' + name,
        indentString = indent.substr(0, indentCount);

    element.attributes().forEach(function(value, name) {
      value = value.get().replace(/"/g, '&quot;');
      str += ' ' + name + '="' + value + '"';
    }, this);

    if(!element.selfClosing) {
      stream.write('\n' + indentString + str + '>');
    }

    if(childCount > 0) {
      children.forEach(function(e) {
        if(np.Element.isElement(e)) {
          this.element(e, stream, indentCount + 1);
        } else if(np.Text.isText(e)) {
          this.text(e, stream, indentCount + 1);
        }
      }, this);
    }
    if(childCount === 0 && element.selfClosing) {
      stream.write('\n' + str + ' />');
    } else {
      stream.write('\n' + indentString + '</' + name + '>');
    }
  };

  StreamCompiler.prototype.compile = function(root) {
    this.element(root, this.stream, 0);
    this.stream.end();
  };

  np.stream = function(stream) { return new StreamCompiler(stream); };

}(this.np));
