(function(np) {
  'use strict';

  /**
   * Creates a new Text instance.
   * @constructor np.Text
   * @classdesc The Text node represents text in elements.
   * @param {string} [text=''] - the text content
   * @param {np.Node} [parent] - the text's parent node
   */
  var Text = np.inherits(function(text, parent) {
    np.Node.call(this, parent);

    this.text(text || '');
  }, np.Node);

  /**
   * Sets this text node's content.
   * @method np.Text.text
   * @param {string} text the content of this text node
   */
  Text.prototype.text = function(text) {
    this.content = '' + text;
    this.inv_.set();
    return this;
  };

  Text.prototype.path = function() {
    var path = '',
        parent = this.parent,
        index = -1;
    if(parent) {
      path += parent.path();
      index = parent.children().toArray().filter(Text.isText).indexOf(this);
    }
    path += '#text' + (index >= 0 ? '[' + index + ']' : '');
    return path;
  };

  Text.prototype.nodeType_ = 'text';
  Text.isText = function(node) { return node.nodeType_ === 'text'; };

  np.Text = Text;
}(this.np));
