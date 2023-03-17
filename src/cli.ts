#!/usr/bin/env node

import commander from 'commander'
import { convertImage } from './convert-image'
import { findImagesToConvert } from './find-images-to-convert';

const program = new commander.Command();

program
  .name('rgcf-image-convert')
  .version('0.1.0')
  .option('-a, --all')
  .option('-d, --dir [path]')
  .option('--dry')
  .option('-v, --verbose')
  .parse(process.argv)

if (program.verbose) {
  console.log(program);
}

if (!program.all && !program.args?.length) {
  console.error('Requires at least one file to be specified, or use the --all flag (which is recursive)');
}

const files = program.all ? findImagesToConvert(program.dir) : program.args;
console.log('Converting images:', files);
if (!program.dry){
  convertImage(files, program.verbose);
}
