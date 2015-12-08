(function(np) {
  'use strict';

  /**
   * @constructor np.Element
   * @param {string} type the element's type
   */
  var Element = function(type) {
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
   * @method np.Element.append
   * @return np.Element this element instance
   */
  Element.prototype.append = function(element) {
    var children = this.children || (this.children = []);
    children.push(element);
    return this;
  };
  /*Element.prototype.prepend = function(element, indexElement) {
    var children = this.children || (this.children = []),
        index = children.indexOf(indexElement);
    if(index >= 0) {
      children.splice
    }
  };*/

  np.Element = Element;
}(this.np));
