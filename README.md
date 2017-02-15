# qinu

A unique string generator

[![NPM version](https://img.shields.io/npm/v/qinu.svg?style=flat-square)](https://www.npmjs.com/package/qinu)
![Bower version](https://img.shields.io/bower/v/qinu.svg?style=flat-square)

## Installation

### Via NPM

Install the package

```bash
$ npm install qinu
```

require it

```js
var qinu = require('qinu');
```

### Via Bower

Install the package

```bash
$ bower install qinu
```

add script on page

```html
<script src="/bower_components/qinu/qinu.min.js"></script>
```

as well you can do it with [RequireJS](http://requirejs.org/) or any similar tool.

## Usage

### Basic usage

```js
// Generates 8-character random string, e.g. "u1j1ot0f"
qinu();
```

### Using with options

```js
// Generates 32-character random string
// that contains only hexadecimal numbers,
// e.g. "e171376ae7be55249c217fd6a1e4460c"
qinu({
  // The length of output string
  length: 32,
  // The set of characters to be used by qinu
  chars: "1234567890abcdef"
});
```

### Using with template

```js
// Generates string corresponding to template,
// e.g. "label: qzu67zi2 sufix"
qinu(
  // Set template for output string
  { template: "%arg[0]%: %qinu% %arg[1]%" },
  // Pass arguments for template
  [ "label", "sufix" ]
);
```

`%qinu%` will be replaced with generated random string. Each passed argument will replace the relative code `%arg[<index>]%`.

Instead of array you can pass all template arguments as function arguments:

```js
// It works the same as an example above
qinu(
  // Set template for output string
  { template: "%arg[0]%: %qinu% %arg[1]%" },
  // Pass arguments for template
  "label",
  "sufix"
);
```

There is another option to pass arguments to the template, via `args` option:

```js
// Still, the same as examples above
qinu({
  template: "%arg[0]%: %qinu% %arg[1]%",
  args: [ "label", "sufix" ]
});
```

In case when both described options will be used arguments will be merged: `args` from the options object will be in the beginning and arguments from the function argument will be in the end:

```js
// Still, no difference
qinu(
  {
    template: "%arg[0]%: %qinu% %arg[1]%",
    args: [ "label" ]
  },
  "sufix"
);
```

### Using predefined options

You can create qinu-generator with predefined options:

```js
var qinuCustom = qinu.create({
  template: "%arg[0]%-%arg[1]%-%qinu%"
});

// Generates string corresponding to template,
// e.g. "group-label-qzu67zi2"
qinuCustom("group", "label");
// or use it with array
qinuCustom(["group", "label"]);
```

## License

MIT © [Stanislav Termosa](https://github.com/termosa)

