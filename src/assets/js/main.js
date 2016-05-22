var initScripts = require('./lib/initScripts.js');

var types = [
  'module', 
  'component'
]

document.addEventListener('DOMContentLoaded', function(){
  /**
   * Find all specified elements
   * in the DOM and init their 
   * javascripts
   */
  types.forEach(function(type){
    nodes = [].slice.call(document.querySelectorAll('[data-'+type+']'));

    for (var i = 0; i < nodes.length; i++){
      initScripts(nodes[i], type);
    }
  });
});