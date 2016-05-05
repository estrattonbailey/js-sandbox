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
<<<<<<< f6ed0c31298a5818bee99b2e831a4df6b6c13c09
/***/ function(module, exports, __webpack_require__) {

	var social = __webpack_require__(1);

	social('[data-social]');
=======
/***/ function(module, exports) {

	window.addEventListener('load', function(){
	  var bgs = [].slice.call(document.querySelectorAll('[data-src]'));
	  
	  for (var i = 0; i < bgs.length; i++){
	    var images = readAttr(bgs[i]);
	    var style = generateStyle(images);
	    
	    setBg(images, style, bgs[i])
	  };
	}, false);

	/**
	 * Lazy load, 
	 * should set class to element too
	 */
	function setBg(images, style, bg){
	  var size,
	      urls = [],
	      sizes = [],
	      ww = window.outerWidth,
	      image = new Image();
	  
	  bg.style.opacity = 0;

	  bg.parentNode.insertBefore(style, bg);

	  image.onload = function(){
	    bg.style.opacity = 1;
	  };

	  for (var i = 0; i < images.length; i++){
	    var img = images[i].split(/\s/);
	    urls.push(img[0])         
	    sizes.push(parseInt(img[1] || 0))         
	  }

	  size = Math.min.apply(null, sizes);

	  for (var i = 0; i < sizes.length; i++){
	    var ww = window.outerWidth;

	    if (ww > sizes[i]) size = sizes[i+1] ? i+1 : i;
	  }
	  
	  image.src = urls[size];
	}

	/**
	 * Write CSS
	 */
	function generateStyle(images){
	  var css = '',
	      node = document.createElement('style');

	  for (var i = 0; i < images.length; i++){  
	    var image = images[i].split(/\s/);
	    if (image[1]){
	      css 
	        +='@media (min-width: '+image[1]+'px){'
	          +'[data-src] { background-image: url("'+image[0]+'")}'
	        +'}'
	    } else {
	      css += '[data-src] { background-image: url("'+image[0]+'")}'
	    }
	  }
	  
	  node.innerHTML = css;
	  return node;
	}

	/**
	 * TODO
	 * would love to strip these attributes after we're done with them
	 */
	function readAttr(el){
	  var raw = el.getAttribute('data-src');
	  
	  return raw.split(/\,\s/);
	}
>>>>>>> Responsive bg images


/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Social networks. 
	 * Query parameters are separated by '|',
	 * values are templated using double-bracket
	 * syntax i.e. {{value}}
	 */
	var networks = {
		pinterest: 'https://pinterest.com/pin/create/bookmarklet/?|media={{image}}|&url={{url}}|&description={{description}}',
		facebook: 'http://www.facebook.com/sharer.php?|u={{url}}',
		twitter: 'https://twitter.com/share?|url={{url}}|&text={{description}}|&via={{via}}|&hashtags={{hashtags}}'
	}

	var app = {
	  /**
	   * Receives data to fill 
	   * share URLs
	   */
		meta: {},

	  /**
	   * This is the attribute placed
	   * on links you want to share
	   */
	  target: 'data-social',

	  /**
	   * 1. Get data
	   * 2. Get targets
	   * 3. On click, parse URL with optional
	   * params and fire share popup
	   */
		init: function(){
			var targets, meta;

			this.parseMeta();
			
			targets = Array.prototype.slice.call(document.querySelectorAll('['+this.target+']'));

			targets.forEach(function(target, i){
				target.addEventListener('click', function(e){
					e.preventDefault();

	        app.open(app.generateURL(target));
				});
			});
		},

	  /**
	   * Parse local params from data-social
	   * attribute, combine with header meta
	   * data and instert into URLs
	   *
	   * @param {node} target The element that was clicked
	   */
	  generateURL: function(target){
	    var data,
	        opts = target.getAttribute(this.target).split(/\s/),
	        network = opts[0],
	        locals = opts[1] ? JSON.parse(opts[1]) : {},
	        params = networks[network].split(/\|/);

	    /** 
	     * Join head meta and locals
	     */
	    data = Object.assign(locals, app.meta);

	    /**
	     * Iterate over each query parameter 
	     * in URL. If we have data, insert it.
	     * If not, remove the query parameter.
	     */
	    for (var i = 1; i < params.length; i++){
	      var type = params[i].split(/{{|}}/g)[1];
	      if (data[type]){
	        params[i] = params[i].replace(/{{.*?}}/g, function(str){
	          return encodeURI(data[type])
	        });
	      } else {
	        params.splice(i, 1);
	        i = i-1; // reset i
	      }
	    }

	    return params.join('');
	  },

	  /**
	   * Parse metadata from meta tags in head
	   */
		parseMeta: function(){
	    var value,
	        props = [],
	        head = document.getElementsByTagName('head')[0],
	        metaTags = [].slice.call(head.getElementsByTagName('meta'));

	    metaTags.forEach(function(tag){
	      let attrs = [].slice.call(tag.attributes);

	      for (var i = 0; i < attrs.length; i++){
	        /** If a Twitter or Open Graph tag */
	        if (attrs[i].nodeName.match(/name|property/) && attrs[i].value.match(/twitter|og/)){
	          let name = attrs[i].value.split(/\:/)[1];
	          /** Push to array of property values */
	          props.push({
	            name: name, 
	            selector: attrs[i].nodeName+'="'+attrs[i].value+'"',
	            attr: 'content' 
	          });
	        }
	      }
	    });

	    /**
	     * For each property object,
	     * if the corresponding data reference exists,
	     * assign the meta tag's value
	     */
			for (var i = 0; i < props.length; i++){
	      value = head.querySelector('['+props[i].selector+']').getAttribute([props[i].attr]);
	      if (value) this.meta[props[i].name] = value;
			}
	  },

	  /**
	   * Open a popup
	   *
	   * @param {string} url Url to open
	   */
	  open: function(url){
	    var width = 500,
	        height = 300,
	        left = (screen.width / 2) - (width / 2),
	        top = (screen.height / 2) - (height / 2);

	    window.open(url,'','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+width+',height='+height+',top='+top+',left='+left)
	  },
	}

	function Social(opts){
		app.init(opts);
	}

	module.exports = Social;


/***/ }
/******/ ]);