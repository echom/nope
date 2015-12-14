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

gulp.task('build:mocks', function() {
	return gulp.src(paths.mocks)
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(concat('nope-mocks.js'))
	.pipe(gulp.dest('dist'));
});

gulp.task('unit:dist', ['build', 'build:mocks'], function(done) {
  new karma.Server({
		browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      'dist/nope.js',
			'dist/nope-mocks.js',
      'src/**/*_spec.js'
    ],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'dist/nope.js': ['coverage']
    },
    coverageReporter: { type : 'html', dir : 'dist/coverage' },
    singleRun: true
  }, done).start();
});

gulp.task('unit:live', function(done) {
  new karma.Server({
		browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: paths.src.concat([paths.mocks, paths.specs])
  }, done).start();
});

gulp.task('document', ['build'], function() {
	return gulp.src(paths.src)
		.pipe(jsdoc.parser())
		// .pipe(gulp.dest('dist/docs'));
		.pipe(jsdoc.generator('dist/docs', {
			path: 'tools/jsdoc',
			title: '{nope.js} - Documentation'
		}, {
			showPrivate: true,
			outputSourceFiles: false
		}));
});

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
