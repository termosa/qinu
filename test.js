import test from 'ava'
import qinu from './qinu.min'
import uniq from 'uniq'

const DEFAULT_LENGTH = 32
const DEFAULT_DICT = '1234567890abcdefghijklmnopqrstuvwxyz'

const testDict = (dict, string) => new RegExp(`^[${dict}]*$`).test(string)

// Qinu

test('qinu: exposes function', t => {
  t.is(typeof qinu, 'function')
})

test('qinu: default behavior', t => {
  const generated = qinu()
  t.is(generated.length, DEFAULT_LENGTH)
  t.truthy(testDict(DEFAULT_DICT, generated))
})

test('qinu: different result every time', t => {
  let times = 100
  const collection = {}
  while (times--) {
    let generated = qinu()
    t.falsy(collection[generated])
    collection[generated] = true
  }
})

test('qinu: shorthand for length', t => {
  t.is(0, qinu(-1).length)
  t.is(0, qinu(0).length)
  t.is(1, qinu(1).length)
  t.is(5, qinu(5).length)
  t.is(120, qinu(120).length)
})

test('qinu: options{length}', t => {
  t.is(0, qinu({ length: -1 }).length)
  t.is(0, qinu({ length: 0 }).length)
  t.is(1, qinu({ length: 1 }).length)
  t.is(5, qinu({ length: 5 }).length)
  t.is(120, qinu({ length: 120 }).length)
})

test('qinu: options{dict}', t => {
  t.truthy(testDict(DEFAULT_DICT, qinu()))
  t.truthy(/^[abc]+$/.test(qinu({ dict: 'abc' })))
  t.truthy(/^[-_abc123]+$/.test(qinu({ dict: 'a-b__c123' })))
  t.falsy(/^a+$/.test(qinu({ dict: 'ab' })))
})

test('qinu: options{template}', t => {
  t.is('abc', qinu({ template: 'abc' }))
  t.truthy(/^_[abc]+_$/.test(qinu({ dict: 'abc', template: '_%qinu%_' })))
  t.truthy(/^_[abc]+_[abc]+_$/.test(qinu({ dict: 'abc', template: '_%qinu%_%qinu%_' })))
})

test('qinu: options{template args} args', t => {
  t.truthy(/^[ab]+-foo$/.test(qinu({ template: '%qinu%-%arg[0]%', args: ['foo'], dict: 'ab' })))
  t.truthy(/^foo-[ab]+-foo$/.test(qinu({ template: '%arg[0]%-%qinu%-%arg[0]%', args: ['foo'], dict: 'ab' })))
  t.truthy(/^foo-[ab]+-bar$/.test(qinu({ template: '%arg[0]%-%qinu%-%arg[1]%', args: ['foo', 'bar'], dict: 'ab' })))
  t.truthy(/^bar-[ab]+-foo$/.test(qinu({ template: '%arg[1]%-%qinu%-%arg[0]%', args: ['foo', 'bar'], dict: 'ab' })))

  t.truthy(/^[ab]+-foo$/.test(qinu({ template: '%qinu%-%arg[0]%', dict: 'ab' }, 'foo')))
  t.truthy(/^foo-[ab]+-foo$/.test(qinu({ template: '%arg[0]%-%qinu%-%arg[0]%', dict: 'ab' }, 'foo')))
  t.truthy(/^foo-[ab]+-bar$/.test(qinu({ template: '%arg[0]%-%qinu%-%arg[1]%', dict: 'ab' }, ['foo', 'bar'])))
  t.truthy(/^foo-[ab]+-bar$/.test(qinu({ template: '%arg[0]%-%qinu%-%arg[1]%', dict: 'ab' }, 'foo', 'bar')))
  t.truthy(/^bar-[ab]+-foo$/.test(qinu({ template: '%arg[1]%-%qinu%-%arg[0]%', dict: 'ab' }, 'foo', 'bar')))

  t.truthy(/^foo-[ab]+-bar$/.test(qinu({ template: '%arg[0]%-%qinu%-%arg[1]%', dict: 'ab', args: ['foo'] }, 'bar')))
})

test('qinu: create instance', t => {
  const generator = qinu.create()
  t.is(typeof generator, 'function')
  t.is(generator().length, DEFAULT_LENGTH)
  t.is(generator().length, DEFAULT_LENGTH)
  t.is(qinu.create(5)().length, 5)
  t.is(qinu.create({ length: 16 })().length, 16)
  t.is(qinu.create({ template: '123' })(), '123')
  t.truthy(testDict('abc', qinu.create({ dict: 'abc' })()))
  t.is(qinu.create({ template: '%arg[0]%-%arg[1]%' })('foo', 'bar'), 'foo-bar')
})

test('qinu: generate different values', t => {
  const first = qinu()
  const second = qinu()
  const third = qinu()
  t.not(first, second)
  t.not(first, third)
  t.not(second, third)
})

test('qinu: generate unique sequence', t => {
  const length = 5
  const dict = '0ab0'
  const gen = qinu.create({ length, dict })
  const dictLength = uniq(dict.split('')).length
  const combinations = Math.pow(dictLength, length)
  const initialKey = gen()
  let iteration = 1
  while (gen() !== initialKey && ++iteration <= combinations) {}
  t.is(iteration, combinations)
})

test('qinu: generate random sequence', t => {
  const length = 3
  const dict = '0abc0'
  const gen = qinu.create({ length, dict, random: true })
  const dictLength = uniq(dict.split('')).length
  const combinations = Math.pow(dictLength, length)
  const initialKey = gen()
  let iteration = 1
  while (gen() !== initialKey && ++iteration <= combinations) {}
  t.not(iteration, combinations)
})
