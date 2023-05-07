const nodePath = require('path');
const ROOT_FOLDER = nodePath.basename(nodePath.resolve());
const PUBLIC_FOLDER = `./public`;
const SRC_FOLDER = './src';
exports.public = {
  fonts: `${PUBLIC_FOLDER}/fonts`,
};
exports.src = {
  fonts: `${SRC_FOLDER}/assets/fonts`,
  styles: `${SRC_FOLDER}/styles`,
};
