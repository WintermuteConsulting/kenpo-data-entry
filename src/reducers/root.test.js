import test from 'tape';
import R from 'ramda';
import root from './root';
import { createSuccess, createFailure } from '../actions/create';
import { updateSuccess, updateFailure } from '../actions/update';
import { deleteSuccess, deleteFailure } from '../actions/delete';
import changePath from '../actions/path';

const anyPath = { collection: 'foo', item: '123abc' };
const anyError = { message: 'boom!' };
const baseState = {
  path: anyPath,
  entities: {
    foo: { '123abc': { id: '123abc', some: 'thing' } },
    bar: { '456def': { id: '456def', some: 'other thing' } },
  },
};

test('test root reducer', (t) => {
  t.test('--- CHANGE_PATH case', (subt) => {
    const path = { collection: 'bar', item: null };
    const expected = R.assoc('path', path, baseState);
    const actual = root(baseState, changePath(path));
    subt.notEqual(actual, baseState, 'should not mutate state');
    subt.deepEqual(actual, expected, 'should update path property');
    subt.end();
  });

  t.test('--- CREATE_SUCCESS case', (subt) => {
    const path = { collection: 'foo', item: 'cba321' };
    const payload = { some: 'new thing' };
    const expected = R.assocPath(['entities', path.collection, path.item], payload, baseState);
    const actual = root(baseState, createSuccess(path, payload));
    subt.notEqual(actual, baseState, 'should not mutate state');
    subt.deepEqual(actual, expected, 'should insert item at the specified path');
    subt.end();
  });

  t.test('--- CREATE_FAILURE case', (subt) => {
    const expected = baseState;
    const actual = root(baseState, createFailure(anyPath, anyError));
    subt.is(actual, expected, 'should not change state for CREATE_FAILURE');
    subt.end();
  });

  t.test('--- UPDATE_SUCCESS case', (subt) => {
    const path = { collection: 'foo', item: '123abc' };
    const payload = { some: 'modified thing' };
    const expected = R.assocPath(['entities', path.collection, path.item], payload, baseState);
    const actual = root(baseState, updateSuccess(path, payload));
    subt.notEqual(actual, baseState, 'should not mutate state');
    subt.deepEqual(actual, expected, 'should update the item at the specified path');
    subt.end();
  });

  t.test('--- UPDATE_FAILURE case', (subt) => {
    const expected = baseState;
    const actual = root(baseState, updateFailure(anyPath, anyError));
    subt.is(actual, expected, 'should not change state for UPDATE_FAILURE');
    subt.end();
  });

  t.test('--- DELETE_SUCCESS case', (subt) => {
    const path = { collection: 'bar', item: '456def' };
    const expected = R.dissocPath(['entities', path.collection, path.item], baseState);
    const actual = root(baseState, deleteSuccess(path));
    subt.notEqual(actual, baseState, 'should not mutate state');
    subt.deepEqual(actual, expected, 'should delete the item at the specified path');
    subt.end();
  });

  t.test('--- DELETE_FAILURE case', (subt) => {
    const expected = baseState;
    const actual = root(baseState, deleteFailure(anyPath, anyError));
    subt.is(actual, expected, 'should not change state for DELETE_FAILURE');
    subt.end();
  });

  t.test('--- default case', (subt) => {
    const expected = baseState;
    const actual = root(baseState, { type: 'SOMETHING_UNEXPECTED' });
    subt.is(actual, expected, 'should not change state for an unexpected action');
    subt.end();
  });
});
