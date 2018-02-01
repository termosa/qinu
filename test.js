import test from 'ava'
import qinu from './qinu.min'

const DEFAULT_LENGTH = 64
const DEFAULT_CHARS = '1234567890abcdefghijklmnopqrstuvwxyz'

const testChars = (chars, string) => new RegExp(`^[${chars}]*$`).test(string)

test('expose function', t => {
  t.is(typeof qinu, 'function')
})

test('default behavior', t => {
  const generated = qinu()
  t.is(generated.length, DEFAULT_LENGTH)
  t.truthy(testChars(DEFAULT_CHARS, generated))
})

test('different result every time', t => {
  let times = 100
  const collection = {}
  while (times--) {
    let generated = qinu()
    t.falsy(collection[generated])
    collection[generated] = true
  }
})

test('shorthand for length', t => {
  t.is(0, qinu(-1).length)
  t.is(0, qinu(0).length)
  t.is(1, qinu(1).length)
  t.is(5, qinu(5).length)
  t.is(120, qinu(120).length)
})

test('qinu(options{length})', t => {
  t.is(0, qinu({ length: -1 }).length)
  t.is(0, qinu({ length: 0 }).length)
  t.is(1, qinu({ length: 1 }).length)
  t.is(5, qinu({ length: 5 }).length)
  t.is(120, qinu({ length: 120 }).length)
})

test('qinu(options{chars})', t => {
  t.truthy(testChars(DEFAULT_CHARS, qinu()))
  t.truthy(/^[abc]+$/.test(qinu({ chars: 'abc' })))
  t.truthy(/^[-_abc123]+$/.test(qinu({ chars: 'a-b__c123' })))
  t.falsy(/^a+$/.test(qinu({ chars: 'ab' })))
})

test('qinu(options{template})', t => {
  t.is('abc', qinu({ template: 'abc' }))
  t.truthy(/^_[abc]+_$/.test(qinu({ chars: 'abc', template: '_%qinu%_' })))
  t.truthy(/^_[abc]+_[abc]+_$/.test(qinu({ chars: 'abc', template: '_%qinu%_%qinu%_' })))
})

test('qinu(options{template, args})', t => {
  t.truthy(/^[ab]+-foo$/.test(qinu({ template: '%qinu%-%arg[0]%', args: ['foo'], chars: 'ab' })))
  t.truthy(/^foo-[ab]+-foo$/.test(qinu({ template: '%arg[0]%-%qinu%-%arg[0]%', args: ['foo'], chars: 'ab' })))
  t.truthy(/^foo-[ab]+-bar$/.test(qinu({ template: '%arg[0]%-%qinu%-%arg[1]%', args: ['foo', 'bar'], chars: 'ab' })))
  t.truthy(/^bar-[ab]+-foo$/.test(qinu({ template: '%arg[1]%-%qinu%-%arg[0]%', args: ['foo', 'bar'], chars: 'ab' })))
})

test('qinu(options{template}, args)', t => {
  t.truthy(/^[ab]+-foo$/.test(qinu({ template: '%qinu%-%arg[0]%', chars: 'ab' }, 'foo')))
  t.truthy(/^foo-[ab]+-foo$/.test(qinu({ template: '%arg[0]%-%qinu%-%arg[0]%', chars: 'ab' }, 'foo')))
  t.truthy(/^foo-[ab]+-bar$/.test(qinu({ template: '%arg[0]%-%qinu%-%arg[1]%', chars: 'ab' }, 'foo', 'bar')))
  t.truthy(/^bar-[ab]+-foo$/.test(qinu({ template: '%arg[1]%-%qinu%-%arg[0]%', chars: 'ab' }, 'foo', 'bar')))
})

test('qinu.create', t => {
  const generator = qinu.create()
  t.is(typeof generator, 'function')
  t.is(generator().length, DEFAULT_LENGTH)
  t.is(generator().length, DEFAULT_LENGTH)
  t.is(qinu.create(5)().length, 5)
  t.is(qinu.create({ length: 16 })().length, 16)
  t.is(qinu.create({ template: '123' })(), '123')
  t.truthy(testChars('abc', qinu.create({ chars: 'abc' })()))
  t.is(qinu.create({ template: '%arg[0]%-%arg[1]%' })('foo', 'bar'), 'foo-bar')
})
