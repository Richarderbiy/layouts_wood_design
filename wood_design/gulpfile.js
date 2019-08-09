const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const browserSync = require('browser-sync').create();

let cssFiles = [
	'./src/precss/reset.css',
	'./src/precss/base.css',
	'./src/precss/styles.css'
];

gulp.task('css', function(){
	gulp.src('./src/precss/styles.less')
		.pipe(less())
		.pipe(autoprefixer({
            browsers: ['>0.01%'],
            cascade: false
        }))
		.on('error', console.error.bind(console))
        .pipe(cleanCSS({level: 2}))
		.pipe(gulp.dest('./src/css'))
		.pipe(browserSync.stream());
});

gulp.task('watch', function(){
	browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });

	gulp.watch('./src/precss/**/*.less', ['css']);
});