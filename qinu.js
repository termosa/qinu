(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.qinu = factory();
  }
}(this, function () {

  var defaultLength = 8;
  var defaultTemplate = '%qinu%';
  var defaultChars = '1234567890abcdefghijklmnopqrstuvwxyz';

  function generateString(chars, length, string) {
    if (typeof string === 'undefined') {
      return generateString(chars, length, '');
    }
    if (string.length >= length) {
      return string;
    }
    var randomIndex = Math.floor(Math.random() * chars.length);
    var newChar = chars[randomIndex];
    return generateString(chars, length, string + newChar);
  }

  function generate(opts, args) {
    var randomString = generateString(opts.chars, opts.length);
    var qinuString = opts.template.replace(/%qinu%/g, randomString);
    for (var i = args.length; i--; ) {
      qinuString = qinuString
        .replace(new RegExp('%arg\\['+i+'\\]%', 'g'), args[i]);
    }
    return qinuString;
  }

  function normalizeOptions(options) {
    if (!options) return {};
    return typeof options === 'object'
      ? options : { length: +options };
  }

  function qinu(options, args) {
    options = normalizeOptions(options);
    var opts = {
      length: options.length || defaultLength,
      template: options.template || defaultTemplate,
      chars: (options.chars || defaultChars).slice()
    };
    if (!(args instanceof Array)) {
      args = Array.prototype.slice.call(arguments, 1);
    }
    if (options.args) {
      args = options.args.concat(args);
    }
    return generate(opts, args);
  }

  qinu.create = function(opts) {
    return qinu.bind(null, opts);
  };

  return qinu;
}));
