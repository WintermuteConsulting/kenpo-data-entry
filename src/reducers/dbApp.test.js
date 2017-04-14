import test from 'tape';
import { view } from 'ramda';
import dbApp from './dbApp';
import * as actions from '../actions/actions';
import State, { lens } from '../data/state';
import Technique from '../data/technique';

test('test root reducer', (t) => {
  // --- INIT -----------------------------------------------------------------
  t.test('--- init (i.e. undefined state)', (subt) => {
    const actual = dbApp(undefined, { type: 'PLACEHOLDER' });
    const expected = new State();
    subt.deepEqual(actual, expected, 'initial state should match the default state');
    subt.end();
  });
  // --------------------------------------------------------------------------

  // --- MOCK STATES ----------------------------------------------------------
  const mocks = {
    coll: 'foo',
    item: 'bar',
    data: { foo: { bar: 'baz' } },
  };
  const nothingState = new State(); // nothing selected
  const collectionState = new State(mocks.data, mocks.coll); // only a collection selected
  const itemState = new State(mocks.data, mocks.coll, mocks.item); // a collection and item selected
  // --------------------------------------------------------------------------

  // --- SET COLLECTION -------------------------------------------------------
  t.test('--- SET_COLLECTION', (subt) => {
    const prevCollection = view(lens.collection, collectionState);
    const newCollection = 'other things';
    const action = actions.setCollection(newCollection);
    subt.deepEqual(
      dbApp(nothingState, action),
      new State(nothingState.data, newCollection),
      'should update the collection property with nothing selected',
    );
    subt.deepEqual(
      dbApp(collectionState, action),
      new State(collectionState.data, newCollection),
      'should update the collection property (if distinct) with a collection selected',
    );
    subt.is(
      dbApp(collectionState, actions.setCollection(prevCollection)),
      collectionState,
      'should not change state (if identical) with a collection selected',
    );
    subt.deepEqual(
      dbApp(itemState, action),
      new State(itemState.data, newCollection),
      'should update the collection property and deselect the item with an item selected',
    );
    subt.end();
  });
  // --------------------------------------------------------------------------

  // --- SET ITEM -------------------------------------------------------------
  t.test('--- SET_ITEM', (subt) => {
    const collection = view(lens.collection, collectionState);
    const prevItem = view(lens.item, itemState);
    const newItem = 'new thing';
    const action = actions.setItem(newItem);
    subt.is(
      dbApp(nothingState, action),
      nothingState,
      'should not change state with nothing selected',
    );
    subt.deepEqual(
      dbApp(collectionState, action),
      new State(collectionState.data, collection, newItem),
      'should update the item property with only a collection selected',
    );
    subt.deepEqual(
      dbApp(itemState, action),
      new State(itemState.data, collection, newItem),
      'should update the item (if distinct) with a collection and item selected',
    );
    subt.is(
      dbApp(itemState, actions.setItem(prevItem)),
      itemState,
      'should not change state (if identical) with a collection and item selected',
    );
    subt.end();
  });
  // --------------------------------------------------------------------------

  // --- CREATE ITEM ----------------------------------------------------------
  t.test('--- CREATE_ITEM', (subt) => {
    const action = actions.createItem();
    const expected = new State(
      { techniques: { [action.id]: new Technique() } },
      'techniques',
      action.id,
    );
    subt.is(
      dbApp(nothingState, action),
      nothingState,
      'should not change state with nothing selected',
    );
    subt.deepEqual(
      dbApp(new State({ techniques: {} }, 'techniques'), action),
      expected,
      'should insert the appropriate type of object and select it with a collection selected',
    );
    subt.deepEqual(
      dbApp(new State({ techniques: {} }, 'techniques', 'foo'), action),
      expected,
      'should insert the appropriate type of object and select it with an item selected',
    );
    subt.is(
      dbApp(collectionState, action),
      collectionState,
      'should not change state if the collection name is not supported',
    );
    subt.end();
  });
  // --------------------------------------------------------------------------

  // --- UPDATE ITEM ----------------------------------------------------------
  t.test('--- UPDATE_SELECTED_ITEM', (subt) => {
    const payload = { these: 'those', this: 'that' };
    const action = actions.updateSelectedItem(payload);
    const expected = new State(
      { foo: { bar: payload } },
      view(lens.collection, itemState),
      view(lens.item, itemState),
    );
    subt.is(
      dbApp(nothingState, action),
      nothingState,
      'should not change state with nothing selected',
    );
    subt.is(
      dbApp(collectionState, action),
      collectionState,
      'should not change state with only a collection selected',
    );
    subt.deepEqual(
      dbApp(itemState, action),
      expected,
      'should update the item with the action\'s payload with an item selected',
    );
    subt.end();
  });
  // --------------------------------------------------------------------------

  // --- DELETE ITEM ----------------------------------------------------------
  t.test('--- DELETE_SELECTED_ITEM', (subt) => {
    const action = actions.deleteSelectedItem();
    subt.is(
      dbApp(nothingState, action),
      nothingState,
      'should not change state with nothing selected',
    );
    subt.is(
      dbApp(collectionState, action),
      collectionState,
      'should not change state with only a collection selected',
    );
    const expected = new State({ foo: {} }, itemState.collection);
    subt.deepEqual(
      dbApp(itemState, action),
      expected,
      'should remove the item and reset the selected item with a collection and item selected',
    );
    subt.end();
  });
  // --------------------------------------------------------------------------

  // --- UNKNOWN ACTION -------------------------------------------------------
  t.test('--- unknown action', (subt) => {
    const mock = new State();
    const actual = dbApp(mock, { type: 'UNKNOWN' });
    t.deepEqual(actual, mock, 'state should be unchanged');
    t.is(actual, mock, 'state should be identical');
    subt.end();
  });
  // --------------------------------------------------------------------------
});
