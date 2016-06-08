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

	var obj = {
	  name: 'Eric', 
	  meta: {
	    bday: '1992-02-14'
	  }
	}

	var o = lookout(obj)

	console.dir(o)

	// o.watch('name', function(val){
	//   console.log(val)
	// })
	// o.watch('meta.bday', function(val){
	//   console.log(val)
	// })

	setTimeout(function(){
	  // o.name = 'Ryan'
	  o.meta.bday = '1990-05-08'
	}, 1000)



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * TODO
	 * 1. JSDoc
	 * 2. console.warn
	 * 3. Add whitespace
	 * 4. Precompile deps
	 * 5. bundleDependencies[]
	 */

	var isObj = __webpack_require__(2);

	/**
	 * Added as a prototype to each 
	 * object created with Lookout()
	 */
	var proto = {
	  // cache of callback functions
	  listeners: {},
	  // assigns callbacks to keys on object
	  watch: function(key, cb){
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
	    console.log(this.listeners)
	  },
	  // run all callbacks in specific queue
	  publish: function(key, val){
	    console.log(key)
	    // if (this.listeners['all'].queue){
	    //   for (var i = 0; i < this.listeners['all'].queue.length; i++){
	    //     this.listeners['all'].queue[i](val);
	    //   }
	    // }

	    // if a callback hasn't been specified yet, return
	    if (!this.listeners[key]) return;

	    // run callback with changed value as param
	    for (var i = 0; i < this.listeners[key].queue.length; i++){
	      this.listeners[key].queue[i](val);
	    }
	  }
	}

	function deepSet(source, target, key, keys){
		keys.forEach(function(k){
			Object.defineProperty(target[key], k, { 
				set: function(val){ 
	        target.store.root[key][k] = val;

					this.publish(key, val);
				},
				get: function(){
	        return target.store.root[key][k]
				}
			});
	  });
	}

	/**
	 * Create blank object with proto methods.
	 * Set props data bucket equal to passed source object.
	 * Create getters and setters for each property.
	 * Setter fires this.publish() callback function.
	 * @param {object} source Any object the user wants to create
	 */
	function Lookout(source){
	  var target;

	  if (!isObj(source)) return console.log('%cPassed parameter ('+source+') is not an object.', 'background-color:#ff4567;color:#333333');

	  target = Object.create(proto, {
	    store: {
	      value: {
	        root: source 
	      }
	    }
	  });

	  // TODO Try defining obj first, then moving up the object to define accessors
	  Object.keys(source).forEach(function(key){
	    childObj = isObj(source[key]);

	    if (childObj){
	      childObjKeys = Object.keys(source[key]);
	      deepSet(source, target, key, childObjKeys);
	    }

	    Object.defineProperty(target, key, { 
	      set: function(val){ 
	        this.store.root[key] = val;
	        this.publish(key, val);
	      },
	      get: function(){
	        return this.store.root[key]
	      },
	      configurable: true
	    });
	  });


	  return target;
	}

	module.exports = Lookout;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var isObject = __webpack_require__(3);

	function isObjectObject(o) {
	  return isObject(o) === true
	    && Object.prototype.toString.call(o) === '[object Object]';
	}

	module.exports = function isPlainObject(o) {
	  var ctor,prot;
	  
	  if (isObjectObject(o) === false) return false;
	  
	  // If has modified constructor
	  ctor = o.constructor;
	  if (typeof ctor !== 'function') return false;
	  
	  // If has modified prototype
	  prot = ctor.prototype;
	  if (isObjectObject(prot) === false) return false;
	  
	  // If constructor does not have an Object-specific method
	  if (prot.hasOwnProperty('isPrototypeOf') === false) {
	    return false;
	  }
	  
	  // Most likely a plain Object
	  return true;
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*!
	 * isobject <https://github.com/jonschlinkert/isobject>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	module.exports = function isObject(val) {
	  return val != null && typeof val === 'object'
	    && !Array.isArray(val);
	};


/***/ }
/******/ ]);