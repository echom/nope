(function(np) {
	'use strict';

  var DomNodeLink = function(doc, parent) {
    this.doc = doc;
    this.parent = parent;
  };
  DomNodeLink.prototype.up = function() { return this.parent; };
  DomNodeLink.prototype.root = function() { return this.parent ? this.parent.root() : this; };
  DomNodeLink.prototype.sync = function() {};

  var DomAttributeLink = np.inherits(function(doc, parent, name) {
    DomNodeLink.call(this, doc, parent);
    this.name = name;
    this.attributes = parent.shadow.attributes();
  }, DomNodeLink);
  DomAttributeLink.prototype.sync = function() {
    if(this.attributes.has(this.name)) {
      this.parent.dom.setAttribute(this.name, this.attributes.get(this.name));
    } else if(parent.dom.hasAttribute(this.name)) {
      this.parent.dom.removeAttribute(this.name);
    }
  };

  var DomTextLink = np.inherits(function(doc, parent, shadow, dom) {
    DomNodeLink.call(this, doc, parent);
    this.shadow = shadow;
    this.dom = dom;
  }, DomNodeLink);
  DomTextLink.prototype.sync = function() {
    var dom = this.dom;

    if(!this.dom) {
      this.dom = this.doc.createTextNode(this.shadow.content);
      this.parent.dom.appendChild(this.dom);
    } else {
      this.dom.textContent = this.shadow.content;
    }
  };

  var DomElementLink = np.inherits(function(doc, parent, shadow, dom) {
    DomNodeLink.call(this, doc, parent);
    this.shadow = shadow;
    this.dom = dom;

    this.attributeLinks = {};
    this.childLinks = {};
  }, DomNodeLink);
  DomElementLink.prototype.sync = function() {
    var shadow = this.shadow,
        attributeLinks = this.attributeLinks,
        childLinks = this.childLinks;
    if(!this.dom) {
      this.dom = this.doc.createElement(shadow.type);
      this.parent.dom.appendChild(this.dom);
    }
    shadow.attributes().each(function(key, val) {
      var attributeLink = attributeLinks[key];
      if(!attributeLink) {
        attributeLink = new DomAttributeLink(this.doc, this, key);
        attributeLinks[key] = attributeLink;
      }
      attributeLink.sync();
    }, this);
    shadow.children().each(function(node) {
      var childLink = childLinks[node.id];
      if(!childLink) {
        childLink = node.nodeType_ === 'text' ?
          new DomTextLink(this.doc, this, node) :
          new DomElementLink(this.doc, this, node);
        childLinks[node.id] = childLink;
      }
      childLink.sync();
    }, this);
  };

	/**
	 * Creates a new DomCompiler instance
	 * @constructor np.DomCompiler
	 * @classdesc The DomCompiler class represents a compiler which uses a
	 * browser's DOM API to render and synchronize a virtual DOM.
	 * @param {Document} doc - the compiler's target document
	 */
	var DomCompiler = function(doc) {
    this.win = window;
    this.doc = doc || document;
	};

	/**
	 * Compiles the element into this compiler's document instance.
	 * @method np.DomCompiler#compile
	 * @param {np.Element} root - the root element of the np.Element tree
	 * representing the document.
	 * @private
	 */
  DomCompiler.prototype.compile = function(root) {
    if(root.type == 'html') {
      var htmlLink = new DomElementLink(document, null, root, document);
      this.applyElement_(
        htmlLink,
        this.doc.getElementsByTagName('head')[0],
        root.children().first(function(node) { return node.type === 'head'; })
      );
      this.applyElement_(
        htmlLink,
        this.doc.getElementsByTagName('body')[0],
        root.children().first(function(node) { return node.type === 'body'; })
      );

      htmlLink.sync();
    }
  };

  DomCompiler.prototype.applyElement_ = function(parentLink, dom, shadow) {
    dom.innerHTML = '';
    parentLink.childLinks[shadow.id] = new DomElementLink(parentLink.doc, parentLink, shadow, dom);
  };

	/**
	 * Returns a new DomCompiler instance.
	 * @method np.dom
	 * @param {Document} [doc=document] - the document to use as the compiler's
	 * target (the current document by default)
	 * @return {np.DomCompiler} a new DomCompiler
	 */
	np.dom = function(doc) { return new DomCompiler(doc || document); };
}(this.np));
