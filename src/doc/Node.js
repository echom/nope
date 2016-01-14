(function(np) {
  'use strict';

  /**
   * Creates a new Node instance with the given type.
   * @constructor np.Node
   * @classdesc The Node represents a document node. It provides methods for
   * navigating and modifying the document tree.
   * @param {np.Node} [parent] - the node's parent node
   * @throws {Error} when the type argument is not defined.
   */
  var Node = function(parent) {
    if(parent && !(np.isA(parent, np.Node))) {
      throw new Error(np.msg.argType('parent', 'np.Node'));
    }
    /**
     * The parent node
     * @member {np.Node} np.Node#parent
     */
    this.parent = parent;
    this.id = Node.idCounter_++;
  };

  /**
   * Returns this element's parent element or undefined if this element
   * is the root element.
   * @method np.Node#up
   * @return {np.Node} this element's parent
   */
  Node.prototype.up = function() {
    if(this.parent) return this.parent;
  };
  /**
   * Returns the root element of the tree. If this element is the root
   * element it will return itself.
   * @method np.Node#root
   * @return {np.Node} the root element of this tree.
   */
  Node.prototype.root = function() {
    return this.parent ? this.parent.root() : this;
  };

  Node.prototype.traceAncestors_ = function() {
    var current = this,
        result = [current];

    while((current = current.parent)) {
      result.unshift(current);
    }
  };

  Node.idCounter_ = 0;

  np.Node = Node;
}(this.np));
