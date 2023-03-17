import sharp from 'sharp';
import { changeExtension } from './path-util';

export const convertImage = (files: string[], verbose: boolean) => {
  files.forEach(file => {
    sharp(file)
      .webp()
      .toFile(changeExtension(file, '.webp'))
      .then(function (info) {
        if (verbose) {
          console.log(file, info);
        }
      })
      .catch(function (err) {
        console.error(err);
        console.error('Error converting image', file);
      })
  })
}