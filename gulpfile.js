const { src, dest, parallel, watch, series } = require("gulp");
const concat = require("gulp-concat");
const gulpSass = require("gulp-sass");
const nodeSass = require("node-sass");
const sass = gulpSass(nodeSass);
const pug = require("gulp-pug");
const browserSync = require("browser-sync").create();

const FilesPath = {
  scssFiles: "pages/**/css/*.scss",
  jsFiles: "pages/assets/js/*.js",
  htmlFiles: "pages/*.pug",
  assets: "pages/**/img/**",
};

function htmlTask() {
  return src(FilesPath.htmlFiles)
    .pipe(pug({ pretty: true, force: true }))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}

function sassTask() {
  return src(FilesPath.scssFiles)
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(concat("all.css"))
    .pipe(dest("dist/assets/css"))
    .pipe(browserSync.stream());
}

function jsTask() {
  return src(FilesPath.jsFiles)
    .pipe(concat("main.js"))
    .pipe(dest("dist/assets/js"))
    .pipe(browserSync.stream());
}

function assetsTask() {
  return src(FilesPath.assets).pipe(dest("dist")).pipe(browserSync.stream());
}

function serve() {
  browserSync.init({ server: { baseDir: "./dist", directory: true } });
  // watch(FilesPath.htmlFiles, htmlTask);
  watch(FilesPath.scssFiles, sassTask);
  watch(FilesPath.jsFiles, jsTask);
  watch(FilesPath.assets, assetsTask);
  watch('pages/**/*.pug', htmlTask);
}

exports.js = jsTask;
exports.sass = sassTask;
// exports.html = htmlTask;
exports.assets = assetsTask;
// exports.default = series(parallel(htmlTask, sassTask, assetsTask, jsTask));
exports.watch = serve;
