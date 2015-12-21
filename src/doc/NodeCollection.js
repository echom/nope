(function(np) {
  'use strict';

  /**
   * Creates a new NodeCollection instance.
   * @constructor np.NodeCollection
   * @classdesc The NodeCollection class represents a collection of document
   * nodes.
	 * It provides methods for retrieving, modifying and deleting nodes.
   */
  var NodeCollection = function() {
    this.children_ = [];
  };

  /**
   * Adds a node to this collection. If the node is already in this collection
   * it is ignored.
   * @method np.NodeCollection#add
   * @param {Node} node - the node to be added to this collection
   * @return {NodeCollection} this NodeCollection instance
   * @throws {Error} when the 'node' argument is not provided.
   * @throws {TypeError} when the 'node' argument is not an instance of {@see np.Node}.
   */
  NodeCollection.prototype.add = function(node) {
    var children = this.children_;

    if(!node) {
      throw new Error(np.message.argumentEmpty('node'));
    } else if(!np.isA(node, np.Node)) {
      throw new TypeError(np.message.argumentType('node', 'np.Node'));
    }

    if((children.indexOf(node)) <= 0) {
      children.push(node);
    }

    return this;
  };

  /**
   * Removes a node from this collection. If the node is not in this collection
   * it is ignored.
   * @method np.NodeCollection#remove
   * @param {Node} node - the node to be removed from this collection
   * @return {NodeCollection} this NodeCollection instance
   * @throws {Error} when the 'node' argument is not provided.
   */
  NodeCollection.prototype.remove = function(node) {
    var children = this.children_,
        index;

    if(!node) {
      throw new Error(np.message.argumentEmpty('node'));
    }
    if((index = children.indexOf(node)) >= 0) {
      children.splice(index, 1);
    }

    return this;
  };

  NodeCollection.prototype.indexOf = function(node) {
    if(!node) {
      throw new Error(np.message.argumentEmpty('node'));
    }
    return this.children_.indexOf(node);
  };

  NodeCollection.prototype.first = function(predicate, ctx) {
    if(!predicate) {
      throw new Error(np.message.argumentEmpty('predicate'));
    }

    ctx = ctx || this;

    var children = this.children_,
        i = 0,
        l = children.length;
    for(; i < l; i++) {
      if(predicate.call(ctx, children[i])){
        return children[i];
      }
    }
  };

  NodeCollection.prototype.toArray = function() {
    return [].concat(this.children_);
  };

  np.NodeCollection = NodeCollection;
}(this.np));
