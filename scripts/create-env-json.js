const { program } = require('commander');
const jsonfile = require('jsonfile');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

const main = async () => {
  program
    .option('-m, --mode <mode>', 'local/dev/prod');
  program.parse(process.argv);
  // - option -
  let {
    mode,
  } = program.opts();
  if (!mode) {
    throw new Error('mode is undefined !!');
  }
  const packageJson = jsonfile.readFileSync(path.resolve(__dirname, '../package.json'));
  const obj = {
    version: packageJson.version,
    'build-no': packageJson['build-no'],
    mode,
  };
  if (mode === 'prod') {
    fs.createFileSync(path.resolve(__dirname, '../build_prod/jsgame/env.json'));
    const exportPathProd = path.resolve(__dirname, '../build_prod/jsgame/env.json');
    jsonfile.writeFileSync(exportPathProd, obj, { spaces: 2 });
  } else {
    fs.createFileSync(path.resolve(__dirname, '../build_dev/jsgame/env.json'));
    const exportPathDev = path.resolve(__dirname, '../build_dev/jsgame/env.json');
    jsonfile.writeFileSync(exportPathDev, obj, { spaces: 2 });
  }
};

module.exports = main;
