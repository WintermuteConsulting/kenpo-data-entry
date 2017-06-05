import test from 'tape';
import sinon from 'sinon';
import 'isomorphic-fetch';
import updateItem, { updateSuccess, updateFailure } from './update';

test('test update item actions', (t) => {
  t.test('--- updateSuccess', (subt) => {
    const path = { foo: 'bar' };
    const datum = { bar: 'baz' };
    const expected = { type: 'UPDATE_SUCCESS', path, datum };
    const actual = updateSuccess(path, datum);
    subt.deepEqual(actual, expected);
    subt.end();
  });

  t.test('--- updateFailure', (subt) => {
    const path = { foo: 'bar' };
    const error = { error: 'boom!' };
    const expected = { type: 'UPDATE_FAILURE', path, error };
    const actual = updateFailure(path, error);
    subt.deepEqual(actual, expected);
    subt.end();
  });

  t.test('--- updateItem', (subt) => {
    const path = { collection: 'foo', item: 'bar' };
    const datum = { foo: 'bar' };

    subt.test('------ success', (first) => {
      const fetchStub = sinon.stub(global, 'fetch');
      fetchStub.resolves({ ok: true });
      const expected = updateSuccess(path, datum);
      updateItem(path, datum)((action) => {
        first.deepEqual(action, expected, 'should dispatch UPDATE_SUCCESS');
        fetchStub.restore();
        first.end();
      });
      first.assert(
        fetchStub.calledWith(`${path.collection}/${path.item}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datum) }),
        'should PUT datum to collection/item',
      );
    });

    subt.test('------ response error', (second) => {
      const fetchStub = sinon.stub(global, 'fetch');
      fetchStub.resolves({ ok: false });
      const expected = updateFailure(path);
      updateItem(path, datum)((action) => {
        second.deepEqual(action, expected, 'should dispatch UPDATE_FAILURE with path');
        fetchStub.restore();
        second.end();
      });
    });

    subt.test('------ network error', (third) => {
      const mockError = new TypeError('oops');
      const fetchStub = sinon.stub(global, 'fetch');
      fetchStub.rejects(mockError);
      const expected = updateFailure(path, mockError);
      updateItem(path, datum)((action) => {
        third.deepEqual(action, expected, 'should dispatch UPDATE_FAILURE with path and error');
        fetchStub.restore();
        third.end();
      });
    });

    subt.end();
  });

  t.end();
});
