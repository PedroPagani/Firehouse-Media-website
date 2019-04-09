const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

gulp.task('serve', (done) => {

    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch('./scss/*.scss', gulp.parallel('sass'));
    gulp.watch('./js/*.js', gulp.parallel('scripts'));
    gulp.watch('./*.html', gulp.parallel('html'));

    done();
})




gulp.task('sass', (done) => {
    gulp.src('./scss/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
    done();
});




gulp.task('scripts', (done) => {
    gulp.src('./js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
    done();
});



gulp.task('html', (done) => {
    gulp.src('./*.html')
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
    done();
})



gulp.task('copy', (done) => {
    gulp.src('./img/**/*')
    .pipe(gulp.dest('./dist/img'));
    gulp.src('./*.php')
    .pipe(gulp.dest('./dist'));
    //copy sw.js
    gulp.src('./sw.js')
    .pipe(gulp.dest('./dist'));
    //copy videos.json
    gulp.src('./videos.json')
    .pipe(gulp.dest('./dist'));
    gulp.src('./phpMailer/**/*')
    .pipe(gulp.dest('./dist/phpMailer'));
    done();
})





gulp.task('default', gulp.series('sass', 'scripts', 'html', 'copy', 'serve'));