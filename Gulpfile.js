const gulp = require('gulp');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const uglify_js = require('gulp-uglify');
const babel = require('gulp-babel');
const scss_css = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean_css = require('gulp-clean-css');

gulp.task('build-books', [
    'build-books.handle-article-images',
    'build-books.move-article-files',
    'build-books.move-libs',
    'build-books.handle-scripts',
    'build-books.handle-styles',
    'build-books.handle-images',
    'build-books.handle-fonts'
]);

/* ================================================================================================================== */
/* BUILD BOOKS tasks */
/* ================================================================================================================== */

/* ------------------------------------------------------------------------------------------------------------------ */
/* Compressing and moving article images */
/* ------------------------------------------------------------------------------------------------------------------ */
gulp.task('build-books.handle-article-images', () => {
    return gulp.src('book/**/*.{png,gif,jpg,jpeg}')
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(imagemin())
        .pipe(gulp.dest('book'));
});

/* ------------------------------------------------------------------------------------------------------------------ */
/* Moving all other article files */
/* ------------------------------------------------------------------------------------------------------------------ */
gulp.task('build-books.move-article-files', () => {
    return gulp.src(['book/**/!(*.png|*.gif|*.jpg|*.jpeg|article.md|config.yml)'])
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(gulp.dest('book'));
});

/* ------------------------------------------------------------------------------------------------------------------ */
/* Moving libraries */
/* ------------------------------------------------------------------------------------------------------------------ */
gulp.task('build-books.move-libs', () => {
    return gulp.src('site/book/libs/**/*')
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(gulp.dest('book/libs'));
});

/* ------------------------------------------------------------------------------------------------------------------ */
/* Compressing and moving JS scripts */
/* ------------------------------------------------------------------------------------------------------------------ */
gulp.task('build-books.handle-scripts', () => {
    return gulp.src('site/book/scripts/**/*.js')
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(concat('book.min.js', {newLine: ''}))
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(uglify_js())
        .pipe(gulp.dest('book/scripts/'));
});

/* ------------------------------------------------------------------------------------------------------------------ */
/* Compressing and moving styles */
/* ------------------------------------------------------------------------------------------------------------------ */
gulp.task('build-books.handle-styles', () => {
    return gulp.src('site/book/styles/**/*.scss')
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(scss_css())
        .pipe(concat('book.min.css', {newLine: ''}))
        .pipe(autoprefixer())
        .pipe(clean_css())
        .pipe(gulp.dest('book/styles/'));
});

/* ------------------------------------------------------------------------------------------------------------------ */
/* Moving book images */
/* ------------------------------------------------------------------------------------------------------------------ */
gulp.task('build-books.handle-images', () => {
    return gulp.src('site/book/images/**/*.{png,gif,jpg,jpeg}')
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(imagemin())
        .pipe(gulp.dest('book/images'));
});

/* ------------------------------------------------------------------------------------------------------------------ */
/* Moving book images */
/* ------------------------------------------------------------------------------------------------------------------ */
gulp.task('build-books.handle-fonts', () => {
    return gulp.src('site/book/fonts/**/*')
        .pipe(plumber(function (error) { console.log(error); this.emit('end'); }))
        .pipe(gulp.dest('book/styles/fonts'));
});