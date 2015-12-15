var gulp = require('gulp'),
		concat = require('gulp-concat'),
		rename = require('gulp-rename'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify'),
		shell = require('gulp-shell'),
		gutil = require('gulp-util'),
		karma = require('karma');

var paths = {
	src: [
		'src/nope.js',
		'src/Attributes.js',
		'src/Element.js',
		'src/builder/ElementBuilder.js',
		'src/builder/MetaBuilder.js',
		'src/builder/HeadBuilder.js',
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
		logLevel: 'warn',
    reporters: ['dots', 'coverage'],
    preprocessors: {
      'dist/nope.js': ['coverage']
    },
    coverageReporter: { type : 'html', dir : 'dist/coverage' },
    singleRun: true
  }, done).start();
});

gulp.task('unit:live', function(done) {
	var config = {
		browsers: ['Chrome'],
    frameworks: ['jasmine'],
		reporters: ['dots', 'coverage'],
    preprocessors: {},
    coverageReporter: { type : 'text' },

    files: paths.src.concat([paths.mocks, paths.specs])
  };

	paths.src.forEach(function(p) {
		config.preprocessors[p] = ['coverage'];
	});

	new karma.Server(config, done).start();
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
