// gulp dependencies
var gulp = require('gulp');
var watch = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', ()=> 
  gulp.src('./public/scss/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer({
      versions: ['last 2 browsers']
    }))
    .pipe(gulp.dest('./public/css'))
);

gulp.task('default', () => {
  gulp.watch('.scss/*.scss', gulp.parallel('sass'));
})


