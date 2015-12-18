(function(np) {
  'use strict';

  /**
   * Creates a new Element instance with the given type.
   * @constructor np.Element
   * @classdesc The Element class represents a HTML element. It provides methods for
   * navigating and modifying the HTML tree.
   * @param {string} type - the element's type
   * @throws {Error} when - the type argument is not defined
   * @augments np.Node
   */
  var Element = np.inherits(function(type, parent) {
    if(!type) throw new Error(np.message.argumentEmpty('type'));

    np.Node.call(this, parent);

    /**
     * The type of the element.
     * @member {string} np.Element#type
     */
    this.type = type;
  }, np.Node);

  /**
   * Returns this element's attribute collection.
   * @method np.Element#attributes
   * @return {np.Attributes} this element's attributes
   */
  Element.prototype.attributes = function() {
    return this.attributes_ || (this.attributes_ = new np.Attributes());
  };


  /**
   * Appends a node to this element.
   * @method np.Element#append
   * @param {np.Node} element - the element to append
   * @return {np.Element} this element instance
   * @throws {Error} when the 'node' argument is not defined.
   * @throws {Error} when the 'node' argument is itself.
   * @throws {TypeError} when the 'node' argument is not an {@link np.Node}.
   */
  Element.prototype.append = function(node) {
    var children = this.children || (this.children = []),
        index;

    if(!node) {
      throw new Error(np.message.argumentEmpty('node'));
    } else if(node === this) {
      throw new Error(np.message.invalidOperation('append', 'trying to append to self'));
    } else if(!np.isA(node, np.Node)) {
      throw new TypeError(np.message.argumentType('node', 'np.Node'));
    }

    if((index = children.indexOf(node)) >= 0) {
      children.splice(index, 1);
    }
    children.push(node);
    node.parent = this;
    return this;
  };

  np.Element = Element;
}(this.np));
