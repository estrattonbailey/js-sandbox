window.app = {};

/**
 * Parse data from context element attribute
 *
 * @param {object} el Context element
 * @param {string} type Classification of script
 */
function prep(el, type){
  var raw,
      sequences;

  window.app[type] = {};

  raw = el.getAttribute('data-'+type)

  sequences = raw.indexOf(',') ? raw.split(/\,\s|\,/) : raw

  sequences.forEach(function(seq){
    var _return,
        namespace,
        args,
        context,
        snippets = [],
        params = [];

    namespace = seq.split(/\s\#/)[1] || null;

    if (namespace) {
      seq = seq.slice(0, seq.match(/\s\#/).index)
    }

    /**
     * If snippet has params,
     * we need to set them up to be
     * passed to the script
     */
    if (seq.indexOf('--') > -1){
      args = seq.split(/\s\-\-\s/);

      snippets = args[1].split(/\s\|\s/);

      params = [].map.call(args[0].split(/\s/), function(param){
        return param.replace(/\'/g,'');
      });
    } 
    
    /**
     * Otherwise, we only have one snippet,
     * and we can just call it at that.
     */
    else {
      snippets.push(seq);
    }

    /**
     * Main function. Must be the LAST snippet
     * passed to the attribute
     */
    context = snippets[snippets.length - 1];

    // Remove the context snippet from the array
    snippets.splice(snippets.length -1, 1)

    // Create object to pass to init()
    _return = {
      context: context,
      snippets: snippets,
      params: params || []
    }

    /** 
     * Run init() to fire all snippets
     * and initialize context script
     */
    init(el, _return, type);
  });
}

/**
 * Find scripts and fire them
 *
 * @param {object} el DOM node
 * @param {object} args {context: fn(), snippets: [fns()], params: []}
 * @param {string} type Classification of script
 */
function init(el, args, type){
  var context,
      returnData,  
      fns = [];

  /**
   * Set default param data
   */
  returnData = args.params

  /**
   * Find js snippets and add to 
   * fns array to be called next
   */
  try {
    context = require(type+'s/'+args.context)
  } catch(e) {
    console.log(e.toString())
  }

  for (var s = 0; s < args.snippets.length; s++){
    try {
      fns[s] = require('./'+args.snippets[s]+'.js')
    } catch(e) {
      console.log(e.toString())
    }
  }

  /**
   * Scrub data through utility functions
   */
  if(fns.length) {
    for (var i = 0; i < fns.length; i++){
      returnData = fns[i](args.params);
      fns[i+1] ? fns[i+1](returnData) : null;
    }
  }

  /**
   * Fire main snippet
   */
  var instance = new context(el, returnData)

  if (args.namespace) {
    window.app[type][args.namespace] = instance;
  }

  if (typeof jQuery !== 'undefined'){
    $(el).data(type, instance);
  }
}

module.exports = prep;
