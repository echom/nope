(function(np) {
  'use strict';

  /**
   * Creates a new Node instance with the given parent.
   * @constructor np.Node
   * @classdesc The Node represents a document node. It provides methods for
   * navigating and modifying the document tree.
   * @param {np.Node} [parent] - the node's parent node
   * @throws {Error} when the parent is provided but is not a Node.
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
    this.inv_ = new np.Invalidation(parent && parent.invalidation());
    this.id = Node.idCounter_++;
  };

  Node.prototype.invalid = function(timestamp) {
    return this.inv_.check(timestamp) ? 1 : 0;
  };

  Node.prototype.invalidation = function() {
    return this.inv_;
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

  Node.idCounter_ = 0;

  Node.NODE_INVALID = 1;

  np.Node = Node;
}(this.np));
