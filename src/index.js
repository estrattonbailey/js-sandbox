var lookout = require('../../lookoutjs/dist/index.js');

function form(args){
  var form, 
      nodes,
      fields = args.fields || [],
      nodesArray = [],
      inputs = {}, 
      target = {};

  /*
   * inputs = {
   *  change: [
   *    {
   *      el: domNode,
   *      validation: 'integer'
   *    },
   *    ...
   *  ]
   * }
   *
   * target = {
   *  firstName: 'Eric', 
   *  lastName: 'Bailey'
   *  ...
   * }
   */

  form = document.querySelector(args.form);

  if (Array.isArray(fields)){
    args.fields.forEach(function(field,i){
      field.nodes = Array.prototype.slice.call(form.querySelectorAll(field.el));

      field.nodes.forEach(function(node,i){
        target[node.getAttribute('name')] = node.value

        node.addEventListener(field.event, function(){
          target[node.getAttribute('name')] = node.value
        }, false);
      });
    });
  }

  target = lookout(target);

  console.log(target)

  /*
  if (Array.isArray(args.inputs)){
    args.inputs.forEach(function(input, i){
      nodes = Array.prototype.slice.call(form.querySelectorAll(input.el));

      for (var l = 0; l < nodes.length; l++){
        nodesArray.push({
          el: nodes[l],
          validation: args.inputs[i].validation
        });
      }

      if (inputs[input.event]){
        for (var l = 0; l < nodes.length; l++){
          inputs[input.event].push(nodesArray[l]);
        }
      } else {
        inputs[input.event] = nodesArray 
      }
    });
  } else if (typeof args.inputs === 'string'){
    nodes = Array.prototype.slice.call(form.querySelectorAll(args.inputs));

    for (var l = 0; l < nodes.length; l++){
      nodesArray.push({
        el: nodes[l],
        validation: args.inputs[i].validation
      });
    }

    inputs['change'] = nodesArray;
  }

  console.log(inputs)

  function build(elements){
    elements.forEach(function(el, i){
      target[el.getAttribute('name')] = el.value;
    });
  }

  function bind(elements, element, event){
    elements.forEach(function(el, i){
      el.addEventListener(event, function(){
        target[el.getAttribute('name')] = el.value
      }, false);

      Object.defineProperty(target, el.getAttribute('name'), {
        get: function(){
          return this.props[el.getAttribute('name')]
        }
      });
    });
  }

  Object.keys(inputs).forEach(function(k){
    build(inputs[k]);
  });

  target = lookout(target);

  Object.keys(inputs).forEach(function(k,i){
    bind(inputs[k], k)
  });
  */

  return target;
}

// var dateTime = form({
//   form: '.js-form',
//   inputs: '.js-input'
// });
var dateTime = form({
  form: '.js-form',
  fields: [
    {
      el: '.js-input', 
      validation: 'integer',
      event: 'change'
    },
    {
      el: '.js-company', 
      validation: 'length',
      event: 'keyup'
    },
    {
      el: '.js-address', 
      validation: 'length',
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

console.log(dateTime.age)
