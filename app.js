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

	function form(args){
	  var form, 
	      nodes,
	      fields = args.fields || [],
	      nodesArray = [],
	      inputs = {}, 
	      target = {};

	  /*
	   * inputs = {
	   *  change: [
	   *    {
	   *      el: domNode,
	   *      validation: 'integer'
	   *    },
	   *    ...
	   *  ]
	   * }
	   *
	   * target = {
	   *  firstName: 'Eric', 
	   *  lastName: 'Bailey'
	   *  ...
	   * }
	   */

	  form = document.querySelector(args.form);

	  if (Array.isArray(fields)){
	    args.fields.forEach(function(field,i){
	      field.nodes = Array.prototype.slice.call(form.querySelectorAll(field.el));

	      field.nodes.forEach(function(node,i){
	        target[node.getAttribute('name')] = node.value

	        node.addEventListener(field.event, function(){
	          target[node.getAttribute('name')] = node.value
	        }, false);
	      });
	    });
	  }

	  target = lookout(target);

	  console.log(target)

	  /*
	  if (Array.isArray(args.inputs)){
	    args.inputs.forEach(function(input, i){
	      nodes = Array.prototype.slice.call(form.querySelectorAll(input.el));

	      for (var l = 0; l < nodes.length; l++){
	        nodesArray.push({
	          el: nodes[l],
	          validation: args.inputs[i].validation
	        });
	      }

	      if (inputs[input.event]){
	        for (var l = 0; l < nodes.length; l++){
	          inputs[input.event].push(nodesArray[l]);
	        }
	      } else {
	        inputs[input.event] = nodesArray 
	      }
	    });
	  } else if (typeof args.inputs === 'string'){
	    nodes = Array.prototype.slice.call(form.querySelectorAll(args.inputs));

	    for (var l = 0; l < nodes.length; l++){
	      nodesArray.push({
	        el: nodes[l],
	        validation: args.inputs[i].validation
	      });
	    }

	    inputs['change'] = nodesArray;
	  }

	  console.log(inputs)

	  function build(elements){
	    elements.forEach(function(el, i){
	      target[el.getAttribute('name')] = el.value;
	    });
	  }

	  function bind(elements, element, event){
	    elements.forEach(function(el, i){
	      el.addEventListener(event, function(){
	        target[el.getAttribute('name')] = el.value
	      }, false);

	      Object.defineProperty(target, el.getAttribute('name'), {
	        get: function(){
	          return this.props[el.getAttribute('name')]
	        }
	      });
	    });
	  }

	  Object.keys(inputs).forEach(function(k){
	    build(inputs[k]);
	  });

	  target = lookout(target);

	  Object.keys(inputs).forEach(function(k,i){
	    bind(inputs[k], k)
	  });
	  */

	  return target;
	}

	// var dateTime = form({
	//   form: '.js-form',
	//   inputs: '.js-input'
	// });
	var dateTime = form({
	  form: '.js-form',
	  fields: [
	    {
	      el: '.js-input', 
	      validation: 'integer',
	      event: 'change'
	    },
	    {
	      el: '.js-company', 
	      validation: 'length',
	      event: 'keyup'
	    },
	    {
	      el: '.js-address', 
	      validation: 'length',
	      event: 'change'
	    }
	  ] 
	});

	console.dir(dateTime);

	dateTime.watch('company', function(val){
	  console.log(val)
	});
	dateTime.watch('address', function(val){
	  console.log(val)
	});

	console.log(dateTime.age)


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.index || (g.index = {})).js = f()}})(function(){var define,module,exports;
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
	    var key = key || 'all'; // TODO: write 'all' functionality 

	    if (!this.listeners[key]){
	      this.listeners[key] = {
	        queue: []
	      };
	    }

	    this.listeners[key].queue.push(cb);
	  },
	  // run all callbacks in specific queue
	  publish: function(key, val){
	    // if a callback hasn't been specified yet, return
	    if (!this.listeners[key]) return;

	    // run callback with changed value as param
	    this.listeners[key].queue.forEach(function(fn, i){
	      fn(val);
	    });
	  }
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
	    props: {
	      value: source 
	    }
	  });

	  Object.keys(source).forEach(function(key){
	    Object.defineProperty(target, key, { 
	      set: function(val){ 
	        this.props[key] = val;
	        this.publish(key, val);
	      },
	      get: function(){
	        return this.props[key]
	      },
	      configurable: true
	    });
	  });

	  return target;
	}

	return Lookout;

	});


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