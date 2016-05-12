var types = [
  'module', 
  'component'
]

document.addEventListener('DOMContentLoaded', function(){
  function init(el, args, type){
    var fns = [];

    for (var s = 0; s < args.snippets.length; s++){
      try {
        fns[s] = require(type+'s/'+args.snippets[s]);
      } catch(e) {
        console.log(e.toString());
      }
    }

    if(fns.length) {
      var main = fns[fns.length - 1];

      fns.splice(fns.length - 1, 1);

      for (var i = 0; i < fns.length; i++){
        var _return = fns[i](args.params);
        fns[i+1] ? fns[i+1](_return) : null;
      }

      var instance = new main(el, _return)

      if (typeof jQuery !== 'undefined'){
        $(el).data('module', instance);
      }
    }
  }

  types.forEach(function(type){
    nodes = [].slice.call(document.querySelectorAll('[data-'+type+']'));

    for (var i = 0; i < nodes.length; i++){
      init(nodes[i], parseAttr(nodes[i]), type)
    }
  });
});

function parseAttr(div){
  var raw, 
      args,
      snippets,
      params = [];

  raw = div.getAttribute('data-module');

  args = raw.split(/\s\-\-\s/);

  snippets = args[1].split(/\s\|\s/);

  params = [].map.call(args[0].split(/\s/), function(param){
    return param.replace(/\'/g,'');
  });

  return {
    snippets: snippets,
    params: params
  }
}
