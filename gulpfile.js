var gulp = require('gulp'),
		concat = require('gulp-concat'),
		jshint = require('gulp-jshint'),
		uglify = require('gulp-uglify');

var paths = {
	src: [
		'nope.js',
		'build/ElementBuilder.js',
		'build/MetaBuilder.js',
		'build/HeadBuilder.js',
		'build/HtmlBuilder.js'
	]
}

gulp.task('build', function() {
	return gulp.src(paths.src)
		.pipe(jshint())
		.pipe(concat('nope.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);
