const gulp = require('gulp')
const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')
const concat = require('gulp-concat')
const minify_js = require('gulp-minify')
const del = require('del')
const browserSync = require('browser-sync')
const nodemon = require('gulp-nodemon')

gulp.task('js_min', () => {
    gulp
        .src([
            'public/src/js/jquery-3.3.1.js',
            'public/src/js/popper.js',
            'public/src/js/bootstrap.js',
            'public/src/js/jquery.fullpage.min.js',
            'public/src/js/owl.carousel.min.js',
            'public/src/js/app/app.js',
            'public/src/js/app/index.js',
            'public/src/js/index/s2.js',
            'public/src/js/index/s7.js',
            'public/src/js/contact/contact.js',
            'public/src/js/pay/pay.js'
        ])
        .pipe(concat('app.js'))
        .pipe(minify_js({
            ext:{
                min:'.min.js'
            }
        }))
        .pipe(gulp.dest('public/'))
        .on('end', () => {
            del.sync([
                'public/app.js',
            ]);
        })
})

// gulp.task('test3', () => {
//     gulp
//         .src([
//             'public/src/sass/*.scss'
//         ])
//         .pipe(sass())
//         .pipe(gulp.dest('public/src/css'))
//         .on('end', () => {
//             gulp.start('test4');
//         })
// })

gulp.task('css_min', () => {
    gulp
        .src([
            'public/src/css_static/bootstrap.css',
            'public/src/css_static/jquery.fullpage.min.css',
            'public/src/css_static/owl.carousel.min.css',
            'public/src/css_static/owl.theme.default.min.css',
            'public/src/css_static/animate.css',
            'public/src/css/hamburglar.css',
            'public/src/css/app.css',
            'public/src/css/index/index.css',
            'public/src/css/index/s1.css',
            'public/src/css/index/s2.css',
            'public/src/css/index/s3.css',
            'public/src/css/index/s4.css',
            'public/src/css/index/s5.css',
            'public/src/css/index/s6.css',
            'public/src/css/index/s7.css',
            'public/src/css/index/s8.css',
            'public/src/css/index/s9.css',
            'public/src/css/contact/contact.css',
            'public/src/css/gager/gager.css',
            'public/src/css/product/product.css',
            'public/src/css/company/company.css',
            'public/src/css/pay/pay.css'
        ])
        .pipe(concat('app.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/'))
})

gulp.task('production', ['js_min', 'css_min'], () => {

})







gulp.task('sass', function () {
    gulp
        .src([
            'public/src/sass/**/*.scss'
        ])
        .pipe(sass())
        .pipe(gulp.dest('public/src/css'))
});

gulp.task('watch', () => {
    gulp.watch('public/src/sass/**/*.scss', ['sass'])
    // gulp.watch('./src/sass/**/*.scss', ['test3'])
    // gulp.watch('./src/css/**/*.css', ['test3'])
    // gulp.watch('./src/js/**/*.js', ['js'])
})

gulp.task('bs', /* ['nodemon'], */ function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: [
            'views/**/*.*',
            'public/src/css/**/*.*',
            'public/src/js/**/*.*'
        ],
        port: 7000
	});
});

gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true; 
		} 
	});
});