var del = document.documentElement || {};
var _match = (del.matches || del.webkitMatchesSelector || del.mozMatchesSelector || del.oMatchesSelector || del.msMatchesSelector || function(){return false;});

var buckets = {};

var methods = {
  on: function(event, target, callback){
    this.bind.call(this, event, target, callback)
  },
  bind: function(event, target, callback){
    if (!this.node){
      return;
    }

    if (!callback && typeof(target) == 'function'){
      callback = target;
      target = 'body';
    }

    this.event = event;
    this.target = target;
    this.callback = callback;

    this.node.addEventListener(event, this.handleEvent.bind(this), false);
  },
  send: function(){
    if (buckets[this.path]){
      buckets[this.path].push(this)
    } else {
      buckets[this.path] = [this]
    }

    this.callback(event);
  },
  off: function(){
    console.log('off')
    this.node.removeEventListener(this.event, this.handleEvent, false)
  },
  handleEvent: function(){
    event.currentTarget = this.node;

    if (this.findTarget(event)){
      this.send()
    } else {
      console.log('Nope')
    }
  },
	findTarget: function(e){
		var search = e.target;

    if (_match.call(search, this.target)){
      return true
    } else {
      for (; search;) {
        search = search.parentNode;

        // If it finds a match
        if (_match.call(search, this.target)){
          return true;
        }

        // If it doesn't, it will search up to the parent context
        if (search === e.currentTarget){
          return false;
        }
      }
    }
	}
}
function listen(node){
  var _listen = Object.create(methods, {
    node: {
      value: node || null
    },
    path: {
      value: window.location.href 
    }
  });

  return _listen;
}

var outer = document.querySelector('.js-outer');

var test = listen(outer);

test.on('click', '.js-button', function(e){
  console.log(e)
  console.log(buckets)
});

setTimeout(function(){
  test.off();
}, 5000);
