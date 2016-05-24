function Component(el, params){
  console.log('Component 1: '+el+' '+params)
  return {
    params: params,
    show: function(){

    },
    hide: function(){

    }
  } 
}

module.exports = Component;
