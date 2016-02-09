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
/***/ function(module, exports) {

	window.proto = {
	  data: [],
	  listeners: [],
	  set(obj){
	    var exists = this._find(this);

	    // console.log(this)
	    // console.log(exists)

	    if (!!exists && exists.length > 0 ){
	      Object.keys(obj).forEach(function(k){
	        exists[0][k] = obj[k] 
	      });
	    } else {
	      this.data.push(obj);
	    }
	  },
	  watch: function(key, cb){},
	  _find: function(obj){
	    console.log(obj)
	    this.data.filter(function(o){
	      console.log(o)
	      return o.id === obj.id;
	    })
	  }
	}

	function observable(obj){
	  var _o = Object.create(proto, {
	    id: {
	      writable: false,
	      enumerable: false,
	      value: new Date().getTime()
	    }
	  });

	  Object.keys(obj).forEach(function(k){
	    _o[k] = obj[k]
	  });

	  _o.set()

	  return _o;
	}

	const user = observable({
	  content: 'Hello world!',
	  modified: 'Tuesday'
	});


	setTimeout(function(){
	  user.set({
	    date: 'Date!'
	  });
	}, 1000);

	// console.dir(user)


/***/ }
/******/ ]);