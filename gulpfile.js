const gulp = require('gulp');
const path = require('./gulp/config/path.js');
const plugins = require('./gulp/config/plugins.js');

global.app = {
  path,
  gulp,
  plugins,
  isPruduction: process.env.NODE_ENV === 'production',
};

// IMPORT TASKS
const fontTasks = require('./gulp/tasks/import-fonts.js');
const { otfToItf, ttfToWoff, fontsStyle } = fontTasks;
const importFonts = gulp.series(otfToItf, ttfToWoff, fontsStyle);
gulp.task('import-fonts', importFonts);
