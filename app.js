/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var lookout = __webpack_require__(1);

	window.Lookout = lookout({
	  name: 'Eric',
	  meta: {
	    title: 'Old Object'
	  }
	})

	Lookout.watch('name', function(val){
	  console.log(val)
	})
	Lookout.watch('meta', function(val){
	  console.log(val)
	})

	setTimeout(function(){
	  Lookout.name = 'Ryan'
	  Lookout.meta.title = 'New Title'  
	}, 1000)



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Check if object and
	 * not an Array
	 */
	var isObj = __webpack_require__(3);

	/**
	 * Get keypaths to fire in
	 * this.publish()
	 */
	var getPath = __webpack_require__(10);

	/**
	 * Root object
	 */
	var ROOT;

	/**
	 * Create prototype chain for
	 * ROOT object.
	 *
	 * NOTE: properties should be enumerable
	 */
	var proto = Object.create({}, {

	  /**
	   * Cache of callback functions
	   */
	  listeners: {
	    value: {
	      all: {
	        queue: []
	      }
	    },
	    enumerable: false
	  },

	  /**
	   * Assigns callbacks to changes
	   * at a specified keypath
	   *
	   * @param {string} key Full keypath to target key
	   * @param {object} cb Callback function
	   */
	  watch: {
	    value: function(key, cb){
	      key = key === '.' || undefined ? 'all' : key;

	      if (typeof key === 'function'){
	        cb = key
	        key = 'all'
	      }

	      if (!this.listeners[key]){
	        this.listeners[key] = {
	          queue: []
	        };
	      }

	      this.listeners[key].queue.push(cb);
	    },
	    enumberable: false
	  },

	  /**
	   * Run all callbacks at a certain
	   * keypath key in the this.listeners array
	   *
	   * @param {string} key Full keypath to target key
	   * @param {string|object} val Value that changed, passed to callback 
	   */
	  publish: {
	    value: function(key, val){
	      if (this.listeners.all.queue.length > -1){
	        for (var i = 0; i < this.listeners.all.queue.length; i++){
	          this.listeners.all.queue[i](val);
	        }
	      }

	      // if a callback hasn't been specified yet, return
	      if (!this.listeners[key]) return;

	      // run callback with changed value as param
	      for (var i = 0; i < this.listeners[key].queue.length; i++){
	        this.listeners[key].queue[i](val);
	      }
	    },
	    enumerable: false
	  }
	});

	/**
	 * Generate accessors
	 *
	 * @param {object} root Context object
	 * @param {object} srouce Data object
	 * @param {string} key Key to be set
	 */
	function set(root, source, key){
	  if (!root.store){
	    Object.defineProperty(root, 'store', {
	      value: {},
	      enumerable: false 
	    })
	    root.store[key] = source 
	  }

	  // Recusively set objects
	  if (isObj(source)){
	    Object.keys(source).forEach(function(k){
	      set(source, source[k], k)
	    })
	  }

	  Object.defineProperty(root, key, { 
	    set: function(val){ 
	      root.store[key] = val;

	      var keypath = getPath(ROOT, key, val);

	      /**
	       * For keypaths, fire callbacks for 
	       * each sub path in case we have
	       * listeners on those keypaths
	       */
	      keypath.split(/\./).forEach(function(path){
	        ROOT.publish(keypath, val);
	        if (keypath.match(/\./)){
	          keypath = keypath.substring(0, keypath.match(/\.(?!.*\.)/).index)
	        }
	      })
	    },
	    get: function(){
	      return root.store[key]
	    },
	    configurable: true
	  });
	}

	/**
	 * Create blank object with proto methods.
	 *
	 * @param {object} source Any object the user wants to create
	 */
	function Lookout(source){
	  if (!isObj(source)) {
	    return console.warn('Passed parameter ('+source+') is not an object.')
	  }

	  ROOT = Object.create(proto, {
	    store: {
	      value: source 
	    }
	  });

	  Object.assign(ROOT, source)

	  Object.keys(source).forEach(function(key){
	    set(ROOT, source[key], key)
	  });

	  return ROOT;
	}

	module.exports = Lookout;



/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * isobject <https://github.com/jonschlinkert/isobject>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var isArray = __webpack_require__(7);

	module.exports = function isObject(val) {
	  return val != null && typeof val === 'object' && isArray(val) === false;
	};


/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isObj = __webpack_require__(3)

	module.exports = function(root, key, value){
	  var PATH

	  /**
	   * @param {string} base Keypath so far
	   * @param {string} str Key to add to path
	   */
	  function join(base, str){
	    return base.match(/./) ? base+'.'+str : str
	  }

	  /**
	   * @param {string} path Keypath so far, passed recursively
	   * @param {object} obj Context we loop over
	   */
	  function traverseDeep(path, obj){ // meta, meta{} 
	    Object.keys(obj).forEach(function(k){
	      if (isObj(obj[k])){
	        traverseDeep(join(path, k), obj[k])
	      }
	      else if (k === key && obj[k] === value){
	        PATH = join(path, k) 
	      }
	    })
	  }

	  /**
	   * @param {object} obj Root object to start traversal
	   */
	  function traverse(obj){
	    var path = ''

	    Object.keys(obj).forEach(function(k){
	      if (isObj(obj[k])){
	        traverseDeep(k, obj[k])
	      }
	      else if (k === key && obj[k] === value){
	        PATH = join(path, k)
	      }
	    });
	  };

	  traverse(root)

	  return PATH 
	}


/***/ }
/******/ ]);