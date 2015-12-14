(function(np) {
  'use strict';

  /**
   * Creates a new Element instance with the given type.
   * @constructor np.Element
   * @classdesc The Element class represents a HTML element. It provides methods for
   * navigating and modifying the HTML tree.
   * @param {string} type the element's type
   * @throws {Error} when the type argument is not defined
   */
  var Element = function(type) {
    if(!type) throw new Error(np.message.argumentEmpty('type'));

    /**
     * The type of the element.
     * @member {string} np.Element#type
     */
    this.type = type;
  };

  /**
   * Returns this element's parent element or undefined if this element
   * is the root element.
   * @method np.Element#up
   * @return {np.Element} this element's parent
   */
  Element.prototype.up = function() {
    if(this.parent) return this.parent;
  };
  /**
   * Returns the root element of the tree. If this element is the root
   * element it will return itself.
   * @method np.Element#root
   * @return {np.Element} the root element of this tree.
   */
  Element.prototype.root = function() {
    return this.parent ? this.parent.root() : this;
  };

  /**
   * Appends an element to this element.
   * @method np.Element#append
   * @param {np.Element} element the element to append
   * @return {np.Element} this element instance
   * @throws {Error} when the 'element' argument is not defined
   * @throws {TypeError} when the argument is not an {@link np.Element}
   * @throws {Error} when the 'element' argument is itself
   */
  Element.prototype.append = function(element) {
    var children = this.children || (this.children = []),
        index;

    if(!element) {
      throw new Error(np.message.argumentEmpty('element'));
    } else if(element === this) {
      throw new Error(np.message.invalidOperation('append', 'trying to append to self'));
    } else if(!(element instanceof np.Element)) {
      throw new TypeError(np.message.argumentType('element', 'np.Element'));
    }

    if((index = children.indexOf(element)) >= 0) {
      children.splice(index, 1);
    }
    children.push(element);
    element.parent = this;
    return this;
  };

  np.Element = Element;
}(this.np));
