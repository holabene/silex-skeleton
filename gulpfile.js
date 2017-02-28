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
  bowerDir: 'bower_components',
  manifestFile: 'var/rev-manifest.json'
};

var app = {};

app.addStyle = function(paths, outputFilename) {
  var options = {
    loadPath: [
      config.bowerDir+'/bootstrap-sass/assets/stylesheets',
      config.bowerDir+'/font-awesome/scss'
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
    .pipe(plugins.rev.manifest(config.manifestFile, {merge: true}))
    .pipe(gulp.dest('.'));
};

app.copy = function(srcFiles, outputDir) {
  gulp.src(srcFiles)
    .pipe(gulp.dest(outputDir));
};

gulp.task('styles', function() {
  del('web/css/*');
  app.addStyle([
    config.assetsDir+'/styles/bootstrap-custom.scss',
    config.assetsDir+'/styles/font-awesome-custom.scss',
    config.assetsDir+'/styles/style.scss'
  ], 'main.css');
});

gulp.task('scripts', function() {
  del('web/js/*');
  app.addScript([
    config.bowerDir+'/jquery/dist/jquery.js',
    config.assetsDir+'/scripts/main.js'
  ], 'site.js');
});

gulp.task('fonts', function() {
  del('web/fonts/*');
  app.copy([
    config.bowerDir+'/bootstrap-sass/assets/fonts/bootstrap/*',
    config.bowerDir+'/font-awesome/fonts/*'
  ], 'web/fonts');
});

gulp.task('watch', function() {
  gulp.watch(config.assetsDir+'/styles/**/*.scss', ['styles']);
  gulp.watch(config.assetsDir+'/scripts/**/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'fonts']);
