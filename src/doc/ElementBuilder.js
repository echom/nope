(function(np) {
  var ElementBuilder = function(element, attributes, children) {
    this.element_ = element;

    if(attributes) {
      this.at(attributes);
    }
    if(children) {
      this.el(children);
    }
  };

  ElementBuilder.prototype.at_ = function(name, value) {
    this.element_.attributes().set(name, value);
  };
  ElementBuilder.prototype.tx_ = function(text) {
    this.element_.children().add(new np.Text(text));
  };
  ElementBuilder.prototype.el_ = function(element) {
    this.element_.append(element);
  };

  ElementBuilder.prototype.at = function(name, value) {
    if(np.isA(name, 'string')) {
      //console.log('at(name, value): ', name, value);
      this.at_(name, value);
    } else if(np.isA(name, 'object')){
      //console.log('at(obj): ');
      Object.keys(name).forEach(function(key) {
        this.at_(key, name[key]);
      }, this);
    } else {
      throw new Error(np.msg.argInvalid(
        'name',
        '"' + name + '" is neither an object nor an attribute name',
        element && element.path()
      ));
    }
    return this;
  };
  ElementBuilder.prototype.tx = function(text) {
    [].concat(text).forEach(function(tx) {
      if(!tx) return;

      this.tx_(tx);
    }, this);
		return this;
  };
  ElementBuilder.prototype.el = function(element) {
    [].concat(element).forEach(function(el) {
      if(!el) return;

      if(np.isA(el, 'string')) {
        this.tx_(el);
      } else {
        this.el_(np.isA(el, ElementBuilder) ? el.element_ : el);
      }
    }, this);
    return this;
  };
  ElementBuilder.prototype.each = function(collection, fn) {
    var k, v, n, e;

    if(np.isA(collection, 'array')) {
      n = collection.length;
      for(k = 0; k < n; k++) {
        this.el(fn(collection[k], k, collection));
      }
    } else {
      for(k in collection) {
        this.el(fn(collection[k], k, collection));
      }
    }

    return this;
  };


  var DocumentBuilder = function() {};
  DocumentBuilder.prototype.el_ = function(name, attributes, children) {
    return new ElementBuilder(new np.Element(name), attributes, children);
  };
  DocumentBuilder.prototype.el = function(name, attributes, children) {
    //TODO: tighten + meaningful error messages
    if(!np.isA(attributes, 'object') && !children) {
      children = attributes;
      attributes = undefined;
    }

    return this.el_(name, attributes, children);
  };

  np.DocumentBuilder = DocumentBuilder;
  np.ElementBuilder = ElementBuilder;

  np.doc = function(createFn) {
    var doc = new DocumentBuilder(),
        element = createFn && createFn(doc);
    return element || doc;
  };
}(this.np));
