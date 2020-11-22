const { src, dest, parallel, series, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const media = require('gulp-group-css-media-queries');
const ttf2woff2 = require('gulp-ttf2woff2');
const newer = require('gulp-newer');

function browsersync()
{
  browserSync.init({
    server: { baseDir: 'dist/'},
    online: true
  })
}

function scripts()
{
  return src('src/js/*.js')
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(rename({
    extname: '.min.js'
  }))
  .pipe(dest('dist/js/'))
  .pipe(browserSync.stream())
}

function html()
{
  return src('src/index.html')
  .pipe(dest('dist/'))
  .pipe(browserSync.stream())
}

function styles()
{
  return src('src/styles/style.scss')
  .pipe(sass())
  .pipe(media())
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 10 version'] , grid: true
  }))
  .pipe(clean())
  .pipe(rename({
    extname: '.min.css'
  }))
  .pipe(dest('dist/styles/'))
  .pipe(browserSync.stream())
}

function images()
{
  return src('src/images/**/*.{jpg, svg, png, gif, webp}')
  .pipe(newer('dist/images/'))
  .pipe(src('src/images/**/*.{jpg, svg, png, gif, webp}'))
  .pipe(newer('dist/images/'))
  .pipe(imagemin())
  .pipe(dest('dist/images/'))
}

function fonts()
{
  src('src/fonts/*ttf')
  .pipe(ttf2woff2())
  .pipe(dest('dist/fonts'))
}

function startwatch()
{
  watch('src/js/**/*.js', scripts)
  watch('src/*.html', html)
  watch('src/css/*.scss', styles)
  watch('src/images/*', images)
  watch('src/fonts/*', fonts)
}

const build = series(scripts, styles, html)
exports.default = parallel (build, browsersync, startwatch )

exports.fonts = fonts
exports.images = images
exports.browsersync = browsersync
exports.scripts = scripts
exports.html = html
