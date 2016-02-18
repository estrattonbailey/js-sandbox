var lookout = require('../../lookoutjs/dist/index.js');

function form(args){
  var outer, inputs, 
      target = {};

  outer = document.querySelector(args.outer);
  inputs = Array.prototype.slice.call(outer.querySelectorAll(args.inputs));

  inputs.forEach(function(el, i){
    target[el.getAttribute('name')] = el.value;

    el.addEventListener('change', function(){
      target[el.getAttribute('name')] = el.value
    }, false);
  });

  target = lookout(target);

  return target;
}

var test = form({
  outer: '.js-form',
  inputs: '.js-input'
});

console.dir(test);

test.watch('age', function(val){
  console.log(val)
});

test.watch('firstName', function(val){
  console.log(val)
});
test.watch('lastName', function(val){
  console.log(val)
});
