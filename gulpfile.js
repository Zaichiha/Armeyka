'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

gulp.task('clean', () => {
	return del('public');
});

gulp.task('sass', () => {
	const sassOptions = {
		outputStyle: 'expanded'
	};

	return gulp.src('./frontend/scss/styles.scss')
		.pipe(sourcemaps.init())
		.pipe(sass(sassOptions))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('assets', () => {
	return gulp.src('./frontend/assets/**/*.*')
		.pipe(gulp.dest('./public'));
});

gulp.task('watch', () => {
	gulp.watch('./frontend/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('./frontend/assets/**/*.*', gulp.series('assets'));
});

gulp.task('default', gulp.series(
	'clean', 
	gulp.parallel('sass', 'assets'),
	'watch'
));