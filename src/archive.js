window.addEventListener('load', function(){
  var bgs = [].slice.call(document.querySelectorAll('.js-bg-image'));
  
  bgs.forEach(function(bg){
    var images = readAttr(bg);
    var style = generateStyle(images);
    
    setBg(images, style, bg)
  });
}, false);

/**
 * Lazy load, 
 * should set class to element too
 */
function setBg(images, style, bg){
  var currentImage,
      ww = window.outerWidth,
      image = new Image();
  
  image.onload = function(){
    bg.style.backgroundImage += 'url('+currentImage+')';
    bg.parentNode.insertBefore(style, bg);
  };
  
  // TODO
  // didn't bother with this for now
  Object.keys(images).forEach(function(size, i){
    currentImage = images[size];
    return;
  })
  
  image.src = currentImage;
}

/**
 * Write CSS
 */
function generateStyle(images){
  var css = '',
      node = document.createElement('style');
  
  Object.keys(images).forEach(function(size){
    css 
      +='@media (min-width: '+size+'px){'
        +'.js-bg-image { background-image: url("'+images[size]+'") !important}'
      +'}'
  });
  
  node.innerHTML = css;
  return node;
}

/**
 * TODO
 * would love to strip these attributes after we're done with them
 */
function readAttr(el){
  var parsed = {},
      attrs = [].slice.call(el.attributes);
  
  attrs.forEach(function(attr){
    if (attr.name.indexOf('data-src-') > -1){
      parsed[attr.name.split('-')[2]] = attr.nodeValue;
    }
  });
  
  return parsed;
}
