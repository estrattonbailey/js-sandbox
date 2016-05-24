require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var initScripts = require('./lib/initScripts.js');

var types = [
  'module', 
  'component'
]

window.app = {}

document.addEventListener('DOMContentLoaded', function(){
  /**
   * Find all specified elements
   * in the DOM and init their 
   * javascripts
   */
  types.forEach(function(type){
    nodes = [].slice.call(document.querySelectorAll('[data-'+type+']'));

    for (var i = 0; i < nodes.length; i++){
      initScripts(nodes[i], type);
    }
  });
});

},{"./lib/initScripts.js":"lib/initScripts"}],"components/component":[function(require,module,exports){
function Component(el, params){
  console.log('Component 1: '+el+' '+params)
  return {
    params: params,
    show: function(){

    },
    hide: function(){

    }
  } 
}

module.exports = Component;

},{}],"components/counter":[function(require,module,exports){
function counter(){
  console.log('Component')
}

module.exports = counter;

},{}],"lib/initScripts":[function(require,module,exports){
/**
 * Parse data from context element attribute
 *
 * @param {object} el Context element
 * @param {string} type Classification of script
 */
function prep(el, type){
  var raw;

  window.app[type] = {};

  raw = el.getAttribute('data-'+type)

  sequences = raw.indexOf(',') ? raw.split(/\,\s|\,/) : raw

  sequences.forEach(function(seq){
    var _return,
        namespace,
        args,
        context,
        snippets = [],
        params = [];

    namespace = seq.split(/\s\#/)[1] || null;

    if (namespace) {
      seq = seq.slice(0, seq.match(/\s\#/).index)
    }

    /**
     * If snippet has params,
     * we need to set them up to be
     * passed to the script
     */
    if (seq.indexOf('--') > -1){
      args = seq.split(/\s\-\-\s/);

      snippets = args[1].split(/\s\|\s/);

      params = [].map.call(args[0].split(/\s/), function(param){
        return param.replace(/\'/g,'');
      });
    } 
    
    /**
     * Otherwise, we only have one snippet,
     * and we can just call it at that.
     */
    else {
      snippets.push(seq);
    }

    /**
     * Main function. Must be the LAST snippet
     * passed to the attribute
     */
    context = snippets[snippets.length - 1];

    // Remove the context snippet from the array
    snippets.splice(snippets.length -1, 1)

    // Create object to pass to init()
    _return = {
      namespace: namespace,
      context: context,
      snippets: snippets,
      params: params || []
    }

    /** 
     * Run init() to fire all snippets
     * and initialize context script
     */
    init(el, _return, type);
  });
}

/**
 * Find scripts and fire them
 *
 * @param {object} el DOM node
 * @param {object} args {context: fn(), snippets: [fns()], params: []}
 * @param {string} type Classification of script
 */
function init(el, args, type){
  var namespace,
      context,
      returnData,  
      fns = [];

  /**
   * Set default param data
   */
  returnData = args.params

  /**
   * Find js snippets and add to 
   * fns array to be called next
   */
  try {
    context = require(type+'s/'+args.context)
  } catch(e) {
    console.log(e.toString())
  }

  for (var s = 0; s < args.snippets.length; s++){
    try {
      fns[s] = require('lib/'+args.snippets[s])
    } catch(e) {
      console.log(e.toString())
    }
  }

  /**
   * Scrub data through utility functions
   */
  if(fns.length) {
    for (var i = 0; i < fns.length; i++){
      returnData = fns[i](args.params);
      fns[i+1] ? fns[i+1](returnData) : null;
    }
  }

  /**
   * Fire main snippet
   */
  var instance = new context(el, returnData)

  if (args.namespace) {
    window.app[type][args.namespace] = instance;
  }

  if (typeof jQuery !== 'undefined'){
    $(el).data(type, instance);
  }
}

module.exports = prep;

},{}],"lib/util":[function(require,module,exports){
function Util(params){
  params.push('added!')
  return params 
}

module.exports = Util;

},{}],"modules/module2":[function(require,module,exports){
function Module(el, params){
  console.log('Module 2: '+el+' '+params)
  return {
    pub: function(){

    }
  } 
}

module.exports = Module;

},{}],"modules/module3":[function(require,module,exports){
function Module(el, params){
  console.log('Module 3: '+el+' '+params)
  return {
    pub: function(){

    }
  } 
}

module.exports = Module;

},{}],"modules/module4":[function(require,module,exports){
function Module(el, params){
  console.log('Module 4: '+el+' '+params)
  return 'Module 4: '+el+' '+params
}

module.exports = Module;

},{}],"modules/module":[function(require,module,exports){
function Module(el, params){
  console.log('Module 1: '+el+' '+params)
  return 'Module 1: '+el+' '+params
}

module.exports = Module;

},{}]},{},[1])


//# sourceMappingURL=main.js.map
