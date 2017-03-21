/**
 * Gulpfile
 *
 * For production use:
 * $ gulp --production
 */

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
  rename: {
    'gulp-ruby-sass': 'sass'
  }
});
var del = require('del');

var config = {
  assetsDir: 'assets',
  production: !!plugins.util.env.production,
  sourceMaps: !plugins.util.env.production,
  manifestFile: 'var/rev-manifest.json'
};

var app = {};

app.addStyle = function(paths, outputFilename) {
  var options = {
    loadPath: [
      'node_modules/bootstrap/scss',
      'node_modules/font-awesome/scss'
    ],
    sourcemap: config.sourceMaps,
    precision: 10
  };

  plugins.sass(paths, options).on('error', plugins.sass.logError)
    .pipe(plugins.plumber())
    .pipe(plugins.concat('css/'+outputFilename))
    .pipe(plugins.autoprefixer({browsers: ['last 2 versions']}))
    .pipe(plugins.csscomb())
    .pipe(config.production ? plugins.cleanCss() : plugins.util.noop())
    .pipe(plugins.rev())
    .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.write('.')))
    .pipe(gulp.dest('web'))
    .pipe(plugins.livereload())
    .pipe(plugins.rev.manifest(config.manifestFile, {merge: true}))
    .pipe(gulp.dest('.'));
};

app.addScript = function(paths, outputFilename) {
  gulp.src(paths)
    .pipe(plugins.plumber())
    .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.init()))
    .pipe(plugins.concat('js/'+outputFilename))
    .pipe(config.production ? plugins.uglify() : plugins.util.noop())
    .pipe(plugins.rev())
    .pipe(plugins.if(config.sourceMaps, plugins.sourcemaps.write('.')))
    .pipe(gulp.dest('web'))
    .pipe(plugins.livereload())
    .pipe(plugins.rev.manifest(config.manifestFile, {merge: true}))
    .pipe(gulp.dest('.'));
};

app.copy = function(srcFiles, outputDir) {
  gulp.src(srcFiles)
    .pipe(gulp.dest(outputDir))
    .pipe(plugins.livereload());
};

gulp.task('styles', function() {
  del('web/css/*');
  app.addStyle([
    config.assetsDir+'/styles/bootstrap_custom.scss',
    config.assetsDir+'/styles/fontawesome_custom.scss',
    config.assetsDir+'/styles/style.scss'
  ], 'main.css');
});

gulp.task('scripts', function() {
  del('web/js/*');
  app.addScript([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/tether/dist/js/tether.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/smooth-scroll/dist/js/smooth-scroll.js',
    config.assetsDir+'/scripts/main.js'
  ], 'site.js');
});

gulp.task('fonts', function() {
  del('web/fonts/*');
  app.copy([
    'node_modules/font-awesome/fonts/*'
  ], 'web/fonts');
});

gulp.task('watch', function() {
  plugins.livereload.listen();
  gulp.watch(config.assetsDir+'/styles/**/*.scss', ['styles']);
  gulp.watch(config.assetsDir+'/scripts/**/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'fonts']);
