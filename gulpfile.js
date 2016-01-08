var fs = require('fs');
    exec = require('child_process').exec,
    karma = require('karma'),
    gulp = require('gulp'),
    gzip = require('gulp-gzip'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    karmaConfigure = require('./tools/karma-configure'),
    jsdocConfigure = require('./tools/jsdoc-configure');

var paths = {
  src: [
    'src/nope.js',
    'src/doc/AttributeCollection.js',
    'src/doc/NodeCollection.js',
    'src/doc/Node.js',
    'src/doc/Text.js',
    'src/doc/Element.js',
    'src/doc/ElementBuilder.js',
    'src/html/HtmlBuilder.js',
    'src/html/HtmlMetaBuilder.js',
    'src/html/HtmlBaseBuilder.js',
    'src/html/HtmlLinkBuilder.js',
    'src/html/HtmlScriptBuilder.js',
    'src/html/HtmlStyleBuilder.js',
    'src/html/HtmlHeadBuilder.js',
    'src/html/HtmlSimpleBuilder.js',
    'src/html/HtmlABuilder.js',
    'src/html/HtmlHeadingBuilder.js',
    'src/html/HtmlEmbedBuilder.js',
    'src/html/HtmlObjectBuilder.js',
    'src/html/HtmlListBuilder.js',
    'src/html/HtmlInsBuilder.js',
    'src/html/HtmlBodyBuilder.js',
    'src/html/HtmlDocumentBuilder.js',
    'src/html/DomCompiler.js'
  ],
  min: 'dist/nope.min.js',
  max: 'dist/nope.js',
  mocks: 'src/**/*.mock.js',
  specs: 'src/**/*.spec.js'
};

gulp.task('build', function() {
  return gulp.src(paths.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('nope.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify({ mangle: true, output: { max_line_len: 300 } })).on('error', gutil.log)
    .pipe(rename('nope.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('gzip', ['build'], function() {
  gulp.src(paths.min)
    .pipe(gzip())
    .pipe(gulp.dest('dist'));
})

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

gulp.task('document', function(done) {
  var conf = jsdocConfigure({
    src: paths.src.concat(['package.json']),
    template: {
      path: 'tools/jsdoc',
      title: '{nope} - Documentation'
    },
    destination: 'dist/docs',
    opts: { private: false }
  });

  exec('node_modules/.bin/jsdoc -c ' + conf, function(err, stdout, stderr) {
    stdout && console.log(stdout);
    stderr && console.log(stderr);
    fs.unlink(conf);
    done(err);
  });
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
