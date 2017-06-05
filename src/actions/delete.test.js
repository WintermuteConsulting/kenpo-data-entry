import test from 'tape';
import sinon from 'sinon';
import 'isomorphic-fetch';
import deleteItem, { deleteSuccess, deleteFailure } from './delete';

test('test delete item actions', (t) => {
  t.test('--- deleteSuccess', (subt) => {
    const path = { foo: 'bar' };
    const expected = { type: 'DELETE_SUCCESS', path };
    const actual = deleteSuccess(path);
    subt.deepEqual(actual, expected);
    subt.end();
  });

  t.test('--- deleteFailure', (subt) => {
    const path = { foo: 'bar' };
    const error = { error: 'boom!' };
    const expected = { type: 'DELETE_FAILURE', path, error };
    const actual = deleteFailure(path, error);
    subt.deepEqual(actual, expected);
    subt.end();
  });

  t.test('--- deleteItem', (subt) => {
    const path = { collection: 'foo', item: 'bar' };

    subt.test('------ success', (first) => {
      const fetchStub = sinon.stub(global, 'fetch');
      fetchStub.resolves({ ok: true });
      const expected = deleteSuccess(path);
      deleteItem(path)((action) => {
        first.deepEqual(action, expected, 'should dispatch DELETE_SUCCESS');
        fetchStub.restore();
        first.end();
      });
      first.assert(fetchStub.calledWith(`${path.collection}/${path.item}`, { method: 'DELETE' }), 'should DELETE to collection/item');
    });

    subt.test('------ response error', (second) => {
      const fetchStub = sinon.stub(global, 'fetch');
      fetchStub.resolves({ ok: false });
      const expected = deleteFailure(path);
      deleteItem(path)((action) => {
        second.deepEqual(action, expected, 'should dispatch DELETE_FAILURE with path');
        fetchStub.restore();
        second.end();
      });
    });

    subt.test('------ network error', (third) => {
      const mockError = new TypeError('oops');
      const fetchStub = sinon.stub(global, 'fetch');
      fetchStub.rejects(mockError);
      const expected = deleteFailure(path, mockError);
      deleteItem(path)((action) => {
        third.deepEqual(action, expected, 'should dispatch DELETE_FAILURE with path and error');
        fetchStub.restore();
        third.end();
      });
    });

    subt.end();
  });

  t.end();
});
