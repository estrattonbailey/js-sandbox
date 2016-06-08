var lookout = require('./lookout.js');

var obj = {
  name: 'Eric', 
  meta: {
    bday: '1992-02-14'
  }
}

var o = lookout(obj)

console.dir(o)

// o.watch('name', function(val){
//   console.log(val)
// })
// o.watch('meta.bday', function(val){
//   console.log(val)
// })

setTimeout(function(){
  // o.name = 'Ryan'
  o.meta.bday = '1990-05-08'
}, 1000)

