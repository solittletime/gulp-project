var gulp = require( 'gulp' ), server = require( 'gulp-develop-server' );

// run server
gulp.task( 'server:start', function() {
  server.listen( { path: './app.js' } );
});

// restart server if app.js changed
gulp.task( 'server:restart', function() {
  gulp.watch( [ './app.js' ], server.restart );
});

gulp.task('serve', ['server:start']);
