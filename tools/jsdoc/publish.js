//require file system
var fs = require("jsdoc/fs"),
  //require the xml builder library for xml output
  xml = require("xmlbuilder"),
  CType = require('catharsis').Types,
  //reuseable counter
  i,
  //reusable length variable
  len,
  //replaces {@link [symbol]} with a an xml tag
  //doing this in the template so we don't have
  //analyze the string in xslt
  processText = function(str) {
    if (str) {

      // This is replace() a fix to revert the auto link generation (made by markdown plugin) if the link
      // is placed within a "{@tag ..}", for example:
      //     {@code "http://http://api.here.com"}
      // would be incorrectly replaced with:
      //    {@code "<a href="http://foo.bar&quot;}">http://foo.bar"}</a>
      str = str.replace(/\{@(\w+) (.*?)<a href=".+?">(.+?)\}<\/a+>/g, function(match, g1, g2, g3) {
        return '{@' + g1 + ' ' + g2 + g3 + '}';
      });

      str = str.replace(/\{@link ([^\}]+)\}/g, function(match, g1) {
        return '<link ref="' + g1 + '" />';
      });
      str = str.replace(/\{@code ([^\}]+)\}/g, function(match, g1) {
        return '<code>' + g1 + '</code>';
      });
      str = str.replace(/&lt;code&gt;/, '<pre>');
      str = str.replace(/&lt;\/code&gt;/, '</pre>');
      return str;
    } else {
      return '';
    }
  },
  writeCType = function(ctype, element) {
    var ele,
      sub,
      value;
    switch (ctype.type) {
      case CType.AllLiteral:
        ele = element.ele('all');
        break;
      case CType.NullLiteral:
        ele = element.ele('null');
        break;
      case CType.UndefinedLiteral:
        ele = element.ele('undefined');
        break;
      case CType.UnknownLiteral:
        ele = element.ele('unknown');
        break;
      case CType.NameExpression:
        ele = element.ele('name').att('name', ctype.name);
        break;
      case CType.FunctionType:
        ele = element.ele('func');
        ctype.params.forEach(function(ctype) {
          writeCType(ctype, ele.ele('param'));
        });
        if (ctype.result) {
          writeCType(ctype.result, ele.ele('return'));
        }
        break;
      case CType.TypeApplication:
        ele = element.ele('typed');
        writeCType(ctype.expression, ele.ele('base'));
        ctype.applications.forEach(function(ctype) {
          writeCType(ctype, ele.ele('app'));
        });
        break;
      case CType.RecordType:
        ele = element.ele('record');
        ctype.fields.forEach(function(ctype) {
          sub = ele.ele('field');
          writeCType(ctype.key, sub.ele('key'));
          writeCType(ctype.value, sub.ele('value'));
        });
        break;
      case CType.TypeUnion:
        ele = element.ele('union');
        ctype.elements.forEach(function(ctype) {
          writeCType(ctype, ele.ele('type'));
        });
        break;
      default:
        throw new Error('Unknown ctype: ' + ctype.type);
        break;
    }
    if (ctype.nullable != undefined) {
      ele.att('nullable', '' + (ctype.nullable));
    }
    if (ctype.optional) ele.att('optional', 'true');
    if (ctype.repeatable) ele.att('repeatable', 'true');
  },

  //the extractor map contains functions that converts doclets to xml tags
  extractors = {
    //add a description tag to the current element
    'description': function(element, doclet) {
      var description = element.ele('description');

      description.ele('prose').raw(processText(doclet.description));

      if (doclet.examples) {
        doclet.examples.forEach(function(item) {
          description.ele('example').text(item);
        });
      }
    },
    //add options, nullable and default attributes to the current
    //element
    'optnulldef': function(element, doclet) {
      if (doclet.defaultvalue) element.att('default', doclet.defaultvalue || '');
      if (doclet.optional) element.att('optional', '' + (!!doclet.optional));
      if (doclet.nullable) element.att('nullable', '' + (!!doclet.nullable));
    },
    //generic extractor for symbol attributes
    //symbols are: namespace, class, interface, property, method, event
    //and type def
    'symbol': function(element, doclet) {
      try {
        element.att('name', doclet.longname);
        element.att('local-name', doclet.name.replace(/'/g, ''));
        element.att('access', doclet.access || 'public');
        element.att('scope', doclet.scope || '');
        element.att('virtual', '' + (!!doclet.virtual));
        //element.att('published', '' + (!!doclet.published));
        //element.att('exported', '' + (!!doclet.exported));

        if (doclet.inherited) {
          element.att('inherited', '' + doclet.inherits);
        };

        extract('description', element, doclet);

      } catch (e) {
        console.warn(doclet);
      }
      return element;
    },
    //extracts constructors including parameters and exceptions
    'constructor': function(element, doclet) {
      element
        .att('local-name', doclet.name)
        .att('name', doclet.longname);

      if (doclet.params) {
        doclet.params.forEach(function(item) {
          extract('param', element.ele('param'), item);
        });
      }
      if (doclet.exceptions) {
        doclet.exceptions.forEach(function(item) {
          extract('exception', element.ele('exception'), item);
        });
      }
    },
    //function are pretty much methods
    'function': function(element, doclet) {
      extract('symbol', element, doclet);

      if (doclet.params) {
        doclet.params.forEach(function(item) {
          extract('param', element.ele('param'), item);
        });
      }
      if (doclet.returns) {
        extract('returns', element.ele('returns'), doclet.returns[0]);
      };
      if (doclet.exceptions) {
        doclet.exceptions.forEach(function(item) {
          extract('exception', element.ele('exception'), item);
        });
      }
    },
    //add exception attributes
    'exception': function(element, doclet) {
      extract('type', element, doclet);
      extract('description', element, doclet);

      return element;
    },
    //extract type information (somehow doesn't work for function types)
    'type': function(element, doclet) {
      var types = doclet.type ? ((doclet.type.length === 1 ? doclet.type[0] : doclet.type)).names : [],
        l = types.length,
        typesElement;
      if (l) {
        typesElement = element.ele('types');
        for (var i = 0; i < l; i++) {
          typesElement.ele('type').att('ref', types[i]);
        }
      }
      //console.warn(element.name, !!doclet.ctype);
      //if (doclet.ctype) {
      //  writeCType(doclet.ctype, element.ele('ctype'));
      //}

      return element;
    },
    //extract return information
    'returns': function(element, doclet) {
      extract('type', element, doclet);
      extract('description', element, doclet);

      return element;
    },
    //extract parameter information (note: no long-name)
    'param': function(element, doclet) {
      element.att('name', doclet.name);
      extract('type', element, doclet);
      extract('description', element, doclet);
      extract('optnulldef', element, doclet);

      return element;
    },
    //member (aka. property) information
    'member': function(element, doclet) {
      extract('symbol', element, doclet);
      extract('type', element, doclet);

      return element;
    },
    'enum': function(element, doclet) {
      var valueElement;
      extract('symbol', element, doclet);
      extract('type', element, doclet);

      if (doclet.properties) {
        doclet.properties.forEach(function(item) {
          valueElement = element.ele('value');
          valueElement.att('name', doclet.longname + '.' + item.name);
          valueElement.att('local-name', item.name);
          extract('description', valueElement, item);
        });
      }
    },
    //typedefs and their properties need to be treated a bit
    //differently as jsdoc does not seem to create the same doclet
    //for typedefs as for other symbols
    'typedef': function(element, doclet) {
      extract('symbol', element, doclet);
      extract('type', element, doclet);

      if (doclet.properties) {
        doclet.properties.forEach(function(item) {
          item.longname = doclet.longname + "#" + item.name;
          extract('typedefmember', element.ele('property'), item);
        });
      }
    },
    'typedefmember': function(element, doclet) {
      extract('symbol', element, doclet);
      extract('type', element, doclet);
      extract('optnulldef', element, doclet);

      return element;
    },
    //extract event
    'event': function(element, doclet) {
      extract('symbol', element, doclet);
      extract('type', element, doclet);

      return element;
    },
    //extracts class information plus constructor
    'class': function(element, doclet) {
      extract('symbol', element, doclet);

      if (doclet.augments) {
        doclet.augments.forEach(function(item) {
          element.ele('extends').ele('type').att('ref', item);
        });
      }
      if (doclet.implements) {
        doclet.implements.forEach(function(item) {
          element.ele('implements').ele('type').att('ref', item);
        });
      }
      if (doclet.fires) {
        doclet.fires.forEach(function(item) {
          var fires = element.ele('fires');
          extract('description', fires, item);

          fires.ele('fires').ele('type').att('ref', item);
        });
      }

      var ctor = element.ele('constructor');
      extract('constructor', ctor, doclet);

      return element;
    },
    //extracts interface information
    'interface': function(element, doclet) {
      extract('symbol', element, doclet);

      if (doclet.extends) {
        doclet.extends.forEach(function(item) {
          element.ele('extends').ele('type').att('ref', item);
        });
      }
      if (doclet.fires) {
        doclet.fires.forEach(function(item) {
          var fires = element.ele('fires');
          extract('description', fires, item);

          fires.ele('fires').ele('type').att('ref', item);
        });
      }

      return element;
    }
  },
  //wrapper function for extractor[type](element, doclet)
  //this makes it easier to debug stuff
  extract = function(type, element, doclet) {
    var retVal;
    try {
      retVal = extractors[type](element, doclet);
    } catch (e) {
      console.warn(type, element, doclet);
    }
    return retVal;
  },
  //the dictionary maps doclet.kind to the appropriate extractors and
  //also handles recursive descent through child doclets
  dictionary = {
    'default': function(doclet, parentElement, allDocs, parentLongName, parentName) {
      var element = parentElement.ele('unknown').att('doclettype', doclet.kind);
      for (var key in doclet) {
        element.ele(key).text("" + doclet[key]);
      }
      graft(element, allDocs, doclet.longname, doclet.name);
    },
    'package': function(doclet, parentElement, allDocs, parentLongName, parentName) {
      //ignore
    },
    'namespace': function(doclet, parentElement, allDocs, parentLongName, parentName) {
      var element = parentElement.ele('ns');
      extract('symbol', element, doclet);
      graft(element, allDocs, doclet.longname, doclet.name);
    },
    'mixin': function(doclet, parentElement, allDocs, parentLongName, parentName) {
      var element = parentElement.ele('mixin');
      extract('interface', element, doclet);
      graft(element, allDocs, doclet.longname, doclet.name);
    },
    'function': function(doclet, parentElement, allDocs, parentLongName, parentName) {
      var element = parentElement.ele('method');
      extract('function', element, doclet);
      graft(element, allDocs, doclet.longname, doclet.name);
    },
    'member': function(doclet, parentElement, allDocs, parentLongName, parentName) {
      if (doclet.isEnum) {
        dictionary['enum'](doclet, parentElement, allDocs, parentLongName, parentName);
      } else {
        var element = parentElement.ele('property');
        extract('member', element, doclet);
        graft(element, allDocs, doclet.longname, doclet.name);
      }
    },
    'event': function(doclet, parentElement, allDocs, parentLongName, parentName) {
      var element = parentElement.ele('event');
      extract('event', element, doclet);
      graft(element, allDocs, doclet.longname, doclet.name);
    },
    'class': function(doclet, parentElement, allDocs, parentLongName, parentName) {
      if (doclet.isInterface) {
        dictionary['interface'](doclet, parentElement, allDocs, parentLongName, parentName);
      } else {
        var element = parentElement.ele('class');
        extract('class', element, doclet);
        graft(element, allDocs, doclet.longname, doclet.name);
      }
    },
    'interface': function(doclet, parentElement, allDocs, parentLongName, parentName) {
      var element = parentElement.ele('interface');
      extract('interface', element, doclet);
      graft(element, allDocs, doclet.longname, doclet.name);
    },
    'typedef': function(doclet, parentElement, allDocs, parentLongName, parentName) {
      var element = parentElement.ele('typedef');
      extract('typedef', element, doclet);
      graft(element, allDocs, doclet.longname, doclet.name);
    },
    'constant': function(doclet, parentElement, allDocs, parentLongName, parentName) {
      var element = parentElement.ele('property');
      extract('member', element, doclet);
      element.att('constant', 'true');
      graft(element, allDocs, doclet.longname, doclet.name);
    },
    'enum': function(doclet, parentElement, allDocs, parentLongName, parentName) {
      var element = parentElement.ele('enum');
      extract('enum', element, doclet);
      //graft(element, allDocs, doclet.longname, doclet.name);
    }
  };

function isExported(doclet) {
  if (!doclet.tags) return false;
  for (i = doclet.tags.length; i--;) {
    if (doclet.tags[i].title === 'export') return true;
  }
  return false;
}
//this function is taken from haruki and cleaned up a bit.
//it filters all doclets by those that are 'memberOf' some parent
//and then applies the correct funtion from the dictionary
function graft(parentElement, allDocs, parentLongname, parentName) {
  allDocs.filter(function(doclet) {
    return (doclet.memberof === parentLongname);
  }).forEach(function(doclet, index) {
    var fn = dictionary[doclet.kind] || dictionary['default'];
    if (fn) {
      fn(doclet, parentElement, allDocs, parentLongname, parentName);
    }
  });
}

function createMissingNameSpaces(docs) {
  var roots = docs.filter(function(doclet) {
    return (doclet.memberof === undefined);
  });

  docs.forEach(function(item) {
    console.warn(item.longname, item.memberof);
  });
};

//finally we export the function that puts everything together
exports.publish = function(data, opts) {
  //console.log(env);
  //create an XML root node
  var moduleName = env.opts.query ? env.opts.query.module : 'module',
      root = xml.create('modules'),
      moduleElement = root.ele('module').att('name', moduleName),
      symbolsElement = moduleElement.ele('symbols');

  //filter out all undocumented docs
  data({ undocumented: true }).remove();
  //filter out all ignored docs
  data({ ignore: true }).remove();

  //get a flat list of all doclets and call graft to start the
  //descent through the symbol hierarchy
  docs = data().get();


  graft(symbolsElement, docs);

  //convert the xml root (now enriched with elements) to string
  //and put it to <env.opt.destination>.xml
  fs.writeFileSync(env.opts.destination + '/' + moduleName + '.xml', root.end({
    pretty: true
  }), 'utf8');
};
