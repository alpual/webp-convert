#!/usr/bin/env node

import commander from 'commander'
import { convertImage } from './convert-image'
import { findImagesToConvert } from './find-images-to-convert';

const program = new commander.Command();

program
  .name('rgcf-image-convert')
  .version('0.1.0')
  .option('-a, --all', 'Recursively run for all discovered image files in the target directory and it\'s subdirectories. Target directory is the current directory, unless the --dir flag is set.')
  .option('-d, --dir [path]', 'Specify a target directory in which to run')
  .option('-D, --dry', 'Dry run will not convert images, only output target files')
  .option('-f, --force', 'Overwrite existing .webp files')
  .option('-v, --verbose')
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
