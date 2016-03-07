(function(np) {

  var List = function(items) {
    this.items_ = items || [];
  };

  List.prototype.add = function(item) {
    if(!item) {
      throw new Error(np.msg.argEmpty('item'));
    }

    this.remove(item);
    this.items_.push(item);

    return this;
  };

  List.prototype.remove = function(item) {
    if(!item) {
      throw new Error(np.msg.argEmpty('item'));
    }

    var index;
    if((index = this.items_.indexOf(item))) {
      this.items_.splice(index, 1);
    }

    return this;
  };

  List.prototype.find = function(predicate, context) {
    return this.items_.find(predicate, context);
  };

  List.prototype.filter = function(predicate, context) {
    return this.items_.filter(predicate, context);
  };

  List.prototype.forEach = function(callback, context) {
    return this.items_.forEach(callback, context);
  };

  Object.defineProperty(Collection.prototype, 'length', {
    get: function() {
      return this.items_.length;
    }
  });



  var Map = function(items) {
    this.items_ = items;
    this.values_ = null;
  };

  Map.prototype.get = function(key, value) {
    if(!key) {
			throw new Error(np.msg.argEmpty('key'));
		}

    return this.items_[key];
  };

  Map.prototype.has = function(key) {
    if(!key) {
			throw new Error(np.msg.argEmpty('key'));
		}

    return key in this.items_;
  }

  Map.prototype.set = function(key, value) {
    if(!key) {
			throw new Error(np.msg.argEmpty('key'));
		}
		if(!value) {
			throw new Error(np.msg.argEmpty('value'));
		}

    this.items_[key] = value;
    this.values_ = null;
  };

  Map.prototype.unset = function(key) {
    if(!key) {
			throw new Error(np.msg.argEmpty('key'));
		}

    delete this.items_[key];
    this.values_ = null;
  };

  Map.prototype.forEach = function(callback, context) {
    var items = this.items_,
        key,
        ctx = context || this;

    for(key in items) {
      if(items.hasOwnProperty(key)) {
        callback.call(ctx, items[key], key, items);
      }
    }
  };

  Map.prototype.valuesCb_ = function(value) {
    this.values_.push(value);
  };

  Object.defineProperty(Map.prototype, 'values', {
    get: function() {
      if(!this.values_) {
        this.forEach(this.valuesCb_);
      }
      //must return a copy due to the fact that array could be modified
      return [].concat(this.values_);
    }
  });



  var Leaf = function(data) {
    this.parent = null;
  };

  var Node = np.inherits(function(children) {
    Leaf.call(this);
    this.children_ = new Collection();
  }, Leaf);

  Node.prototype.add_ = function(node) {
    this.children_.add(node);
    node.parent = this;
  };

  Node.prototype.add = function(nodes) {
    [].concat(nodes).forEach(this.add_, this);
  };

  Node.prototype.remove_ = function(node) {
    this.children_.remove(node);
    node.parent = null;
  };

  Node.prototype.remove = function(nodes) {
    [].concat(nodes).forEach(this.remove_, this);
  };

  Object.defineProperty(Node.prototype, 'children', {
    get: function() { return children; }
  });

  Object.defineProperty(Node.prototype, 'root', {
    get: function() { return this.parent ? this.parent.root : this; }
  });



  np.Collection = Collection;
  np.Map = Map;
  np.Leaf = Leaf;
  np.Node = Node;

}(this.np));
