var lookout = require('../../lookoutjs/dist/index.js');

function form(args){
  var outer, inputs, 
      target = {};

  outer = document.querySelector(args.outer);
  inputs = Array.prototype.slice.call(outer.querySelectorAll(args.inputs));

  inputs.forEach(function(el, i){
    target[el.getAttribute('name')] = el.value;
  });

  target = lookout(target);

  return target;
}

var test = form({
  outer: '.js-form',
  inputs: '.js-input'
});

console.dir(test);
