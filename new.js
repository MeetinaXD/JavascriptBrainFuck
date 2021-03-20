/*
constructor:
"[object Object]"[!+[] + !![] + !![] + !![] + !![]] + "[object Object]"[+!![]] + ([][
  []
] + [])[+!![]] + (![] + [])[!+[] + !![] + !![]] + (!![] + [])[+[]] + (!![] + [])[+!![]] + ([][
  []
] + [])[+[]] + "[object Object]"[!+[] + !![] + !![] + !![] + !![]] + (!![] + [])[+[]] + "[object Object]"[+!![]] + (!![] + [])[+!![]]

*/
const window_ = '([]+[])[({}+[])[6]]+[]'
const object_ = '({}+[])' //[object Object]
const undefined_ = '([][[]]+[])' //undefined
const true_ = '(!![]+{})' //true
const false_ = '(![]+{})' //false

const sort = "(![]+[])[!+[]+!![]+!![]]+([]+{})[+!![]]+(!![]+[])[+!![]]+(!![]+[])[+[]]"
const constructor = "({}+[])[!+[]+!![]+!![]+!![]+!![]]+({}+[])[+!![]]+([][[]]+[])[+!![]]+(![]+[])[!+[]+!![]+!![]]+(!![]+[])[+[]]+(!![]+[])[+!![]]+([][[]]+[])[+[]]+({}+[])[!+[]+!![]+!![]+!![]+!![]]+(!![]+[])[+[]]+({}+[])[+!![]]+(!![]+[])[+!![]]"

const convertNumber = number => {
  return new Array(number).fill("~~!+[]").join("+")
}

const exec = command => `([]+[])[${charConvert("e")}](${command})`
const ascii = code => {
  if (typeof code === 'string')
    return `([]+[])[${object_}[5]](${code.charCodeAt(0)})`
  return `([]+[])[${object_}[5]](${code})`
}
const asciiStr = (codeArr) => {
  if(!(codeArr instanceof Array)){
    // string
    return asciiStr(codeArr.split('').map((e, i) => codeArr.charCodeAt(i)))
  }
  return codeArr.map(e => ascii(e)).join("+")
}

// const string = `${asciiStr("String")}`

const chars = {
  'a' : `${false_}[1]`,
  'b' : `${object_}[2]`,
  'c' : `${object_}[5]`,
  'd' : `${undefined_}[2]`,
  'e' : `${object_}[4]`,
  'f' : `${false_}[0]`,
  // 'g' : `${string}[14]`,
  'i' : `${undefined_}[5]`,
  'j' : `${object_}[3]`,
  'l' : `${false_}[2]`,
  'n' : `${undefined_}[1]`,
  'o' : `${object_}[1]`,
  'r' : `${true_}[1]`,
  's' : `${false_}[3]`,
  't' : `${true_}[0]`,
  'u' : `${true_}[2]`,
  // 'v' : `${string}[25]`,
  'w' : `(${window_})[13]`,
  ' ' : `${object_}[7]`,
  // 'S' : `${string}[9]`,
}

const charConvert = str => {
  let ret = []
  for(c of str){
    if (!(c in chars) || chars[c] === ''){
      ret.push(ascii(c))
      continue
    }
    ret.push(chars[c])
  }
  return ret.join("+")
}


const windowObj = `([]+[])[${chars['t']}]`
const execEscape = char => `${windowObj}[${charConvert('escape')}](${char})`
const execUnescape = char => `${windowObj}[${charConvert('unescape')}](${char})`

module.exports = {
  execEscape,
  execUnescape,
  charConvert,
  convertNumber,
  exec
}

// console.log(exec(charConvert(`console.log("hello, world!")`)));

// console.log(exec(charConvert(`console.log("%cI am running behide you", "color: red")`)));

