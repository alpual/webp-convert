import path from 'path';
import fs from 'fs';
import { changeExtension } from './path-util';

function matchesSuffix(str: string, suffixes: string[]){
  return suffixes.some(suffix => str.toLowerCase().endsWith(suffix.toLowerCase()))
}

function findAll(startPath: string, suffixes: string[], force?: boolean) {

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  let found = [];
  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      found = found.concat(findAll(filename, suffixes, force)); //recurse
    } else if (matchesSuffix(filename, suffixes)) {
      if (force || !files.find(f => changeExtension(filename, '.webp').endsWith(f))) {
        found.push(filename);
      }
    };
  };
  return found
};

export const findImagesToConvert = (startingDir?: string, force?: boolean): string[] => {
  const dir = startingDir || process.cwd();
  return findAll(dir, ['.jpg', '.jpeg', '.png'], force)
}