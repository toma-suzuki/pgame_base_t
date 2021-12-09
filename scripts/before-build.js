const { program } = require('commander');
const jsonfile = require('jsonfile');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

const CreateEnvJson = require('./create-env-json');

const main = async () => {
  const packageJson = jsonfile.readFileSync(path.resolve(__dirname, '../package.json'));
  const buildNo = Number(packageJson['build-no']) || 0;
  const obj = {
    ...packageJson,
    'build-no': buildNo + 1,
  };
  const exportPath = path.resolve(__dirname, '../package.json');
  jsonfile.writeFileSync(exportPath, obj, { spaces: 2 });
  await CreateEnvJson();
};

(async () => {
  await main();
})();
