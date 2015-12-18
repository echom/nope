(function(np) {
  'use strict';

  /**
   * Creates a new Node instance with the given type.
   * @constructor np.Node
   * @classdesc The Node represents a document node. It provides methods for
   * navigating and modifying the document tree.
   * @param {np.Node} [parent] - the node's parent node
   * @param {string} [text=''] - the node's text content
   * @throws {Error} when the type argument is not defined.
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
    return this;
  };

  np.Text = Text;
}(this.np));
