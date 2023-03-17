import path from 'path';
import fs from 'fs';
import { changeExtension } from './path-util';

function matchesSuffix(str: string, suffixes: string[]){
  return suffixes.some(suffix => str.toLowerCase().endsWith(suffix.toLowerCase()))
}

function findAll(startPath: string, suffixes: string[], force?: boolean) {

  if (!fs.existsSync(startPath)) {
    console.warn("Directory not found", startPath);
    return;
  }

  let found = [];
  let files: string[];
  try {
    files = fs.readdirSync(startPath);
  } catch (err) {
    console.error(err.message);
    console.error(`Error reading files in directory`, startPath)
  }
  for (let i = 0; i < files.length; i++) {
    let filename;
    try {
      filename = path.join(startPath, files[i]);
      const stat = fs.lstatSync(filename);
      if (stat.isDirectory()) {
        found = found.concat(findAll(filename, suffixes, force)); //recurse
      } else if (matchesSuffix(filename, suffixes)) {
        if (force || !files.find(f => changeExtension(filename, '.webp').endsWith(f))) {
          found.push(filename);
        }
      };
    } catch (err) {
      console.error(err);
      console.error('Cannot read file', filename || `${startPath}/${files[i]}`);
    }
  };
  return found
};

export const findImagesToConvert = (startingDir?: string, force?: boolean): string[] => {
  const dir = startingDir || process.cwd();
  return findAll(dir, ['.jpg', '.jpeg', '.png'], force)
}