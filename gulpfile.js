'use strict'

const gulp = require('gulp')
const sequence = require('gulp-sequence')
const pack = require('./package.json')
const util = require('util')
const mkdirp = util.promisify(require('mkdirp'))
const ecadoc = require('./ecadoc/ecadoc.json')

const downloadPath = `./ecadoc/download/${pack.version}`

gulp.task('pre:build', async () => {
  await mkdirp(downloadPath)
})

gulp.task('pdf', () => {
  // The name cannot be uppercased here b/c it contains mixed caesd letters
  let name = ecadoc.id
  return gulp.src(`./pdf/${name}.pdf`)
    .pipe(gulp.dest(`${downloadPath}`))
})

gulp.task('build', sequence('pre:build', 'pdf'))
