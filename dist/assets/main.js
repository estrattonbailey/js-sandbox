require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function parseAttr(e){var t,n,r,s=[];return t=e.getAttribute("data-module"),n=t.split(/\s\-\-\s/),r=n[1].split(/\s\|\s/),s=[].map.call(n[0].split(/\s/),function(e){return e.replace(/\'/g,"")}),{snippets:r,params:s}}var types=["module","component"];document.addEventListener("DOMContentLoaded",function(){function e(e,t,n){for(var r=[],s=0;s<t.snippets.length;s++)try{r[s]=require(n+"s/"+t.snippets[s])}catch(a){console.log(a.toString())}if(r.length){var o=r[r.length-1];r.splice(r.length-1,1);for(var l=0;l<r.length;l++){var p=r[l](t.params);r[l+1]?r[l+1](p):null}var i=new o(e,p);"undefined"!=typeof jQuery&&$(e).data("module",i)}}types.forEach(function(t){nodes=[].slice.call(document.querySelectorAll("[data-"+t+"]"));for(var n=0;n<nodes.length;n++)e(nodes[n],parseAttr(nodes[n]),t)})});
},{}],"components/counter":[function(require,module,exports){
function counter(){console.log("Component")}module.exports=counter;
},{}],"modules/module":[function(require,module,exports){
function Module(o,e){return console.log("Worked: "+o+" "+e),"Worked: "+o+" "+e}module.exports=Module;
},{}],"modules/util":[function(require,module,exports){
function Util(t){return t.push("added!"),t}module.exports=Util;
},{}]},{},[1])


//# sourceMappingURL=main.js.map
