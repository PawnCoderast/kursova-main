const {
  src,
  dest,
  series,
  parallel,
  watch
} = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gulpif = require('gulp-if');
const image = require('gulp-imagemin');
const sass = require('gulp-sass')(require('sass'));

let isProd = false;

const paths = {
  src: {
    SendMail: 'src/send_mail.php',
    PHPMailer: `src/PHPMailer-6.9.3/**/*`,
    styles: 'src/scss/**/*.scss',
    scripts: 'src/js/**/*.js',
    images: 'src/img/**/*.{jpg,jpeg,png,svg,gif}',
    videos: 'src/video/**/*.*',
    html: 'src/**/*.html',
    fonts: 'src/fonts/**/*.{woff,woff2,ttf,otf}',
    svg: 'src/img/svg/**/*.svg',
    favicon: 'src/favicon/**/*.*',
  },
  dist: {
    SendMail: `dist/`,
    PHPMailer: `dist/PHPMailer-6.9.3`,
    base: 'dist/',
    styles: 'dist/css/',
    scripts: 'dist/js/',
    images: 'dist/img/',
    videos: 'dist/video/',
    html: 'dist/',
    fonts: 'dist/fonts/',
    svg: 'dist/img/',
    favicon: 'dist/favicon/',
  }
};

const clean = () => del([paths.dist.base]);

const styles = () => {
  return src(paths.src.styles, { sourcemaps: !isProd })
    .pipe(plumber(notify.onError({ title: "Styles", message: "<%= error.message %>" })))
    .pipe(sass().on('error', sass.logError)) // Compile SCSS to CSS
    .pipe(autoprefixer())
    .pipe(gulpif(isProd, cleanCSS()))
    .pipe(dest(paths.dist.styles, { sourcemaps: '.' }))
    .pipe(browserSync.stream());
};

const favicon = () => {
  return src(paths.src.favicon)
    .pipe(dest(paths.dist.favicon))
    .pipe(browserSync.stream());
};

const images = () => {
  return src(paths.src.images)
    .pipe(gulpif(isProd, image()))
    .pipe(dest(paths.dist.images));
};

const videos = () => {
  return src(paths.src.videos)
    .pipe(dest(paths.dist.videos));
};

const fonts = () => {
  return src(paths.src.fonts)
    .pipe(dest(paths.dist.fonts));
};

const html = () => {
  return src(paths.src.html)
    .pipe(dest(paths.dist.html))
    .pipe(browserSync.stream());
};

const svgSprites = () => {
  return src(paths.src.svg)
    .pipe(svgSprite({ mode: { stack: { sprite: "../sprite.svg" } } }))
    .pipe(dest(paths.dist.svg));
};

const copyJs = () => {
  return src(paths.src.scripts)
    .pipe(dest(paths.dist.scripts))
    .pipe(browserSync.stream());
};

const PHPMailer = () => {
  return src(paths.src.PHPMailer)
    .pipe(dest(paths.dist.PHPMailer))
    .pipe(browserSync.stream());
};

const SendMail = () => {
  return src(paths.src.SendMail)
    .pipe(dest(paths.dist.SendMail))
    .pipe(browserSync.stream());
};

const watcher = () => {
  browserSync.init({ server: { baseDir: paths.dist.base } });
  watch(paths.src.styles, styles); // Watch SCSS files
  watch(paths.src.scripts, copyJs);
  watch(paths.src.images, images);
  watch(paths.src.videos, videos);
  watch(paths.src.fonts, fonts);
  watch(paths.src.html, html);
  watch(paths.src.SendMail, SendMail);
  watch(paths.src.PHPMailer, PHPMailer);
  watch(paths.src.favicon, favicon);
};

const build = series(
  clean,
  parallel(styles, copyJs, images, videos, fonts, html, favicon, svgSprites, PHPMailer, SendMail)
);

exports.default = series(build, watcher);
exports.build = build;
