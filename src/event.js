var delegate = require('delegate'),
    sektor = require('sektor');

var events = [];

function addListener(target, event, callback){
  target = sektor(target) 

  for (var i = 0; i < target.length; i++){
    target[i].addEventListener(event, callback);
  }

  return {
    destroy: function(){
      for (var i = 0; i < target.length; i++){
        target[i].removeEventListener(event, callback)
      }
    }
  }
}

var Event = {
  on: function(root, target, event, callback){
    if (typeof event === 'function'){
      callback = event;
      event = target;
      target = root; 
      events.push(addListener(target, event, callback))
    } else {
      root = sektor(root) 
      for (var i = 0; i < root.length; i++){
        events.push(delegate(root[i], target, event, callback))
      }
    }
    console.log(events)
  },
  off: function(){
    for (var i = 0; i < events.length; i++){
      events[i].destroy();
    }
  }
}

module.exports = Event;
