import path from 'path';

// extension should include the dot, for example '.html'
export function changeExtension(file: string, extension: string) {
  const basename = path.basename(file, path.extname(file))
  return path.join(path.dirname(file), basename + extension)
}