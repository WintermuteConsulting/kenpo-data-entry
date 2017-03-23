import test from 'tape';
import dbApp from './dbApp';
import * as actions from '../actions/actions';

test('reducer initially returns default state', (t) => {
  // note: redux never calls a reducer with an undefined action - it's always an object
  // with a type property.
  const actual = dbApp(undefined, { type: 'PLACEHOLDER' });
  const expected = { selection: '', data: {} };
  t.deepEqual(actual, expected, 'initial state does not match the expected value');
  t.end();
});

const startState = {
  selection: '',
  data: {
    '123abc': { title: 'the first one', attack: 'for an attack' },
  },
};

const afterUpdate = {
  selection: '',
  data: {
    '123abc': { title: 'the best', attack: 'everything' },
  },
};

const afterSelection = {
  selection: '123abc',
  data: {
    '123abc': { title: 'the first one', attack: 'for an attack' },
  },
};

const afterDelete = {
  selection: '',
  data: {},
};

test('reducer does not modify state when passed an unknown action', (t) => {
  const actual = dbApp(startState, { type: 'SOMETHING' });
  t.deepEqual(actual, startState, 'state changed after an unknown action was supplied');
  t.end();
});

test('reducer changes selection when passed SET_SELECTION', (t) => {
  const actual = dbApp(startState, actions.setSelection('123abc'));
  t.deepEqual(actual, afterSelection, 'selection does not match the expected value');
  t.end();
});

test('reducer creates and selects an item when passed CREATE_ITEM', (t) => {
  const action = actions.createItem();
  const actual = dbApp(startState, action);
  t.ok(actual.data[action.id]);
  t.is(actual.selection, action.id);
  t.end();
});

test('reducer updates an item when passed UPDATE_ITEM', (t) => {
  const payload = { title: 'the best', attack: 'everything' };
  const action = actions.updateItem('123abc', payload);
  const actual = dbApp(startState, action);
  t.deepEqual(actual, afterUpdate, 'data was not updated to match the expected value');
  t.end();
});

test('reducer does not change state if UPDATE_ITEM has an empty id', (t) => {
  const payload = { title: 'something', attack: 'for everything' };
  const action = actions.updateItem('', payload);
  const actual = dbApp(startState, action);
  t.deepEqual(actual, startState, 'data was updated with an illegal id');
  t.end();
});

test('reducer deletes the selected item and resets selection on DELETE_ITEM', (t) => {
  const actual = dbApp(afterSelection, actions.deleteItem());
  t.deepEqual(actual, afterDelete, 'selection and data do not match the expected value');
  t.end();
});

test('reducer does not change state if there is no selection on DELETE_ITEM', (t) => {
  const actual = dbApp(startState, actions.deleteItem());
  t.deepEqual(actual, startState, 'state does not match the starting value');
  t.end();
});
