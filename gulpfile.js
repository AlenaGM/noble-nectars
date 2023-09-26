/* eslint-disable no-undef */
const { src, dest, parallel, series, watch } = require("gulp");

const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const gcssmq = require("gulp-group-css-media-queries");
const imagemin = require("gulp-imagemin");
const sass = require("gulp-sass")(require("sass"));
const rename = require("gulp-rename");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const uglify = require("gulp-uglify-es").default;
const webp = require("gulp-webp");
const browserSync = require("browser-sync").create();

const server = function () {
  browserSync.init({
    server: {
      baseDir: "dist",
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
    port: 8080,
    ui: { port: 8081 },
    open: true,
  });
  watch("src/*.html").on("change", browserSync.reload);
};

const styles = function () {
  return src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(rename({ suffix: ".min", prefix: "" }))
    .pipe(autoprefixer())
    .pipe(gcssmq())
    .pipe(cleanCSS())
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
};

const html = function () {
  return src("src/*.html").pipe(dest("dist/"));
};

const scripts = function () {
  return src(["node_modules/swiper/swiper-bundle.min.js", "src/js/**/*.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
};

const fonts = function () {
  return src("src/fonts/*.ttf")
    .pipe(ttf2woff())
    .pipe(dest("dist/fonts"))
    .pipe(src("src/fonts/*.ttf"))
    .pipe(ttf2woff2())
    .pipe(dest("dist/fonts"));
};

const icons = function () {
  return src("src/icons/**/*")
    .pipe(dest("dist/icons"))
    .pipe(browserSync.stream());
};

const images = function () {
  return src("src/img/**/*")
    .pipe(imagemin())
    .pipe(dest("dist/img"))
    .pipe(browserSync.stream());
};

const webpImages = function () {
  return src("src/img/**/*.{png,jpg,jpeg}").pipe(webp()).pipe(dest("dist/img"));
};

const watch_dev = function () {
  watch("src/sass/**/*.+(scss|sass|css)", parallel(styles));
  watch("src/*.html").on("change", parallel(html));
  watch("src/js/**/*.js").on("change", parallel(scripts));
  watch("src/fonts/*").on("all", parallel(fonts));
  watch("src/icons/**/*").on("all", parallel(icons));
  watch("src/img/**/*").on("all", parallel(images));
  watch("src/img/**/*.{png,jpg,jpeg}", parallel(webpImages));
};

exports.server = server;
exports.styles = styles;
exports.html = html;
exports.scripts = scripts;
exports.fonts = fonts;
exports.icons = icons;
exports.images = images;
exports.webpImages = webpImages;
exports.watch_dev = watch_dev;

exports.default = parallel(
  html,
  styles,
  scripts,
  images,
  webpImages,
  fonts,
  icons,
  server,
  watch_dev
);

exports.build = series(html, styles, scripts, images, webpImages, fonts, icons);
