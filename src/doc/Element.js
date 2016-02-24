(function(np) {
  'use strict';

  /**
   * Creates a new Element instance with the given type.
   * @constructor np.Element
   * @classdesc The Element class represents a HTML element. It provides methods for
   * navigating and modifying the HTML tree.
   * @param {string} type - the element's type
   * @param {np.Element} [parent] - the element's optional parent
   * @throws {Error} when the type argument is not defined
   * @augments np.Node
   */
  var Element = np.inherits(function(type, parent) {
    if(!type) throw new Error(np.msg.argEmpty('type'));

    np.Node.call(this, parent);

    /**
     * The type of the element.
     * @member {string} np.Element#type
     */
    this.type = type;

    /**
     * This element's child nodes
     * @member {np.NodeCollection} np.Element#children_
     * @private
     */
    this.children_ = new np.NodeCollection(null, this);

    /**
     * This element's attributes
     * @member {np.NodeCollection} np.Element#attributes_
     * @private
     */
    this.attributes_ = new np.AttributeCollection(this);

    this.selfClosing = true;
  }, np.Node);

  Element.prototype.nodeType_ = 'element';
  Element.isElement = function(node) { return node.nodeType_ === 'element'; };

  /**
   * Returns this element's attribute collection.
   * @method np.Element#attributes
   * @return {np.AttributeCollection} this element's attributes
   */
  Element.prototype.attributes = function() {
    return this.attributes_;
  };

  /**
   * Returns this element's child node collection.
   * @method np.Element#children
   * @return {np.NodeCollection} this element's child nodes
   */
  Element.prototype.children = function() {
    return this.children_;
  };

  Element.prototype.path = function() {
    var path = '',
        type = this.type,
        parent = this.parent,
        children,
        index = -1;
    if(parent) {
      path += parent.path();
      children = parent.children().toArray().filter(function(node) { return node.type === type; });
      if(children.length > 1) {
        index = children.indexOf(this);
      }
    }
    path += '<' + type + (index >= 0 ? '[' + index + ']' : '') + '>';
    return path;
  };

  /**
   * Appends a node to this element.
   * @method np.Element#append
   * @param {np.Node} node - the node to append
   * @return {np.Element} this element instance
   * @throws {Error} when the 'node' argument is not defined.
   * @throws {Error} when the 'node' argument is itself.
   * @throws {TypeError} when the 'node' argument is not an {@link np.Node}.
   */
  Element.prototype.append = function(node) {
    if(!node) {
      throw new Error(np.msg.argEmpty('node', this.path()));
    } else if(node === this) {
      throw new Error(np.msg.opInvalid('append', 'trying to append to self', this.path()));
    } else if(!np.isA(node, np.Node)) {
      throw new TypeError(np.msg.argType('node', 'np.Node', this.path()));
    }

    this.children_.remove(node).add(node);
    return this;
  };

  Element.prototype.remove = function(node) {
    if(!node) {
      throw new Error(np.msg.argEmpty('node', this.path()));
    } else if(node === this) {
      throw new Error(np.msg.opInvalid('remove', 'trying to remove from self', this.path()));
    } else if(!np.isA(node, np.Node)) {
      throw new TypeError(np.msg.argType('node', 'np.Node', this.path()));
    }

    this.children_.remove(node);
    return this;
  };

  np.Element = Element;
}(this.np));
