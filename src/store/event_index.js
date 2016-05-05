var event = require('./event.js');

event.on(document, '.js-button', 'click', function(e){
  console.log(this, e)
});
event.on('.js-button-2', 'click', function(e){
  console.log(this, e)
});


setTimeout(function(){
  event.off();
}, 5000);
