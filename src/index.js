window.addEventListener('load', function(){
  var bgs = [].slice.call(document.querySelectorAll('[data-src]'));
  
  for (var i = 0; i < bgs.length; i++){
    var images = readAttr(bgs[i]);
    var style = generateStyle(images);
    
    setBg(images, style, bgs[i])
  };
}, false);

/**
 * Lazy load, 
 * should set class to element too
 */
function setBg(images, style, bg){
  var size,
      urls = [],
      sizes = [],
      ww = window.outerWidth,
      image = new Image();
  
  bg.style.opacity = 0;

  bg.parentNode.insertBefore(style, bg);

  image.onload = function(){
    bg.style.opacity = 1;
  };

  for (var i = 0; i < images.length; i++){
    var img = images[i].split(/\s/);
    urls.push(img[0])         
    sizes.push(parseInt(img[1] || 0))         
  }

  size = Math.min.apply(null, sizes);

  for (var i = 0; i < sizes.length; i++){
    var ww = window.outerWidth;

    if (ww > sizes[i]) size = sizes[i+1] ? i+1 : i;
  }
  
  image.src = urls[size];
}

/**
 * Write CSS
 */
function generateStyle(images){
  var css = '',
      node = document.createElement('style');

  for (var i = 0; i < images.length; i++){  
    var image = images[i].split(/\s/);
    if (image[1]){
      css 
        +='@media (min-width: '+image[1]+'px){'
          +'[data-src] { background-image: url("'+image[0]+'")}'
        +'}'
    } else {
      css += '[data-src] { background-image: url("'+image[0]+'")}'
    }
  }
  
  node.innerHTML = css;
  return node;
}

/**
 * TODO
 * would love to strip these attributes after we're done with them
 */
function readAttr(el){
  var raw = el.getAttribute('data-src');
  
  return raw.split(/\,\s/);
}
