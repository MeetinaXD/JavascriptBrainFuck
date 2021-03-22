const fs = require("fs")
var shell = require("shelljs")
var colors = require("colors");

const preCompile = code => `([]+[])[({}+[])[4]](([]+[])[({}+[])[5]](43)+(![]+{})[0]+(!![]+{})[2]+([][[]]+[])[1]+({}+[])[5]+(!![]+{})[0]+([][[]]+[])[5]+({}+[])[1]+([][[]]+[])[1]+([]+[])[({}+[])[5]](40)+([]+[])[({}+[])[5]](41)+([]+[])[({}+[])[5]](123)+${code}+([]+[])[({}+[])[5]](10)+([]+[])[({}+[])[5]](125)+([]+[])[({}+[])[5]](40)+([]+[])[({}+[])[5]](41)+([]+[])[({}+[])[5]](59))`

const { exec, charConvert} = require('./new.js')
if (!process || !process.argv){
  throw new Error("unknown running environment, using node instead")
}
Date.prototype.format = function (fmt) {
  let ret;
  const opt = {
    "Y+": this.getFullYear().toString(), // 年
    "m+": (this.getMonth() + 1).toString(), // 月
    "d+": this.getDate().toString(), // 日
    "H+": this.getHours().toString(), // 时
    "M+": this.getMinutes().toString(), // 分
    "S+": this.getSeconds().toString() // 秒
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
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
    describe: 'print help',
    type: 'boolean'
  })
  .option('w', {
    alias : 'watch',
    demand: false,
    default: false,
    describe: 'watch the input files',
    type: 'boolean'
  })
  .argv

// 过滤不合法的input path
args = argv._.filter(e => /^\S+\.js$|^-o$/.test(e))
args = args.filter(e => fs.existsSync(e))

// 如果没有提供input file
if (args.length === 0){
  console.log(colors.red('no compile target found!'))
  throw new Error("no compile target found")
}

// 是否监控文件变化
if (argv.w){
  watchFile(argv._, argv.o)
} else {
  compile(argv._, argv.o)
  // run after compile
  if (argv.r){
    run(argv.o)
  }
}

function watchFile(input, output){
  let fileData = {}
  function c_(files){
    let codeBody = []
    files.forEach(f => {
      fileData[f] = charConvert(fs.readFileSync(f, "utf-8") + '\n')
    })
    for (k in fileData){
      codeBody.push(fileData[k])
    }
    let code = codeBody.join('+')
    let outputCode = preCompile(code)
    fs.writeFileSync(output, outputCode)
    console.log(colors.gray(new Date().format("HH:MM:SS") + ` +${files.join(',')}:\n`) + colors.bgGreen("compile finished."))
    if (argv.r){
      run(argv.o)
    }
  }

  // first compile
  c_(input)
  input.forEach(f => {
    fs.watchFile(f,{
      persistent: true,
      interval: 1000
    },function(curr, prev){
      if(curr.mtime >= prev.mtime){
        c_([f])
      }
    });
  })
}

// single compile
function compile(input, output){
  let codeBody = ""
  input.forEach(e => {
    codeBody += fs.readFileSync(e, "utf-8") + "\n"
  });

  let code = `+function(){${codeBody}}();`
  let outputCode = exec(charConvert(code))
  fs.writeFileSync(output, outputCode)

  console.log(colors.bgGreen("compile finished."))
}

function run(target){
  const st = new Date()
  const runCode = shell.exec(`cat ./assets/pre.js ./fundamental.js ${target} | node`).code
  if (runCode !== 0){
    console.log(colors.bgRed(`\nExit: ${runCode}.`))
    console.log(colors.red(`it may caused by the unsupport function call. Try running in your browser.`))

  } else {
    console.log(colors.gray(`\nScript finished after ${((new Date() - st) / 1000).toFixed(3)}s`))
  }
}
