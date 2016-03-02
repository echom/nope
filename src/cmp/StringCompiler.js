(function(np) {
  'use string';

  var indent = " ";
  for(i = 0; i < 10; i++) { indent += indent; }

  var StringCompiler = function() {};

  StringCompiler.prototype.text = function(text, buffer, indentCount) {
    var indentString = indent.substr(0, indentCount);
    buffer.push('\n' + indentString + text.get());
  };

  StringCompiler.prototype.element = function(element, buffer, indentCount) {
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
      buffer.push('\n' + indentString + str + '>');
    }

    if(childCount > 0) {
      children.forEach(function(e) {
        if(np.Element.isElement(e)) {
          this.element(e, buffer, indentCount + 1);
        } else if(np.Text.isText(e)) {
          this.text(e, buffer, indentCount + 1);
        }
      }, this);
    }
    if(childCount === 0 && element.selfClosing) {
      buffer.push('\n' + str + ' />');
    } else {
      buffer.push('\n' + indentString + '</' + name + '>');
    }
  };

  StringCompiler.prototype.compile = function(root) {
    var buffer = [];

    this.element(root, buffer, 0);

    return buffer.join('');
  };

  np.str = function() { return new StringCompiler(); };

}(this.np));
