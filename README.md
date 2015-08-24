# bower-gulp-installset

### startup
```
$ npm init
```

### install package!
```
$ bower init
```
crearte bower.json  
  
install package  
```
$ bower install --save <name>
```

### change js, css generated directory & file name
open `gulpfile.js`  

```javascript
// concat & generated CSS file name
var cssFileName = '_bundle.css';
// CSS directory
var cssDir = 'dev/assets/css/';
// CSS library directory
var cssLibDir = cssDir + '/lib/';
// concat & generated js file name
var jsFileName = '_bundle.js';
// JS directory
var jsDir = 'dev/assets/js/';
```


### run gulp
```
$ gulp bower.init
```
