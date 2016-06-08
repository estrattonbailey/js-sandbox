var lookout = require(__dirname+'/../../lookoutjs/index.js');

window.Lookout = lookout({
  name: 'Eric',
  meta: {
    title: 'Old Object'
  }
})

Lookout.watch('name', function(val){
  console.log(val)
})
Lookout.watch('meta', function(val){
  console.log(val)
})

setTimeout(function(){
  Lookout.name = 'Ryan'
  Lookout.meta.title = 'New Title'  
}, 1000)

