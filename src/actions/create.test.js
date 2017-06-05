import test from 'tape';
import sinon from 'sinon';
import 'isomorphic-fetch';
import createItem, { createSuccess, createFailure } from './create';

test('test create item actions', (t) => {
  t.test('--- createSuccess', (subt) => {
    const path = { foo: 'bar' };
    const datum = { bar: 'baz' };
    const expected = { type: 'CREATE_SUCCESS', path, datum };
    const actual = createSuccess(path, datum);
    subt.deepEqual(actual, expected);
    subt.end();
  });

  t.test('--- createFailure', (subt) => {
    const path = { foo: 'bar' };
    const error = { error: 'boom!' };
    const expected = { type: 'CREATE_FAILURE', path, error };
    const actual = createFailure(path, error);
    subt.deepEqual(actual, expected);
    subt.end();
  });

  t.test('--- createItem', (subt) => {
    const path = { collection: 'foo', item: '_' };
    const datum = { foo: 'bar' };

    subt.test('------ success', (first) => {
      const mockPath = { collection: path.collection, item: '123abc' };
      const fetchStub = sinon.stub(global, 'fetch');
      fetchStub.resolves({ ok: true, headers: new Headers({ Location: '123abc' }) });
      const expected = createSuccess(mockPath, datum);
      createItem(path, datum)((action) => {
        first.deepEqual(action, expected, 'should dispatch CREATE_SUCCESS');
        fetchStub.restore();
        first.end();
      });
      first.assert(
        fetchStub.calledWith(path.collection, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datum) }),
        'should POST datum to collection',
      );
    });

    subt.test('------ response error', (second) => {
      const fetchStub = sinon.stub(global, 'fetch');
      fetchStub.resolves({ ok: false });
      const expected = createFailure(path);
      createItem(path, datum)((action) => {
        second.deepEqual(action, expected, 'should dispatch CREATE_FAILURE with no error');
        fetchStub.restore();
        second.end();
      });
    });

    subt.test('------ network error', (third) => {
      const mockError = new TypeError('oops');
      const fetchStub = sinon.stub(global, 'fetch');
      fetchStub.rejects(mockError);
      const expected = createFailure(path, mockError);
      createItem(path, datum)((action) => {
        third.deepEqual(action, expected, 'should dispatch CREATE_FAILURE with path and error');
        fetchStub.restore();
        third.end();
      });
    });

    subt.end();
  });

  t.end();
});
