var lookout = require('../../lookoutjs/dist/index.js');

function form(args){
  var form, 
      nodes,
      inputs = {}, 
      target = {};

  form = document.querySelector(args.form);

  if (Array.isArray(args.inputs)){
    args.inputs.forEach(function(input, i){
      nodes = Array.prototype.slice.call(form.querySelectorAll(input.el));

      if (inputs[input.event]){
        nodes.forEach(function(el){
          inputs[input.event].push(el)
        });
      } else {
        inputs[input.event] = nodes 
      }
    });
  } else if (typeof args.inputs === 'string'){
    nodes = Array.prototype.slice.call(form.querySelectorAll(args.inputs));
    inputs['change'] = nodes;
  }

  // console.log(inputs)

  Object.keys(inputs).forEach(function(k){
    bind(inputs[k], k);
  });

  function bind(elements, event){
    console.log(elements)
    elements.forEach(function(el, i){
      target[el.getAttribute('name')] = el.value;

      el.addEventListener(event, function(){
        target[el.getAttribute('name')] = el.value
      }, false);
    });
  }

  target = lookout(target);

  return target;
}

// var dateTime = form({
//   form: '.js-form',
//   inputs: '.js-input'
// });
var dateTime = form({
  form: '.js-form',
  inputs: [
    {
      el: '.js-input', 
      validate: 'integer',
      event: 'change'
    },
    {
      el: '.js-company', 
      validate: 'length',
      event: 'keyup'
    },
    {
      el: '.js-address', 
      validate: 'length',
      event: 'change'
    }
  ] 
});

console.dir(dateTime);

dateTime.watch('company', function(val){
  console.log(val)
});
dateTime.watch('address', function(val){
  console.log(val)
});
