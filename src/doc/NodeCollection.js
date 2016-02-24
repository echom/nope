(function(np) {
  'use strict';

  /**
   * Creates a new NodeCollection instance.
   * @constructor np.NodeCollection
   * @param {np.Node[]} [array] - an optional array of nodes with which to
   * initialize this NodeCollection
   * @param {boolean} [owner] - the owner element of this node collection
   * @classdesc The NodeCollection class represents a collection of document
   * nodes.
	 * It provides methods for retrieving, modifying and deleting nodes.
   */
  var NodeCollection = function(array, owner) {
    this.children_ = array || [];

    this.owner = owner;
    this.inv_ = new np.Invalidation(owner && owner.inv());
  };

  NodeCollection.prototype.inv = function() {
    return this.inv_;
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
      throw new Error(np.msg.argEmpty('node'));
    } else if(!np.isA(node, np.Node)) {
      throw new TypeError(np.msg.argType('node', 'np.Node'));
    }

    if((children.indexOf(node)) < 0) {
      children.push(node);
      node.parent = this.owner;
      node.inv().parent = this.owner.inv();
      this.inv().set();
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
      throw new Error(np.msg.argEmpty('node'));
    } else if(!np.isA(node, np.Node)) {
      throw new TypeError(np.msg.argType('node', 'np.Node'));
    }
    if((index = children.indexOf(node)) >= 0) {
      children.splice(index, 1);
      node.parent = null;
      node.inv().parent = null;
      this.inv().set();
    }

    return this;
  };

  NodeCollection.prototype.count = function() {
    return this.children_.length;
  };

  /**
   * Returns the first node within the collection which matches the given
   * predicate. The predicate function receives a node and is expected to
   * return a boolean value indicating whether the node matches.
   * @method np.NodeCollection#find
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
   * collection.find(predicate);
   */
  NodeCollection.prototype.find = function(predicate, ctx) {
    // TODO: use this.children_.find()???
    ctx = ctx || this;

    var children = this.children_,
        i = 0,
        l = children.length;

    if(!predicate) {
      return children[0];
    }

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
   * @param {function(np.Node, index, np.NodeCollection):boolean} predicate - the predicate function to
   * be applied to elements
   * @param {*} [ctx] - an optional context for the predicate (otherwise 'this'
   * will be the NodeCollection)
   * @return {np.Node[]} all nodes matching the predicate or an empty
   * collection if no node matches
   * @throws {Error} when the 'predicate' argument is not provided.
   * @example
   * var collection = new np.NodeCollection(),
   *     predicate = function(node) { return node.count() == 0; };
   * collection.when(predicate);
   */
  NodeCollection.prototype.filter = function(predicate, ctx) {
    // TODO: use this.children_.filter()???
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
    return result;
  };

  NodeCollection.prototype.forEach = function(fn, ctx) {
    // TODO: use this.children_.forEach()???

    if(!fn) {
      throw new Error(np.msg.argEmpty('fn'));
    }

    ctx = ctx || this;

    var children = this.children_,
        i = 0,
        l = children.length;

    for(; i < l; i++) {
      fn.call(ctx, children[i], i, this);
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
