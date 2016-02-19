var lookout = require('../../lookoutjs/dist/index.js');

function form(args){
  var form, 
      fields = args.fields || [],
      target = {};

  var validator = {
    url: /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
    date: /\d{4}-\d{1,2}-\d{1,2}/,
    numeric: /^[0-9]+$/,
    integer: /^\-?[0-9]+$/,
    decimal: /^\-?[0-9]*\.?[0-9]+$/,
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  }

  function isValidated(val, validation){
		var v = {
      integer: function(val){
        val = parseInt(val, 10);
        return validator.integer.test(val) ? true : false; 
      },
      email: function(val){
        return validator.email.test(val) ? true : false; 
      }
    }
    return v[validation](val);

  }

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

  args.fields.forEach(function(field,i){
    field.nodes = Array.prototype.slice.call(form.querySelectorAll(field.el));

    field.nodes.forEach(function(node,i){
      Object.defineProperty(target, node.getAttribute('name'), {
        set: function(val){
          if (isValidated(val, field.validation)){
            console.log('%cValidated!', 'color: #333; background-color:#bada55');
            this.props[node.getAttribute('name')] = val;
            this.publish(node.getAttribute('name'), val);
          } else {
            console.log('%cNot validated!', 'color: #333; background-color:#ff4567');
          }
        }
      });
    });
  });

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
      el: '.js-email', 
      validation: 'integer',
      event: 'keyup'
    }
  ] 
});

console.dir(dateTime);
