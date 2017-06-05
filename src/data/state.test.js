import test from 'tape';
import State from './state';

test('test State class', (t) => {
  t.test('--- constructor', (subt) => {
    const path = { collection: 'foo', item: '123abc' };
    const foo = { '123abc': { id: '123abc', some: 'thing' } };
    const bar = { '456def': { id: '456def', some: 'other thing' } };
    const expected = { path, entities: { foo, bar } };
    const actual = new State(path, { foo }, { bar });
    subt.deepEqual(actual, expected, 'should assign path and entities');
    subt.end();
  });
});
