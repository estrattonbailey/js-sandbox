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
