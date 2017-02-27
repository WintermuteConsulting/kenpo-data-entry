const mkdirp = require('mkdirp');
const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const fs = require('mz/fs');
const Mustache = require('mustache');

const templateDir = path.join(__dirname, 'templates/ReactComponent');
const templates = {
  js: 'ReactComponent.js',
  css: 'ReactComponent.css',
  test: 'ReactComponent.test.js',
};
const pathToComponent = argv._[0];
const basename = path.basename(pathToComponent);

if (pathToComponent) {
  mkdirp(pathToComponent, () => {
    // read template file > Mustache > write file to path
    Object.keys(templates).forEach((key) => {
      const file = templates[key];
      fs.readFile(path.join(templateDir, `${file}.mustache`), 'utf-8')
      .then(data => Mustache.render(data, { name: basename }))
      .then((output) => {
        const name = file.replace(/ReactComponent/, basename);
        fs.writeFile(path.join(pathToComponent, name), output);
      })
      .catch(() => {
        console.error(`❌ makeComponent: failed on template ${file}`);
        process.exitCode = 1;
      });
    });
  });
} else {
  // error: show usage
  console.log('usage: makeComponent <path>');
  process.exitCode = 1;
}
