#!/usr/bin/env node

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const argv = require('yargs').argv;
const ora = require('ora');
// const cliSpinners = require('cli-spinners');
const webpack = require('webpack');
// const docgenWebpackConfig = require('../config/webpack.config.docgen.dist');

const postcss = require('postcss');
const postcssPresetEnv = require('postcss-preset-env');
const colorFunction = require('postcss-color-function');
// const postcssModules = require('postcss-modules');
// const postcssComposes = require('postcss-composes');
// const { horizon } = require(path.join(__dirname, '../dist/horizon'));
const horizon = require('../src/horizon/postCSSPlugins/horizon');

const kill = () => process.kill(process.pid, 'SIGTERM');

const configPath = path.resolve(process.cwd(), argv.config || './horizon.config.js');
console.log('configPath: ', configPath);
const config = require(configPath);

if (!config) {
  console.log(chalk.red('Horizon: no config detected.'));
  kill();
}

const defaultCSSVariables = {};

const cssFilename = config.filename || 'horizon-styles.css';
const cssPath = path.join(process.cwd(), config.path || './dist');
const docPath = path.join(process.cwd(), config.docPath || './docs/horizon/site')
const destinationPath = `${cssPath}/${cssFilename}`;

const spinner = ora();

console.log('destinationPath: ', destinationPath);
console.log('docPath ', docPath);


async function generateCSS() {
  try {
    console.log('generateCSS');
    const result = await postcss([
      horizon(config.config),
      postcssPresetEnv({ stage: 0 }),
      colorFunction({ preserveCustomProps: false }),
    ])
    .process('', { from: '', to: destinationPath });

    return result.css;
  } catch (e) {
    console.error(chalk.red('Horizon: Unable to generate CSS'));
    console.error(chalk.red(e));
  }
}

function asyncWebpack(webpackConfig) {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(chalk.red('Horizon: Unable to compile webpack bundle'));
        console.log(stats.compilation.errors);
        reject(err);
      }

      resolve();
    })
  })
}

(async function run() {
  try {
    spinner.start('Generating CSS');
    const css = await generateCSS();
    spinner.succeed(chalk.green('CSS compilation complete'));

    spinner.start('Writing CSS file');
    await fs.outputFile(destinationPath, css);
    spinner.succeed(chalk.green(`${cssFilename} generated at ${cssPath}`))

    // if (argv.docs) {
    //   spinner.start('Generating static documentation');

    //   const webpackErr = await asyncWebpack(docgenWebpackConfig(docPath, config));

    //   webpackErr
    //     ? spinner.fail(chalk.red('Documentation generation not successful'))
    //     : spinner.succeed(chalk.green('Documenation generation successful'));
    // }

  } catch (e) {
    spinner.fail('something went wrong...')
    console.error('Horizon: Something went wrong...');
    console.error(e);
  }
})();