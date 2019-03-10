var gulp = require('gulp')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var del = require('del')
var less = require('gulp-less')
var minifyCss = require('gulp-minify-css')
var htmlmin = require('gulp-htmlmin')
var imagemin = require('gulp-imagemin')
var connect = require('gulp-connect')
var proxy = require('http-proxy-middleware')
// 文件读取
// gulp.task方法定义一个任务
// 参数1：任务名
// 参数2：任务执行的函数
// 注意：在任务中一定要记得return，不然gulp会以为这个任务没有完成
gulp.task('copy', function() {
  // 读取index.html文件
  // 通过pipe 管道对文件进行处理
  // gulp.dest: 把文件输出到指定目录
  return gulp.src('./src/lib/**/*.*').pipe(gulp.dest('./dist/lib'))
})

gulp.task('ico', function() {
  return gulp.src('./src/favicon.ico').pipe(gulp.dest('./dist/'))
})

// 处理js文件并且压缩
gulp.task('js', function() {
  return gulp
    .src('./src/js/*.js')
    .pipe(gulp.dest('./dist/js'))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: '.min',
        extname: '.js'
      })
    )
    .pipe(gulp.dest('./dist/js'))
    .pipe(connect.reload())
})

// 清理dist任务
gulp.task('clean', function() {
  return del('./dist/')
})

// 解析less文件
gulp.task('less', function() {
  return gulp
    .src('./src/less/*.less')
    .pipe(less())
    .pipe(minifyCss())
    .pipe(
      rename({
        extname: '.css'
      })
    )
    .pipe(gulp.dest('./src/css'))
    .pipe(connect.reload())
})

// css文件压缩
gulp.task('css', function() {
  return gulp
    .src('./src/css/*.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload())
})

// html文件压缩
gulp.task('html', function() {
  return gulp
    .src('./src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload())
})

// 图片压缩
gulp.task('img', async () => {
  await gulp
    .src('./src/images/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'))
    .pipe(connect.reload())
})

gulp.task('watch', function() {
  gulp.watch('./src/less/*.less', gulp.series('less'))
  gulp.watch('./src/css/*.css', gulp.series('css'))
  gulp.watch('./src/js/*.js', gulp.series('js'))
  gulp.watch('./src/*.html', gulp.series('html'))
  gulp.watch('./src/images/*', gulp.series('img'))
})

gulp.task('connect', function() {
  // 使用connect启动服务
  return connect.server({
    root: 'dist',
    port: 8080,
    livereload: true,
    middleware: function(connect, opt) {
      return [
        proxy('/api', {
          target: 'http://localhost:3000',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/'
          }
        })
      ]
    }
  })
})
gulp.task('init', gulp.parallel('html', 'js', 'css', 'less', 'img', 'copy', 'ico'))
gulp.task(
  'default',
  gulp.series('clean', 'init', gulp.parallel('watch', 'connect'))
)
