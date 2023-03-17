# webp-convert

A node cli tool for converting images in a filesystem to webp. Based on the the https://github.com/khalidx/typescript-cli-starter node starter repo.

## Usage

webp-convert [options]

Converts images to the webp format, if there is not alread a webp version of the image present.

Options:
```
  -a, --all         Recursively run for all discovered image files in the target directory and it's subdirectories
  -d, --dir <path>  Specify a target directory in which to run. Defaults to current working directory: (default: "/home/domains/riograndefarm.org/scripts/rgcf")
  -D, --dry         Dry run will not convert images, only output target files
  -f, --force       Overwrite existing .webp files
  -v, --verbose     Log extra info
  -V, --version     output the version number
  -h, --help        output usage information
```

## Development

### **dev**

`npm run dev`

Runs the CLI application.

You can pass arguments to your application by running `npm run dev -- --your-argument`. The extra `--` is so that your arguments are passed to your CLI application, and not `npm`.

### **clean**

`npm run clean`

Removes any built code and any built executables.

### **build**

`npm run build`

Cleans, then builds the TypeScript code.

Your built code will be in the `./dist/` directory.

### **test**

`npm run test`

Cleans, then builds, and tests the built code.

### **bundle**

`npm run bundle`

Cleans, then builds, then bundles into native executables for Windows, Mac, and Linux.

Your shareable executables will be in the `./exec/` directory.
