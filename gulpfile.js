const gulp          = require('gulp')
const sass          = require('gulp-sass')
const cleanCSS      = require('gulp-clean-css')
const concat        = require('gulp-concat')
const minify_js     = require('gulp-minify')
const del           = require('del')
const browserSync   = require('browser-sync')
const nodemon       = require('gulp-nodemon')
const rev           = require('gulp-rev')
const revCollector  = require('gulp-rev-collector')
const gutil         = require('gulp-util')
const rimraf        = require('rimraf')
const revOutdated   = require('gulp-rev-outdated')
const path          = require('path')
const through       = require('through2')
const runSequence   = require('run-sequence')

function cleaner() {
    return through.obj(function(file, enc, cb){
        rimraf( path.resolve( (file.cwd || process.cwd()), file.path), function (err) {
            if (err) {
                this.emit('error', new gutil.PluginError('Cleanup old files', err));
            }
            this.push(file);
            cb();
        }.bind(this));
    });
}

gulp.task('js_min', () => {
    gulp
        .src([
            'public/src/js/jquery-3.3.1.js',
            'public/src/js/popper.js',
            'public/src/js/bootstrap.js',
            'public/src/js/jquery.fullpage.min.js',
            'public/src/js/owl.carousel.min.js',
            'public/src/js/jquery.mask.min.js',
            'public/src/js/app/app.js',
            'public/src/js/app/index.js',
            'public/src/js/index/s2.js',
            'public/src/js/index/s7.js',
            'public/src/js/contact/contact.js',
            'public/src/js/pay/pay.js',
            'public/src/js/gager/gager.js',
            'public/src/js/product/product.js',
            'public/src/js/palette/palette.js'
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

gulp.task('css_min', () => {
    gulp
        .src([
            'public/src/css_static/bootstrap.css',
            'public/src/css_static/jquery.fullpage.min.css',
            'public/src/css_static/owl.carousel.min.css',
            'public/src/css_static/owl.theme.default.min.css',
            'public/src/css_static/animate.css',
            'public/src/css_static/circle.css',
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
            'public/src/css/pay/pay.css',
            'public/src/css/palette/palette.css'
        ])
        .pipe(concat('app.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/'))
})

gulp.task('rev', () => {
    gulp.src(['public/app.min.css', 'public/app.min.js'])
        .pipe(rev())
        .pipe(gulp.dest('public/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/manifest/'))
})

gulp.task('rev_collector', () => {
    return gulp.src(['public/manifest/**/*.json', 'views/layouts/app.pug'])
        .pipe( revCollector({
            replaceReved: true
        }))
        .pipe( gulp.dest('views/layouts/') )
})

gulp.task('rev_clean', function() {
    gulp.src( ['public/*.*'], {read: false})
        .pipe( revOutdated(1) )
        .pipe( cleaner() );
    return;
});

gulp.task('production', (callback) => {
    runSequence(
        ['js_min', 'css_min'],
        'rev',
        'rev_collector',
        'rev_clean',
        callback
    )
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