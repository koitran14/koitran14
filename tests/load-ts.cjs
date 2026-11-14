// Run the project's TypeScript with the existing compiler; no test dependency needed.
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

module.exports = function loadTs(relativePath, stubs = {}) {
  const filename = path.resolve(__dirname, relativePath);
  const compiled = new Module(filename, module);
  compiled.filename = filename;
  compiled.paths = module.paths;
  compiled.require = (name) => Object.hasOwn(stubs, name) ? stubs[name] : require(name);
  compiled._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText, filename);
  return compiled.exports;
};
