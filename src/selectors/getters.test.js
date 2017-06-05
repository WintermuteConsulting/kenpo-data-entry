import test from 'tape';
import { getPath, getCollection, getItem } from './getters';

const state = {
  path: { collection: 'foo', item: '123abc' },
  entities: {
    foo: {
      '123abc': { id: '123abc', some: 'thing in foo' },
      '456def': { id: '456def', some: 'other thing in foo' },
      '789ghi': { id: '789ghi', some: 'last thing in foo' },
    },
  },
};

test('test getter selector functions', (t) => {
  t.test('--- getPath', (subt) => {
    const expected = state.path;
    const actual = getPath(state);
    subt.deepEqual(actual, expected, 'should return the path property');
    subt.end();
  });

  t.test('--- getCollection', (subt) => {
    const expected = state.entities.foo;
    const actual = getCollection(state, state.path);
    subt.deepEqual(actual, expected, 'should return the contents of the specified collection');
    subt.end();
  });

  t.test('--- getItem', (subt) => {
    const expected = state.entities.foo['123abc'];
    const actual = getItem(state, state.path);
    subt.deepEqual(actual, expected, 'should return the specified item');
    subt.end();
  });

  t.end();
});
