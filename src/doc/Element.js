(function(np) {
  'use strict';

  /**
   * Creates a new Element instance with the given name.
   * @constructor np.Element
   * @classdesc The Element class represents a HTML element. It provides methods for
   * navigating and modifying the HTML tree.
   * @param {string} name - the element's name
   * @param {np.Element} [parent] - the element's optional parent
   * @throws {Error} when the name argument is not defined
   * @augments np.Node
   */
  var Element = np.inherits(function(name, attributes, children, parent) {
    if(!name) throw new Error(np.msg.argEmpty('name'));

    np.Node.call(this, parent);

    this.cinv_ = new np.Invalidation(this.inv_);
    this.ainv_ = new np.Invalidation(this.inv_);

    /**
     * A boolean value indicating that the element is self closing.
     * @member {boolean} np.Element.selfClosing
     */
    this.selfClosing = true;

    /**
     * The name of the element.
     * @member {string} np.Element#name
     */
    this.name = name;

    /**
     * This element's child nodes
     * @member {np.NodeCollection} np.Element#children_
     * @private
     */
    this.children_ = new np.NodeCollection();

    /**
     * This element's attributes
     * @member {np.NodeCollection} np.Element#attributes_
     * @private
     */
    this.attributes_ = new np.AttributeCollection();

    if(attributes) {
      this.set(attributes);
    }

    if(children) {
      this.add(children);
    }


  }, np.Node);

  Element.prototype.nodeType_ = 'element';
  Element.isElement = function(node) { return node.nodeType_ === 'element'; };

  Element.ATTRIBUTES_INVALID = 2;
  Element.CHILDREN_INVALID = 4;

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
        name = this.name,
        parent = this.parent,
        children,
        index = -1;
    if(parent) {
      path += parent.path();
      children = parent.children().toArray().filter(function(node) { return node.name === name; });
      if(children.length > 1) {
        index = children.indexOf(this);
      }
    }
    path += '<' + name + (index >= 0 ? '[' + index + ']' : '') + '>';
    return path;
  };

  Element.prototype.invalid = function(timestamp) {
    var flags = 0;

    if(this.inv_.check(timestamp)) {
      flags = Node.NODE_INVALID;

      if(this.cinv_.check(timestamp)) {
        flags |= Element.CHILDREN_INVALID;
      }
      if(this.ainv_.check(timestamp)) {
        flags |= Element.ATTRIBUTES_INVALID;
      }
    }

    return flags;
  };

  Element.prototype.at_ = function(attribute, value) {
    this.attributes_.set(attribute, value);
  };
  Element.prototype.el_ = function(node) {
    if(node === this) {
      throw new Error(np.msg.opInvalid('el_', 'trying to add to self'));
    }
    this.children_.remove(node).add(node);
    node.parent = this;
    node.invalidation().parent = this.inv_;
  };
  Element.prototype.tx_ = function(text) {
    this.children_.add(new np.Text(text, this));
  };

  Element.prototype.addCb_ = function(node) {
    if(!node) return;

    if(np.isA(node, 'string')) {
      this.tx_(node);
    } else {
      this.el_(node);
    }
  };
  Element.prototype.add = function(nodes) {
    [].concat(nodes).forEach(this.addCb_, this);
    this.cinv_.set(np.now());
    return this;
  };

  Element.prototype.remove_ = function(node) {
    if(node === this) {
      throw new Error(np.msg.opInvalid('remove', 'trying to remove from self', this.path()));
    }
    this.children_.remove(node);
    node.parent = null;
    node.invalidation().parent = null;
  };
  Element.prototype.remove = function(nodes) {
    [].concat(nodes).forEach(this.remove_, this);
    this.cinv_.set(np.now());
  };

  Element.prototype.set = function(attribute, value) {
    if(np.isA(attribute, 'string')) {
      //console.log('at(name, value): ', name, value);
      this.at_(attribute, value);
    } else if(np.isA(attribute, 'object')){
      //console.log('at(obj): ');
      Object.keys(attribute).forEach(function(key) {
        this.at_(key, attribute[key]);
      }, this);
    } else {
      throw new Error(np.msg.argInvalid(
        'attribute',
        '"' + attribute + '" is neither an object nor an attribute name',
        element && element.path()
      ));
    }
    this.ainv_.set(np.now());
    return this;
  };
  Element.prototype.unset = function(attribute) {
    this.attributes_.remove(attribute);
    this.ainv_.set(np.now());
  };
  Element.prototype.get = function(attribute) {
    return this.attributes_.get(attribute);
  };

  Element.prototype.compile = function(compiler) {
    return compiler.compile(this.root());
  };

  np.Element = Element;
}(this.np));
