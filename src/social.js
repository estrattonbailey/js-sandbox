var networks = {
	pinterest: 'https://pinterest.com/pin/create/bookmarklet/?media={{og:image}}&url={{url}}&description={{description}}',
	facebook: 'http://www.facebook.com/sharer.php?u={{url}}',
	twitter: 'https://twitter.com/share?url={{url}}&text={{description}}'
}

var app = {
	meta: {},
	init: function(opts){
		var targets, meta;

		options = {
			target: '[data-social]'
		}

		this.parseMeta();

		console.log(this.meta['og:image']);
		
		targets = Array.prototype.slice.call(document.querySelectorAll(options.target));

		targets.forEach(function(target, i){
			targets[i].addEventListener('click', function(e){
				e.preventDefault();

				var network = target.getAttribute(options.target),
						url = networks[network].replace(/{{($&)}}/, function(str){
							console.log(url);
						}
			});
		});
	},
	parseMeta: function(prop){
		var head, props;

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
				name: 'og:title',
				selector: '[property="og:title"]',
				attr: 'content'
			},
			{
				name: 'og:description',
				selector: '[property="og:description"]',
				attr: 'content'
			},
			{
				name: 'og:image',
				selector: '[property="og:image"]',
				attr: 'content'
			},
			{
				name: 'og:url',
				selector: '[property="og:url"]',
				attr: 'content'
			}
		];

		for (var i = 0; i < props.length; i++){
			this.meta[props[i].name] = head.querySelector(props[i].selector).getAttribute([props[i].attr]);
		}
	}
}

function Social(opts){
	app.init(opts);
}

module.exports = Social;
