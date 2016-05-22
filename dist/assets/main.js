require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var initScripts=require("./lib/initScripts.js"),types=["module","component"];document.addEventListener("DOMContentLoaded",function(){types.forEach(function(e){nodes=[].slice.call(document.querySelectorAll("[data-"+e+"]"));for(var t=0;t<nodes.length;t++)initScripts(nodes[t],e)})});
},{"./lib/initScripts.js":"lib/initScripts"}],"components/component":[function(require,module,exports){
function Component(o,n){return console.log("Component 1: "+o+" "+n),"Component 1: "+o+" "+n}module.exports=Component;
},{}],"components/counter":[function(require,module,exports){
function counter(){console.log("Component")}module.exports=counter;
},{}],"lib/initScripts":[function(require,module,exports){
function prep(e,t){var n;n=e.getAttribute("data-"+t),sequences=n.indexOf(",")?n.split(/\,\s|\,/):n,sequences.forEach(function(n){var s,r,i,p=[],a=[];n.indexOf("--")>-1?(r=n.split(/\s\-\-\s/),p=r[1].split(/\s\|\s/),a=[].map.call(r[0].split(/\s/),function(e){return e.replace(/\'/g,"")})):p.push(n),i=p[p.length-1],p.splice(p.length-1,1),s={context:i,snippets:p,params:a||[]},init(e,s,t)})}function init(e,t,n){var s,r,i=[];r=t.params;try{s=require(n+"s/"+t.context)}catch(p){console.log(p.toString())}for(var a=0;a<t.snippets.length;a++)try{i[a]=require("lib/"+t.snippets[a])}catch(p){console.log(p.toString())}if(i.length)for(var l=0;l<i.length;l++)r=i[l](t.params),i[l+1]?i[l+1](r):null;var o=new s(e,r);"undefined"!=typeof jQuery&&$(e).data(n,o)}module.exports=prep;
},{}],"lib/util":[function(require,module,exports){
function Util(t){return t.push("added!"),t}module.exports=Util;
},{}],"modules/module2":[function(require,module,exports){
function Module(o,e){return console.log("Module 2: "+o+" "+e),"Module 2: "+o+" "+e}module.exports=Module;
},{}],"modules/module3":[function(require,module,exports){
function Module(o,e){return console.log("Module 3: "+o+" "+e),"Module 3: "+o+" "+e}module.exports=Module;
},{}],"modules/module4":[function(require,module,exports){
function Module(o,e){return console.log("Module 4: "+o+" "+e),"Module 4: "+o+" "+e}module.exports=Module;
},{}],"modules/module":[function(require,module,exports){
function Module(o,e){return console.log("Module 1: "+o+" "+e),"Module 1: "+o+" "+e}module.exports=Module;
},{}]},{},[1])


//# sourceMappingURL=main.js.map
