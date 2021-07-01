## Javascript Brainfuck
Author: MeetinaXD
Last Edit: Marc 21, 2021

> Treat your brain well

This is a meaningless project **for joy purposes**.

This project contains a `sample`. It shows you how to run `JavaScript Brainfuck` codes. And a `compiler` for **converting** normal codes to `Brainfuck` codes.

## Download and Run
There is no installation required, download the latest release and unpack it.

### Run Sample
Open `index.html` in your browser (`Google Chrome` is recommended)

Then, press `Command + Option + I` or `Ctrl + Shift + I` (On Windows) to open `DevTools`

See `console`.

### Compiler Requirement

`Node` environment is requireto run `compile.js`, you may need to install `colors` `shelljs` and `yargs` package.

use **NPM**
```shell
npm i colors shelljs yargs
```

## Brainfuck Compiler
**screenshot**
![Screenshot](./assets/compiler-screenshot.png)
**after compiling**
![Screenshot](./assets/after-compile.png)

You can get the usege in the terminal, using:
```shell
node compile.js -h
```
**or**
```shell
node compile.js --help
```

Compiler offers you **3 options**, usage:
```shell
node compile.js sources [-o|--output] destination [-h|--help] [-r|--run] [-w|--watch]
```

### `-o | --output`
Specific the output path, **only ONE** path will be recognized as an output path.

### `-h | --help`
Print out the help message and usage

### `-r | --run`
Run the codes after compile successfully.

### `-w | --watch`
Watch source files and auto compile when files change are detected. It can use with `-r` or `--run`option, it will run the compiled codes after compiling.

**For example:**
```shell
node compile.js main.js test.js -o output.js -w -r
```

## Additional Words
Hope you enjoy it and I highly recommend you do NOT use it in a commercial project.
If you insist on doing this, please do not leave personal information.
Life is once.