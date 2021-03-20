const fs = require("fs")
var shell = require("shelljs")
var colors = require("colors");

const { exec, charConvert} = require('./new.js')
if (!process || !process.argv){
  throw new Error("unknown running environment, using node instead")
}
const argv = require('yargs')
  .option('o', {
    alias : 'output',
    demand: true,
    default: 'out.js',
    describe: 'the compile destination, default is out.js',
    type: 'string'
  })
  .option('r', {
    alias : 'run',
    demand: false,
    default: false,
    describe: 'run after compile, default is false',
    type: 'boolean'
  })
  .option('h', {
    alias : 'help',
    demand: false,
    default: false,
    describe: 'log help',
    type: 'boolean'
  })
  .argv

args = argv._.filter(e => /^\S+\.js$|^-o$/.test(e))
args = args.filter(e => fs.existsSync(e))

if (args.length === 0){
  console.log(colors.red('no compile target found!'))
  throw new Error("no compile target found")
}

doCompile(argv._, argv.o)
// run after compile
if (argv.r){
  doRun(argv.o)
}

function doCompile(input, output){
  let codeBody = ""
  input.forEach(e => {
    codeBody += fs.readFileSync(e, "utf-8") + "\n"
  });


  let code = `+function(){${codeBody}}();`
  let outputCode = exec(charConvert(code))
  fs.writeFileSync(output, outputCode)

  console.log(colors.green("compile finished."))
}

function doRun(target){
  const runCode = shell.exec(`node ${target}`)
  if (runCode !== 0){
    console.log(colors.red(`exit, code: ${runCode}.`))
  } else {
    console.log(colors.green(`done, code: ${runCode}.`))
  }
}