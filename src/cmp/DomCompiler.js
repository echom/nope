(function(np) {
	'use strict';

	var DomInvalidation = np.inherits(function(link, frequency) {
		var that = this;

		this.link = link;
		this.delay = Math.round(1000 / (frequency || 30));

		this.nextSyncHandle_ = 0;

		this.syncCallback_ = function() { that.sync(); };
	}, np.Invalidation);
	DomInvalidation.prototype.set = function() {
		np.Invalidation.prototype.set.call(this);
		if(!this.nextSyncHandle_) {
			this.sync();
		}
		this.scheduleNextSync_();
	};
	DomInvalidation.prototype.sync = function() {
		this.link.sync();
		this.nextSyncHandle_ = 0;

		var dt = np.now();
		console.log(dt - this.dt);
		this.dt = dt;
	};
	DomInvalidation.prototype.scheduleNextSync_ = function() {
		if(!this.nextSyncHandle_) {
			this.nextSyncHandle_ = setTimeout(this.syncCallback_, this.delay);
		}
	};


  var DomLink = function(doc, parent) {
    this.doc = doc;
    this.parent = parent;
  };
  DomLink.prototype.up = function() { return this.parent; };
  DomLink.prototype.root = function() { return this.parent ? this.parent.root() : this; };
  DomLink.prototype.sync_ = function(syncTimestamp) {};
	DomLink.prototype.sync = function(syncTimestamp) {
		syncTimestamp = syncTimestamp || np.now();
		this.sync_(syncTimestamp);
	};

  var DomAttributeLink = np.inherits(function(doc, parent, name) {
    DomLink.call(this, doc, parent);
    this.name = name;
    this.attributes = parent.shadow.attributes();
  }, DomLink);
  DomAttributeLink.prototype.sync_ = function(syncTimestamp) {
    if(this.attributes.has(this.name)) {
      this.parent.dom.setAttribute(this.name, this.attributes.get(this.name));
			return true;
    } else if(parent.dom.hasAttribute(this.name)) {
      this.parent.dom.removeAttribute(this.name);
			return false;
    }
  };

  var DomTextLink = np.inherits(function(doc, parent, shadow, dom) {
    DomLink.call(this, doc, parent);
    this.shadow = shadow;
    this.dom = dom;
  }, DomLink);
  DomTextLink.prototype.sync_ = function(syncTimestamp) {
    var shadow = this.shadow,
				dom = this.dom;

		if(!shadow.parent) {
			if(dom && dom.parentNode) {
				dom.parentNode.removeChild(dom);
			}
			return false;
		}
    if(!this.dom) {
      this.dom = this.doc.createTextNode(this.shadow.content);
      this.parent.dom.appendChild(this.dom);
			this.lastSynced_ = syncTimestamp;
    } else if(shadow.inv().check(this.lastSynced_)) {
      this.dom.textContent = this.shadow.content;
			this.lastSynced_ = syncTimestamp;
    }
		return false;
  };

  var DomElementLink = np.inherits(function(doc, parent, shadow, dom) {
    DomLink.call(this, doc, parent);
    this.shadow = shadow;
    this.dom = dom;
		this.lastSynced_ = undefined;

    this.attributeLinks = {};
    this.childLinks = {};
  }, DomLink);
	DomElementLink.prototype.sync_ = function(syncTimestamp) {
    var shadow = this.shadow,
				attributeLinks = this.attributeLinks,
				childLinks = this.childLinks,
				dom = this.dom,
				synced = false;

		//TODO: root element parent is NULL (or undefined)
		// if(this.shadow.parent === null) {
		// 	if(dom && dom.parentNode) {
		// 		dom.parentNode.remove(this.dom);
		// 	}
		// 	return false;
		// }

    if(!this.dom) {
      this.dom = this.doc.createElement(shadow.type);
			if(this.parent) {
      	this.parent.dom.appendChild(this.dom);
			}

			synced = true;
    }

		if(this.shadow.inv().check(this.lastSynced_)) {
			//TODO: what about removing children & child links ???
			if(shadow.attributes().inv().check(this.lastSynced_)) {
				shadow.attributes().forEach(function(key, val) {
					if(val.inv().check(this.lastSynced_)) {
						var attributeLink = attributeLinks[key];
						if(!attributeLink) {
							attributeLink = new DomAttributeLink(this.doc, this, key);
							attributeLinks[key] = attributeLink;
						}
						attributeLink.sync_(syncTimestamp);
					}
				}, this);
			}

			//if(shadow.children().inv().check(this.lastSynced_)) {
				//TODO: what about removing children & child links ???
				shadow.children().forEach(function(node) {
					var childLink = childLinks[node.id];
					if(!childLink) {
						childLink = node.nodeType_ === 'text' ?
							new DomTextLink(this.doc, this, node) :
							new DomElementLink(this.doc, this, node);
						childLinks[node.id] = childLink;
					}
					childLink.sync_(syncTimestamp);
				}, this);
			//}

			synced = true;
		}

		if(synced) {
			this.lastSynced_ = syncTimestamp;
		}

		return true;
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
		var rootLink;
    if(root.type == 'html') {
      rootLink = new DomElementLink(this.doc, null, root, document);
      this.applyElement_(
        rootLink,
        this.doc.getElementsByTagName('head')[0],
        root.children().find(function(node) { return node.type === 'head'; })
      );
      this.applyElement_(
        rootLink,
        this.doc.getElementsByTagName('body')[0],
        root.children().find(function(node) { return node.type === 'body'; })
      );
    } else {
			rootLink = new DomElementLink(this.doc, null, root, null);
		}

		rootLink.sync(Number.NEGATIVE_INFITY);
		rootLink.invalidation = new DomInvalidation(rootLink);
		rootLink.shadow.inv().parent = rootLink.invalidation;
		return rootLink;
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
