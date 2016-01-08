(function(np) {
  'use strict';

  /**
   * Creates a new NodeCollection instance.
   * @constructor np.NodeCollection
   * @param {np.Node[]} [array] - an optional array of nodes with which to
   * initialize this NodeCollection
   * @param {boolean} [readonly=false] - a boolean value indicating whether this
   * collection can be modified
   * @classdesc The NodeCollection class represents a collection of document
   * nodes.
	 * It provides methods for retrieving, modifying and deleting nodes.
   */
  var NodeCollection = function(array, readonly) {
    this.children_ = array || [];
    this.readonly_ = !!readonly;
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

    if(this.readonly_) {
      throw new Error(np.msg.opInvalid('add', 'the collection was marked readonly'));
    } else if(!node) {
      throw new Error(np.msg.argEmpty('node'));
    } else if(!np.isA(node, np.Node)) {
      throw new TypeError(np.msg.argType('node', 'np.Node'));
    }

    if((children.indexOf(node)) < 0) {
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

    if(this.readonly_) {
      throw new Error(np.msg.opInvalid('remove', 'the collection was marked readonly'));
    } else if(!node) {
      throw new Error(np.msg.argEmpty('node'));
    } else if(!np.isA(node, np.Node)) {
      throw new TypeError(np.msg.argType('node', 'np.Node'));
    }
    if((index = children.indexOf(node)) >= 0) {
      children.splice(index, 1);
    }

    return this;
  };

  /**
   * Returns the first node within the collection which matches the given
   * predicate. The predicate function receives a node and is expected to
   * return a boolean value indicating whether the node matches.
   * @method np.NodeCollection#first
   * @param {function(np.Node):boolean} predicate - the predicate function to
   * be applied to elements
   * @param {*} [ctx] - an optional context for the predicate (otherwise 'this'
   * will be the NodeCollection)
   * @return {np.Node} the first node matching the predicate or 'undefined' if
   * no node matches
   * @throws {Error} when the 'predicate' argument is not provided.
   * @example
   * var collection = new np.NodeCollection(),
   *     predicate = function(node) { return node.count() == 0; };
   * collection.first(predicate);
   */
  NodeCollection.prototype.first = function(predicate, ctx) {
    if(!predicate) {
      throw new Error(np.msg.argEmpty('predicate'));
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

  /**
   * Returns the all nodes within the collection which match the given
   * predicate. The predicate function receives a node and is expected to
   * return a boolean value indicating whether the node matches.
   * @method np.NodeCollection#where
   * @param {function(np.Node):boolean} predicate - the predicate function to
   * be applied to elements
   * @param {*} [ctx] - an optional context for the predicate (otherwise 'this'
   * will be the NodeCollection)
   * @return {np.NodeCollection} all nodes matching the predicate or an empty
   * collection if no node matches
   * @throws {Error} when the 'predicate' argument is not provided.
   * @example
   * var collection = new np.NodeCollection(),
   *     predicate = function(node) { return node.count() == 0; };
   * collection.all(predicate);
   */
  NodeCollection.prototype.where = function(predicate, ctx) {
    if(!predicate) {
      throw new Error(np.msg.argEmpty('predicate'));
    }

    ctx = ctx || this;

    var children = this.children_,
        i = 0,
        l = children.length,
        result = [];

    for(; i < l; i++) {
      if(predicate.call(ctx, children[i])){
        result.push(children[i]);
      }
    }
    return new NodeCollection(result, true);
  };

  NodeCollection.prototype.each = function(fn, ctx) {
    if(!fn) {
      throw new Error(np.msg.argEmpty('fn'));
    }

    ctx = ctx || this;

    var children = this.children_,
        i = 0,
        l = children.length;

    for(; i < l; i++) {
      fn.call(ctx, children[i]);
    }
  };
  /**
   * Returns all child nodes within this NodeCollection as an array.
   * @method np.NodeCollection#toArray
   * @return {np.Node[]} this collection's nodes as an array.
   */
  NodeCollection.prototype.toArray = function() {
    return [].concat(this.children_);
  };

  np.NodeCollection = NodeCollection;
}(this.np));
