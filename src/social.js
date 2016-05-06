var networks = {
	pinterest: 'https://pinterest.com/pin/create/bookmarklet/?|media={{image}}|&url={{url}}|&description={{description}}',
	facebook: 'http://www.facebook.com/sharer.php?|u={{url}}',
	twitter: 'https://twitter.com/share?|url={{url}}|&text={{twitter:description}}|&via={{via}}|&hashtags={{hashtags}}'
}

var app = {
	meta: {},
  target: 'data-social',
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
  generateURL: function(target){
    var data,
        opts = target.getAttribute(this.target).split(/\s/),
        network = opts[0],
        locals = opts[1] ? JSON.parse(opts[1]) : {},
        params = networks[network].split(/\|/);

    data = Object.assign(locals, app.meta);

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
	parseMeta: function(prop){
		var head, props, value;

		head = document.getElementsByTagName('head')[0];

		props = [
			{
				name: 'canonical',
				selector: '[rel="canonical"]',
				attr: 'href'
			},
			{
				name: 'description',
				selector: '[name="description"]',
				attr: 'content'
			},
			{
				name: 'title',
				selector: '[property="og:title"]',
				attr: 'content'
			},
			{
				name: 'description',
				selector: '[property="og:description"]',
				attr: 'content'
			},
			{
				name: 'image',
				selector: '[property="og:image"]',
				attr: 'content'
			},
			{
				name: 'url',
				selector: '[property="og:url"]',
				attr: 'content'
			},
			{
				name: 'twitter:title',
				selector: '[name="twitter:title"]',
				attr: 'content'
			},
			{
				name: 'twitter:description',
				selector: '[name="twitter:description"]',
				attr: 'content'
			},
			{
				name: 'twitter:image',
				selector: '[name="twitter:image"]',
				attr: 'content'
			}
		];

		for (var i = 0; i < props.length; i++){
      value = head.querySelector(props[i].selector).getAttribute([props[i].attr]);
      if (value) this.meta[props[i].name] = value;
		}
  },
  open: function(url){
    var width = 500,
        height = 300,
        left = (screen.width / 2) - (width / 2),
        top = (screen.height / 2) - (height / 2);

    window.open(url,'',
                'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+width+',height='+height+',top='+top+',left='+left)
  },
}

function Social(opts){
	app.init(opts);
}

module.exports = Social;
