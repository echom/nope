(function(np) {
  'use strict';

  /**
   * @constructor np.Element
   * @param {string} type the element's type
   */
  var Element = function(type) {
    if(!type) throw new Error(np.message.argumentEmpty('type'));

    /**
     * @member {string} np.Element#type
     */
    this.type = type;
  };

  /**
   * @method np.Element#up
   * @return np.Element this element's parent
   */
  Element.prototype.up = function() {
    if(this.parent) return this.parent;
  };
  /**
   * @method np.Element#root
   * @return np.Element returns the root element of this tree.
   */
  Element.prototype.root = function() {
    return this.parent ? this.parent.root() : this;
  };

  /**
   * Appends an element to this element.
   * @method np.Element#append
   * @param {np.Element} element the element to append
   * @return np.Element this element instance
   */
  Element.prototype.append = function(element) {
    var children = this.children || (this.children = []),
        index;

    if(!element) {
      throw new Error(np.message.argumentEmpty('element'));
    } else if(element === this) {
      throw new Error(np.message.invalidOperation('append', 'trying to append to self'));
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
