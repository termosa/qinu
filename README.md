# qinu [![NPM version](https://img.shields.io/npm/v/qinu.svg?style=flat-square)](https://www.npmjs.com/package/qinu) [![Bower version](https://img.shields.io/bower/v/qinu.svg?style=flat-square)](https://github.com/termosa/qinu)

Highly customizable generator of [random] strings.

## Installation

### Via NPM

Install the package

```bash
$ npm install qinu
```

require it

```js
const qinu = require('qinu')
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
// Generates 32-character random string, e.g. '4plugjpebgyqduvwcy7lo74wj4idxu5w'
const randomString = qinu()
```

### Using with options

```js
// Generates 64-character random string
// that contains only hexadecimal numbers,
// e.g. 'df6x4ou3p5tar625301dfuftqd8rh9kxwcjl6t0mtmxke3a9q8wuu3nhvrtrn3na'
const randomString = qinu({
  // The length of output string
  length: 64,
  // The set of characters to be used by qinu
  dict: '1234567890abcdef'
})
```

### Using with template

```js
// Generates string corresponding to template,
// e.g. 'LABEL: hjwjd4hk4cpx7b1ekh9vdmvsnob228bf SUFIX'
const randomString = qinu(
  // Set template for output string
  { template: '%arg[0]%: %qinu% %arg[1]%' },
  // Pass arguments for template
  [ 'LABEL', 'SUFIX' ]
)
```

`%qinu%` will be replaced with generated random string. Each passed argument will replace the relative code `%arg[<index>]%`.

Instead of array you can pass all template arguments as function arguments:

```js
// It works the same as an example above
const randomString = qinu(
  // Set template for output string
  { template: '%arg[0]%: %qinu% %arg[1]%' },
  // Pass arguments for template
  'LABEL',
  'SUFIX'
)
```

There is another option to pass arguments to the template, via `args` option:

```js
// Still, the same as examples above
const randomString = qinu({
  template: '%arg[0]%: %qinu% %arg[1]%',
  args: [ 'LABEL', 'SUFIX' ]
})
```

In case when both described options will be used arguments will be merged: `args` from the options object will be in the beginning and arguments from the function argument will be in the end:

```js
// Still, no difference
const randomString = qinu(
  {
    template: '%arg[0]%: %qinu% %arg[1]%',
    args: [ 'LABEL' ]
  },
  'SUFIX'
)
```

### Using predefined options

You can create qinu-generator with predefined options:

```js
const qinuCustom = qinu.create({
  template: '%arg[0]%-%arg[1]%-%qinu%'
})

// Generates string corresponding to template,
// e.g. 'group-label-wh0qothao58nk0zno2g86ct4gl3j9wa7'
const randomString = qinuCustom('group', 'label')
// or use it with array
const anotherRandomString = qinuCustom(['group', 'label'])
```

> When using `qinu.create()` generated results are ordered in a sequence. This behavior can be changed using [`random` option](#generating-unique-sequence-random-option)

### Shortcut for length property

In case you need to specify only the `length`:

```js
// Generates 64-character random string
const randomString = qinu(64)

// The shortcut can be applied to create method as well:
const generateRandom10Characters = qinu.create(10)
// Generate 10-character random string
const randomString = generateRandom10Characters()
```

### Generating unique sequence (random option)

In case if absolute uniqueness is required during the session, `qinu.create()` creates a function that first generate a random value and then iterate it one-by-one. This makes it impossible to generate the same string unless all possible combinations wasn't generated.

```js
const next = qinu.create({ length: 3, dict: 'abc' })
next() // 'abb'
next() // 'abc'
next() // 'aca'
```

If randomness is preferred pass `random: true` when create generator:

```js
const generate = qinu.create({ random: true, length: 3, dict: 'abc' })
generate() // 'ccb'
generate() // 'aaa'
generate() // 'baa'
```

## License

MIT © [Stanislav Termosa](https://github.com/termosa)
