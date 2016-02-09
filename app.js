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

	var proto = {
	  // cache of callback functions
		listeners: {},
	  // assigns callbacks to keys on object
		watch: function(key, cb){
			var key = key || 'all';
			
	    if (!this.listeners[key]){
	      this.listeners[key] = {
	        queue: []
	      };
	    }
			
			this.listeners[key].queue.push(cb);
		},
	  // run all callbacks in specific queue
		publish: function(key, val){
			this.listeners[key].queue.forEach(function(fn, i){
				fn(val);
			});
		}
	}

	/**
	 * Create blank object with proto methods.
	 * Create getters and setters for each property.
	 * Setter fires this.publish() callback function.
	 * @param {object} obj Any object the user wants to create
	 */
	function observable(obj){
		var _o = Object.create(proto);
		
		Object.keys(obj).forEach(function(key){
			_o[key] = obj[key];
			
			Object.defineProperty(_o, key, { 
				set: function(val){ 
					Object.defineProperty(this, key, {
						value: val
					});
					
					this.publish(key, val);
				},
				get: function(){
	        return obj[key]
				}
			});
		});
		
		return _o;
	}

	// Create new observable object
	var user = observable({
		firstName: 'Eric',
		lastName: 'Bailey',
		meta: {
			birthday: '1992-02-14'
		}
	});

	// Add callbacks for a few properties
	user.watch('firstName', function(val){
		console.log(val)
	});
	user.watch('firstName', function(val){
		console.log(val+' '+user.lastName)
	});
	user.watch('meta', function(val){
		console.log(val)
	});

	// Set new property values
	setTimeout(function(){
	  user.firstName = 'Ryan';
	  user.meta = {
	    birthday: '1990-05-08'
	  };
	}, 1000);

	// Result
	console.dir(user);


/***/ }
/******/ ]);