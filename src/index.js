window.proto = {
  data: [],
  listeners: [],
  set(obj){
    var exists = this._find(this);

    // console.log(this)
    // console.log(exists)

    if (!!exists && exists.length > 0 ){
      Object.keys(obj).forEach(function(k){
        exists[0][k] = obj[k] 
      });
    } else {
      this.data.push(obj);
    }
  },
  watch: function(key, cb){},
  _find: function(obj){
    console.log(obj)
    this.data.filter(function(o){
      console.log(o)
      return o.id === obj.id;
    })
  }
}

function observable(obj){
  var _o = Object.create(proto, {
    id: {
      writable: false,
      enumerable: false,
      value: new Date().getTime()
    }
  });

  Object.keys(obj).forEach(function(k){
    _o[k] = obj[k]
  });

  _o.set()

  return _o;
}

const user = observable({
  content: 'Hello world!',
  modified: 'Tuesday'
});


setTimeout(function(){
  user.set({
    date: 'Date!'
  });
}, 1000);

// console.dir(user)
