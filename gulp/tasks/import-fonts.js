const fs = require('fs');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
exports.otfToItf = () => {
  return app.gulp
    .src(`${app.path.fonts}/*.otf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'FONTS',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      fonter({
        formats: ['ttf'],
      }),
    )
    .pipe(app.gulp.dest(`${app.path.public.fonts}/`));
};
exports.ttfToWoff = () => {
  return app.gulp
    .src(`${app.path.fonts}/*.ttf`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'FONTS',
          message: 'Error: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      fonter({
        formats: ['woff'],
      }),
    )
    .pipe(app.gulp.dest(app.path.public.fonts))
    .pipe(app.gulp.src(`${app.path.src.fonts}/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(app.path.public.fonts));
};

exports.fontsStyle = () => {
  //Файл стилей подключения шрифтов
  const fontsFile = `${app.path.src.styles}/fonts.autogen.scss`;
  //Проверяем, существуют ли файлы шрифтов
  fs.readdir(app.path.src.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      //Проверяем, существует ли файл стилей для подключения шрифтов
      if (fs.existsSync(fontsFile)) {
        fs.rmSync(fontsFile);
      }
      {
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          //Записываем подключения шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0]
              ? fontFileName.split('-')[0]
              : fontFileName;
            let fontWeight = fontFileName.split('-')[1]
              ? fontFileName.split('-')[1]
              : fontFileName;
            const fontWeightLowerCased = fontWeight.toLowerCase();
            const fontURL = `/fonts/${fontFileName}`;
            switch (fontWeightLowerCased) {
              case '100':
              case 'thin':
                fontWeight = 100;
                break;
              case '200':
              case 'extralight':
                fontWeight = 200;
                break;
              case '300':
              case 'light':
                fontWeight = 300;
                break;
              case '400':
              case 'regular':
              case 'normal':
                fontWeight = 400;
                break;
              case '500':
              case 'medium':
                fontWeight = 500;
                break;
              case '600':
              case 'semibold':
                fontWeight = 600;
                break;
              case '700':
              case 'bold':
                fontWeight = 700;
                break;
              case '800':
              case 'extrabold':
              case 'heavy':
                fontWeight = 800;
                break;
              case '900':
              case 'black':
                fontWeight = 900;
                break;
              default:
                fontWeight = 400;
                break;
            }

            fs.appendFile(
              fontsFile,
              `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("${fontURL}.woff2") format("woff2"), url("${fontURL}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
              cb,
            );
            newFileOnly = fontFileName;
          }
        }
      }
    }
  });
  return app.gulp.src(`${app.path.src}`);
  function cb() {}
};
