var gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  shell = require('gulp-shell'),
  gutil = require('gulp-util'),
  karma = require('karma'),
	karmaConfigure = require('./tools/karma-configure');

var paths = {
  src: [
    'src/nope.js',
    'src/Attributes.js',
    'src/Element.js',
    'src/builder/ElementBuilder.js',
    'src/builder/MetaBuilder.js',
    'src/builder/HeadBuilder.js',
    'src/builder/BodyBuilder.js',
    'src/builder/HtmlBuilder.js'
  ],
  min: 'dist/nope.min.js',
  max: 'dist/nope.js',
  mocks: 'src/**/*_mock.js',
  specs: 'src/**/*_spec.js'
};

gulp.task('build', function() {
  return gulp.src(paths.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('nope.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify()).on('error', gutil.log)
    .pipe(rename('nope.min.js'))
    .pipe(gulp.dest('dist'));
});

// gulp.task('build:mocks', function() {
//   return gulp.src(paths.mocks)
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
//     .pipe(concat('nope-mocks.js'))
//     .pipe(gulp.dest('dist'));
// });

gulp.task('unit:dist', ['unit:coverage', 'build'], function(done) {
  new karma.Server(karmaConfigure({
    browsers: ['PhantomJS'],
    reporters: ['dots'],
		src: paths.min,
		mocks: paths.mocks,
		specs: paths.specs,
    singleRun: true
  }), done).start();
});

gulp.task('unit:coverage', function(done) {
  new karma.Server(karmaConfigure({
    browsers: ['PhantomJS'],
    reporters: ['coverage'],
    coverageReporter: { type: 'html', dir: 'dist/coverage' },
		src: paths.src,
		mocks: paths.mocks,
		specs: paths.specs,
    singleRun: true
  }), done).start();
});

gulp.task('unit:live', function(done) {
  new karma.Server(karmaConfigure({
    browsers: ['Chrome'],
    reporters: ['dots', 'coverage'],
    coverageReporter: { type: 'text' },
		src: paths.src,
		mocks: paths.mocks,
		specs: paths.specs
  }), done).start();
});

gulp.task('unit:debug', function(done) {
  new karma.Server(karmaConfigure({
    browsers: ['Chrome'],
		src: paths.src,
		mocks: paths.mocks,
		specs: paths.specs
  }), done).start();
});

gulp.task('document', shell.task(['node_modules/.bin/jsdoc -c jsdoc.conf.json']));

gulp.task('umdhack:commonjs', function() {
  return gulp.src([
      'tools/umdhack/commonjs-prefix.js',
      'dist/nope.min.js',
      'tools/umdhack/commonjs-suffix.js'
    ])
    .pipe(concat('nope.commonjs.min.js'))
    .pipe(gulp.dest('dist'));
});



gulp.task('default', ['build', 'unit:dist', 'document', 'umdhack:commonjs']);
