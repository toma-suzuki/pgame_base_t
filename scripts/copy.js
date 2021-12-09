const { program } = require('commander');
const jsonfile = require('jsonfile');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

const main = async () => {
  program
    .option('-f, --from <from>', 'from')
    .option('-t, --to <to>', 'to');
  program.parse(process.argv);
  // - option -
  let {
    from,
    to,
  } = program.opts();
  if (!from) {
    throw new Error('from is undefined !!');
  }
  if (!to) {
    throw new Error('to is undefined !!');
  }
  from = path.resolve(process.cwd(), from);
  to = path.resolve(process.cwd(), to);
  try {
    fs.copySync(from, to);
  } catch (e) {
    console.error(e);
  }
};

(async () => {
  await main();
})();
