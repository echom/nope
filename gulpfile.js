var gulp = require('gulp'),
		concat = require('gulp-concat'),
		rename = require('gulp-rename'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify'),
		jsdoc = require('gulp-jsdoc'),
		gutil = require('gulp-util'),
		karma = require('karma');

var paths = {
	src: [
		'src/nope.js',
		'src/Element.js',
		'src/build/ElementBuilder.js',
		'src/build/MetaBuilder.js',
		'src/build/HeadBuilder.js',
		'src/build/HtmlBuilder.js'
	],
	unit: 'src/**/*_spec.js'
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

gulp.task('build:mocks', function() {
	return gulp.src('src/**/*_mock.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(concat('nope-mocks.js'))
	.pipe(gulp.dest('dist'));
});

gulp.task('unit', ['build', 'build:mocks'], function(done) {
  new karma.Server({
		browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      'dist/nope.js',
			'dist/nope-mocks.js',
      'src/**/*_spec.js'
    ],
    singleRun: true
  }, done).start();
});

gulp.task('document', ['build'], function() {
	return gulp.src(paths.src)
		.pipe(jsdoc.parser())
		.pipe(jsdoc.generator('dist/docs', null, {
			showPrivate: false,
			outputSourceFiles: false
		}));
});

gulp.task('default', ['build']);
