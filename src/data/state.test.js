import test from 'tape';
import R from 'ramda';
import State, { lens, getData, deleteDatum } from './state';

test('test state', (t) => {
  t.test('--- constructor', (subt) => {
    const mocks = { data: { foo: 'bar' }, collection: 'things', item: 'kitten' };
    subt.deepEqual(
      new State(),
      { collection: '', item: '', data: {} },
      'no supplied arguments should return an object with empty collection, item, and data properties',
    );
    subt.deepEqual(
      new State(mocks.data),
      { collection: '', item: '', data: mocks.data },
      'first argument should set the data property',
    );
    subt.deepEqual(
      new State(mocks.data, mocks.collection),
      { collection: mocks.collection, item: '', data: mocks.data },
      'second argument should set the collection property',
    );
    subt.deepEqual(
      new State(mocks.data, mocks.collection, mocks.item),
      { collection: mocks.collection, item: mocks.item, data: mocks.data },
      'third argument should set the item property',
    );
    subt.end();
  });

  t.test('--- collection lens', (subt) => {
    const mock = { collection: 'things', item: '', data: {} };
    subt.deepEqual(
      R.view(lens.collection, mock),
      mock.collection,
      'collection lens should return the collection property',
    );
    subt.deepEqual(
      R.set(lens.collection, 'others', mock),
      { collection: 'others', item: '', data: {} },
      'collection lens should set the collection property',
    );
    subt.end();
  });

  t.test('--- item lens', (subt) => {
    const mock = { collection: '', item: 'this', data: {} };
    subt.deepEqual(
      R.view(lens.item, mock),
      mock.item,
      'item lens should return the item property',
    );
    subt.deepEqual(
      R.set(lens.item, 'that', mock),
      { collection: '', item: 'that', data: {} },
      'item lens should set the item property',
    );
    subt.end();
  });

  t.test('--- datum lens and deleteDatum', (subt) => {
    const mock = { collection: '', item: '', data: { things: { cheese: 'is amazing' } } };
    subt.deepEqual(
      R.view(lens.datum('things', 'cheese'), mock),
      mock.data.things.cheese,
      'datum lens should return the item at the path data.collection.item',
    );
    subt.deepEqual(
      R.set(lens.datum('things', 'cheese'), 'is awful!', mock),
      { collection: '', item: '', data: { things: { cheese: 'is awful!' } } },
      'item lens should set the item at the path data.collection.item',
    );
    subt.deepEqual(
      deleteDatum('things', 'cheese')(mock),
      { collection: '', item: '', data: { things: {} } },
      'item lens should set the item at the path data.collection.item',
    );
    subt.end();
  });
  t.test('--- getData', (subt) => {
    const mock = {
      collection: 'things',
      item: '',
      data: {
        things: {
          cheese: 'is amazing',
          chocolate: 'is delicious',
          asparagus: 'isn\'t so great',
        },
      },
    };
    subt.deepEqual(
      getData('things', mock),
      mock.data.things,
      'should return the contents of the specified collection',
    );
    subt.end();
  });
});
