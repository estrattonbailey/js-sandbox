var MODE
var args = process.argv
var path = require('path')
var glob = require('glob')
var fs = require('fs')
var browserify = require('browserify')
var watchify = require('watchify')
var exorcist = require('exorcist')
var shim = require('browserify-shim')

if (args[2] === '--dev'){
  MODE = 'DEVELOPMENT'
} else {
  MODE = 'PRODUCTION'
}

/**
 * INIT Browserify
 */
var b = browserify({
  entries: ['./src/js/main.js'],
  transform: [ 
    [shim, 
      { global: true }
    ], 
    [ "babelify",
      {
        "presets": [
          "es2015",
          "react"
        ]
      }
    ]
  ],
  debug: true, // gen sourcemap
  cache: {},
  packageCache: {}
});

/**
 * Watchify Plugin 
 */
b.plugin(watchify)

/**
 * Default Bundler Plugin 
 */
b.plugin(bundle, { 
  delay: 0 
});

/**
 * Minify Plugin 
 * In dev mode, don't minify
 */
if (MODE === 'PRODUCTION'){
  b.plugin('minifyify', {
    map: './dist/main.min.js.map'
  });
}

/**
 * Watchify emitted 'update' event 
 */
b.on('update', bundle) // on any dep update, runs the bundler

/**
 * Emit 'X bytes written (Y seconds)' 
 */
b.on('log', console.log)

/**
 * Manually import modules/components
 */
b.require(function(){
  var Files = glob.sync('./src/js/+(components|modules|lib)/*.js')
  var files = []

  for(var i = 0; i < Files.length; i++) {
    var name = path.basename(Files[i], '.js'),
        dirname = path.dirname(Files[i]).split('/'),
        dir = dirname[dirname.length - 1];

    files.push({
      file: Files[i],
      expose: dir+'/'+name
    });
  }

  return files
}());

/**
 * DEFAULT Bundler Function
 */
function bundle() {
  b.bundle()
    .pipe(exorcist('./dist/main.min.js.map'))
    .pipe(fs.createWriteStream('./dist/assets/main.min.js'))
}
