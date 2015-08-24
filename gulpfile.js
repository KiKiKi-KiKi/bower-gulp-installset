var cssFileName = '_bundle.css';
var cssDir = 'dev/assets/css/'; // cssを出力するディレクトリ
var cssLibDir = cssDir + '/lib/'; // CSSのライブラリを出力するディレクトリ
var jsFileName = '_bundle.js';
var jsDir = 'dev/assets/js/'; // jsを出力するディレクトリ

var gulp       = require("gulp"),
    bower      = require('main-bower-files'),
    gulpFilter = require('gulp-filter'),
    concat     = require("gulp-concat"),
    rename     = require('gulp-rename'),
    less       = require('gulp-less'),
    minifyCss  = require("gulp-minify-css"),
    uglify     = require("gulp-uglify");

// bowerで導入したパッケージのCSSを取ってくるタスク
gulp.task('bowerCSS', function() {
  var cssFilter  = gulpFilter('**/*.css', {restore: true}),
      lessFilter = gulpFilter('**/*.less', {restore: true}); // Bootstrapのコアがlessなのでlessをファイルを抽出するフィルター
  return gulp.src( bower({
      paths: {
        bowerJson: 'bower.json'
      }
    }) )
    .pipe( cssFilter )
    .pipe( rename({
      prefix: '_',
      extname: '.css'
    }) )
    .pipe( gulp.dest(cssLibDir) )
    // LESSファイルを抽出
    .pipe( cssFilter.restore )
    .pipe( lessFilter )
    // LESSをコンパイル
    .pipe( less() )
    .pipe( rename({
      prefix: '_',
      extname: '.css'
    }) )
    // filter.restoreする前にgulp.destで出力しないとフィルター外のファイルも出力されてしまう
    .pipe( gulp.dest(cssLibDir) )
    .pipe( lessFilter.restore );
});

// パッケージのCSSを1つに結合してmin化するタスク
gulp.task('bowerCSS.concat', ['bowerCSS'] ,function() {
  return gulp.src(cssLibDir + '_*.css')
    .pipe( concat(cssFileName) )
    // CSSを1つにしたものを出力
    .pipe( gulp.dest(cssDir) )
    .pipe( minifyCss() )
    .pipe( rename({
      extname: '.min.css'
    }) )
    // CSSを1つにしてmin化したものを出力
    .pipe( gulp.dest(cssDir) );
});

// bowerで導入したパッケージのjsを取ってきて1つにまとめるタスク
gulp.task('bowerJS', function() {
  var jsFilter = gulpFilter('**/*.js', {restore: true}); // jsファイルを抽出するフィルター
  return gulp.src( bower({
      paths: {
        bowerJson: 'bower.json'
      }
    }) )
    .pipe( jsFilter )
    .pipe( concat(jsFileName) )
    // jsを1つにしたものを出力
    .pipe( gulp.dest(jsDir) )
    .pipe( uglify({
      // !から始まるコメントを残す
      preserveComments: 'some'
    }) )
    .pipe( rename({
      extname: '.min.js'
    }) )
    // jsを1つにしてmin化したものを出力
    .pipe( gulp.dest(jsDir) )
    .pipe( jsFilter.restore );
});

// bowerのCSSとJSを取ってくるタスク
gulp.task('bower.init', ['bowerCSS', 'bowerCSS.concat','bowerJS']);
