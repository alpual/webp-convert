#!/usr/bin/env node

import commander from 'commander'
import { convertImage } from './convert-image'
import { findImagesToConvert } from './find-images-to-convert';

const program = new commander.Command();

program
  .name('webp-convert')
  .description('Converts images to the webp format, if there is not alread a webp version of the image present.')
  .option('-a, --all', 'Recursively run for all discovered image files in the target directory and it\'s subdirectories')
  .option('-d, --dir <path>', 'Specify a target directory in which to run. Defaults to current working directory:', process.cwd())
  .option('-D, --dry', 'Dry run will not convert images, only output target files')
  .option('-f, --force', 'Overwrite existing .webp files')
  .option('-v, --verbose', 'Log extra info')
  .version('0.1.0')
  .parse(process.argv)

if (program.verbose) {
  console.log(program);
}

if (!program.all && !program.args.length) {
  console.error('Requires at least one file to be specified, or use the --all flag (which is recursive)');
}

const files = program.all ? findImagesToConvert(program.dir, program.force) : program.args;
console.log('Converting images:', files);
if (!program.dry){
  convertImage(files, program.verbose);
}
