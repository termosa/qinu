const defaults = {
  length: 32,
  template: '%qinu%',
  dict: '1234567890abcdefghijklmnopqrstuvwxyz',
  random: false
}

const next = (key, dict) => {
  if (!key.length) return ''
  const i = dict.indexOf(key.slice(-1))
  if (i + 1 < dict.length) return key.slice(0, -1) + dict[i + 1]
  return next(key.slice(0, -1), dict) + dict[0]
}

const generateKey = (dict, length, key = '') => {
  if (key.length >= length) return key
  const randomIndex = Math.floor(Math.random() * dict.length)
  const newChar = dict[randomIndex]
  return generateKey(dict, length, key + newChar)
}

const applyTemplate = (template, key, args) => {
  return args.reduce(
    (str, arg, i) => str.replace(new RegExp(`%arg\\[${i}\\]%`, 'g'), arg),
    template.replace(/%qinu%/g, key)
  )
}

const prepareDict = (dict) =>
  dict.split('').sort().filter((c, i, l) => l[i - 1] !== c).join('')

const normalizeOptions = (options) => {
  if (!options && options !== 0) {
    options = {}
  } else if (typeof options !== 'object') {
    options = { length: +options }
  }
  options = { ...defaults, ...options }
  if (options.dict) options.dict = prepareDict(options.dict)
  return options
}

class Qinu {
  next (dict, length) {
    const key = this.key || generateKey(dict, length)
    this.key = next(key, dict)
    return this.key
  }
}

// Not an arrow function, cause it requires context
function qinu (options, args) {
  const { dict, length, template, args: optArgs, random } =
    this instanceof Qinu ? options : normalizeOptions(options)
  if (!(args instanceof Array)) {
    args = Array.prototype.slice.call(arguments, 1)
  }
  if (optArgs instanceof Array) {
    args = optArgs.concat(args)
  }

  const key = !random && this instanceof Qinu
    ? this.next(dict, length) : generateKey(dict, length)
  return applyTemplate(template, key, args)
}

qinu.create = options => qinu.bind(new Qinu(), normalizeOptions(options))

export default qinu
