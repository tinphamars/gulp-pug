const { src, dest, parallel, watch, series } = require("gulp");
const concat = require("gulp-concat");
const gulpSass = require("gulp-sass");
const nodeSass = require("node-sass");
const sass = gulpSass(nodeSass);
const pug = require("gulp-pug");
const browserSync = require("browser-sync").create();

const FilesPath = {
  scssFiles: "sass/*.scss",
  jsFiles: "js/*.js",
  htmlFiles: "pages/*.pug",
  assets: "img/**",
};

function htmlTask() {
  return src(FilesPath.htmlFiles)
    .pipe(pug({ pretty: true }))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

function sassTask() {
  return src(FilesPath.scssFiles)
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(concat("style.css"))
    .pipe(dest("dist/css"))
    .pipe(browserSync.stream());
}

function jsTask() {
  return src(FilesPath.jsFiles)
    .pipe(concat("all.js"))
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
}

function assetsTask() {
  return src(FilesPath.assets)
    .pipe(dest("dist/assets/img"))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({ server: { baseDir: "./dist" } });
  watch(FilesPath.htmlFiles, htmlTask);
  watch(FilesPath.scssFiles, sassTask);
  watch(FilesPath.assets, assetsTask);
  watch(FilesPath.jsFiles, jsTask);
}

exports.js = jsTask;
exports.sass = sassTask;
exports.html = htmlTask;
exports.assets = assetsTask;
exports.default = series(parallel(htmlTask, sassTask, assetsTask));
exports.watch = serve;
