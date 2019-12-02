const { watch, src, dest, series } = require('gulp');
const postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      cssvariables = require('postcss-simple-vars'),
      nestedcss = require('postcss-nested'),
      cssimport = require('postcss-import')
      browserSync = require('browser-sync').create()
      mixins = require('postcss-mixins'),
      webpack = require('webpack');


function browSync() {
    browserSync.init({
        server: {
            baseDir: "app"
        }
    })
}

function html(cb) {
    browserSync.reload();
    cb();
}

function cssInject() {
    return src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
}

function css() {
    return src('app/assets/styles/styles.css')
        .pipe(postcss([cssimport, mixins, autoprefixer, cssvariables, nestedcss]))
        .pipe(dest('./app/temp/styles'));
}

function webpackStuff(cb) {
    webpack(require('./webpack.config.js'), () => {
        console.log("YAY WEBPACK COMPLETED");
        cb();
    });

}

exports.default = () => {
    browSync();
    watch('./app/index.html', html);
    watch('./app/assets/styles/**/*.css', series(css, cssInject));
    watch('./app/assets/scripts/**/*.js', series(webpackStuff, html));
}


