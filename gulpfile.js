
// cd to theme folder
//npm init
//npm install gulp --save-dev
//npm install es6-promise gulp-sass gulp-autoprefixer gulp-rename gulp-plumber gulp-util gulp-concat jshint gulp-jshint gulp-uglify gulp-imagemin browser-sync gulp-npm-check --save-dev
//npm install -D gulp-npm-check
//npm-check -u
//check to see if any plugins need updating
//change devURL

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const rename = require('gulp-rename');

const plumber = require('gulp-plumber');
const gutil = require('gulp-util');

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

const imagemin = require('gulp-imagemin');

const browserSync = require('browser-sync');
const devURL = 'http://localhost/and';

const onError = function(err) {
  console.log('Ann error occurred:' , gutil.colors.magenta(err.message));
  gutil.beep();
  this.emit('end');
}

function reload(done) {
  browserSync.reload();
  done();
}

gulp.task('sass', () => {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(autoprefixer({grid: true, browsers: '>1%'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('js', () => {
  return gulp.src([
    './src/js/global.js',
    // './src/js/sections.js',
    './src/js/menu.js',
    // './src/js/projects.js',
    './src/js/google-maps.js',
    './src/js/controller.js'
  ])
  .pipe(babel())
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(sourcemaps.init())
     .pipe(concat('scripts.js'))
     .pipe(rename({suffix: '.min'}))
     .pipe(uglify())
     .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
   .pipe(sourcemaps.write('./'))
   .pipe(gulp.dest('./dist/js'))
});

gulp.task('images', () => {
  return gulp.src([
    '!src/images/rocket.svg',
    './src/images/**/*',
  ])
  .pipe(plumber({errorHandler: onError}))
  .pipe(imagemin({optimizationLevel: 7, progressive: true}))
  .pipe(gulp.dest('./dist/images'))
});

gulp.task('watch', function(){
  browserSync.init({
    files: ['./**/*.php'],
    proxy: devURL
  })
  gulp.watch('./src/sass/**/*.scss', gulp.series(['sass', reload]));
  gulp.watch('./src/js/*.js', gulp.series(['js', reload]));
  gulp.watch('./src/images/*', gulp.series(['images', reload]));
});


gulp.task('default', gulp.series(['sass', 'js', 'images', 'watch']));

