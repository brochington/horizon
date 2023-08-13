#!/usr/bin/env node

console.log('hello world');

import path from 'path';
import fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import webpack from 'webpack';
import { Command } from 'commander';
// const cliSpinners = require('cli-spinners');
// import docgenWebpackConfig from '../config/webpack.config.docgen.dist';

import postcss from 'postcss';
import postcssPresetEnv from 'postcss-preset-env';
// // const postcssModules = require('postcss-modules');
// // const postcssComposes = require('postcss-composes');
// // const { horizon } = require(path.join(__dirname, '../dist/horizon'));
import horizon from '../src/horizon/postCSSPlugins/horizon.js';

console.log(horizon);

const program = new Command();
console.log(program);

program.option('-c, --config <path>', 'path to config file');

program.parse();

const options = program.opts();

console.log('options: ', options.config);

const kill = () => process.kill(process.pid, 'SIGTERM');

const configPath = path.resolve(
  process.cwd(),
  options.config || './horizon.config.js'
);
console.log('configPath: ', configPath);
// const config = require(configPath);
const spinner = ora();

async function generateCSS(config, destinationPath) {
  try {
    console.log('generateCSS');
    const result = await postcss([
      horizon(config.config),
      postcssPresetEnv({ stage: 0 }),
    ]).process('', { from: '', to: destinationPath });

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
    });
  });
}

(async function run() {
  try {
    const confingImport = await import(configPath);
    const config = confingImport.default;

    console.log('config: ', config);

    if (!config) {
      console.log(chalk.red('Horizon: no config detected.'));
      kill();
    }

    const defaultCSSVariables = {};

    const cssFilename = config.filename || 'horizon-styles.css';
    const cssPath = path.join(process.cwd(), config.path || './dist');
    const docPath = path.join(
      process.cwd(),
      config.docPath || './docs/horizon/site'
    );
    const destinationPath = `${cssPath}/${cssFilename}`;

    console.log('destinationPath: ', destinationPath);
    console.log('docPath ', docPath);

    // 
    spinner.start('Generating CSS');
    const css = await generateCSS(config, destinationPath);
    spinner.succeed(chalk.green('CSS compilation complete'));

    spinner.start('Writing CSS file');
    await fs.outputFile(destinationPath, css);
    spinner.succeed(chalk.green(`${cssFilename} generated at ${cssPath}`));

    // if (argv.docs) {
    //   spinner.start('Generating static documentation');

    //   const webpackErr = await asyncWebpack(docgenWebpackConfig(docPath, config));

    //   webpackErr
    //     ? spinner.fail(chalk.red('Documentation generation not successful'))
    //     : spinner.succeed(chalk.green('Documenation generation successful'));
    // }
  } catch (e) {
    spinner.fail('something went wrong...');
    console.error('Horizon: Something went wrong...');
    console.error(e);
  }
})();
