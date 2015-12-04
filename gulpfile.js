var gulp = require('gulp'),
		concat = require('gulp-concat'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify'),
		jsdoc = require('gulp-jsdoc')
		gutil = require('gulp-util');

var paths = {
	src: [
		'nope.js',
		'src/build/ElementBuilder.js',
		'src/build/MetaBuilder.js',
		'src/build/HeadBuilder.js',
		'src/build/HtmlBuilder.js'
	]
};

gulp.task('build', function() {
	return gulp.src(paths.src)
		.pipe(jshint())
		.pipe(concat('nope.js'))
    .pipe(uglify()).on('error', gutil.log)
    .pipe(gulp.dest('dist'));
});
gulp.task('document', function() {
	return gulp.src(paths.src)
		.pipe(jsdoc.parser())
		.pipe(jsdoc.generator('dist/docs', { path: 'tools/jsdoc' }, {
			showPrivate: false,
			outputSourceFiles: false
		}));
});

gulp.task('default', ['build']);
