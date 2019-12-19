'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var baseCompile = require('../../internal/babelBaseCompiler');
var compiledFileTypes = ['js', 'jsx'];

var compile = function compile(files, distPath) {
  return baseCompile(files, distPath, __dirname, compiledFileTypes);
};

exports.default = {
  compile: compile
};
module.exports = exports['default'];

//# sourceMappingURL=index.js.map