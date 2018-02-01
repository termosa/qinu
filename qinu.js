const defaults = {
  length: 64,
  template: '%qinu%',
  chars: '1234567890abcdefghijklmnopqrstuvwxyz'
}

function generateString (chars, length, string) {
  if (typeof string === 'undefined') {
    return generateString(chars, length, '')
  }
  if (string.length >= length) {
    return string
  }
  const randomIndex = Math.floor(Math.random() * chars.length)
  const newChar = chars[randomIndex]
  return generateString(chars, length, string + newChar)
}

function generate (opts, args) {
  const randomString = generateString(opts.chars, opts.length)
  return args.reduce(
    (str, arg, i) => str.replace(new RegExp(`%arg\\[${i}\\]%`, 'g'), arg),
    opts.template.replace(/%qinu%/g, randomString)
  )
}

function normalizeOptions (options) {
  if (!options && options !== 0) return {}
  return typeof options === 'object'
    ? options : { length: +options }
}

function qinu (options, args) {
  const opts = Object.assign({}, defaults, normalizeOptions(options))
  if (!(args instanceof Array)) {
    args = Array.prototype.slice.call(arguments, 1)
  }
  if (opts.args instanceof Array) {
    args = opts.args.concat(args)
  }
  return generate(opts, args)
}

qinu.create = opts => qinu.bind(null, opts)

export default qinu
