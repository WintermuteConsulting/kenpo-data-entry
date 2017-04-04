import test from 'tape';
import { ObjectID } from 'mongodb';
import { apply } from './effects';
import { promiseify } from './helpful';
import Response from './Response';
import renderClient from './renderClient';

// --- MOCK VALUES ------------------------------------------------------------
// Same ugly mocks from handlers.test.js.
const client = {
  connect() {},
};

const db = {
  collection() {},
  close() {},
};

const cursor = {
  toArray() {},
};

const coll = {
  findOne() {},
  findOneAndReplace() {},
  findOneAndDelete() {},
  find() { return cursor; },
  insertOne() {},
};

const doc = {
  _id: ObjectID(),
  foo: 'bar',
  bar: 'baz',
};

const data = [doc];

// ----------------------------------------------------------------------------

test('test renderClient', (t) => {
  t.test('---> test try { connect } catch block', (st) => {
    const gen = renderClient(client);
    st.deepEqual(
      gen.next().value,
      apply(client, client.connect),
      'first effect should call client.connect',
    );
    st.deepEqual(
      gen.throw().value,
      new Response().serverError(),
      'throwing on client.connect should return SERVER ERROR',
    );
    st.end();
  });

  t.test('---> test try { collection } catch block', (st) => {
    const expected = apply(db, promiseify(db.collection), 'techniques', { strict: true });
    const gen = renderClient(client);
    gen.next(); // connect

    const actual = gen.next(db).value;
    st.is(actual.type, expected.type);
    st.is(actual.params.obj, expected.params.obj);
    // This is a weak assertion, but it's the best we have for now. Because promiseify
    // returns a function, each time it is called (even with the same arguments),
    // the result will have a different identity. Deep equality fails in this case.
    // We can't even inspect what it was called with. Will need a workaround...
    st.is(actual.params.method.name, expected.params.method.name);
    st.deepEqual(actual.params.args, expected.params.args);

    st.deepEqual(
      gen.throw().value,
      apply(db, db.close),
      'throwing after acquiring a collection should close the DB connection',
    );
    st.deepEqual(
      gen.next().value,
      new Response().serverError(),
      'after throwing on db.collection, should return SERVER ERROR',
    );
    st.end();
  });

  t.test('---> test success path', (st) => {
    const cursorEffect = apply(cursor, cursor.toArray);
    const gen = renderClient(client);
    gen.next(); // connect
    gen.next(db); // collection
    st.deepEqual(
      gen.next(coll).value,
      cursorEffect,
      'third effect should call toArray on the collection cursor',
    );
    st.deepEqual(
      gen.next(data).value,
      apply(db, db.close),
      'fourth effect should close the DB connection',
    );
    const actualReturn = gen.next().value;
    st.assert(actualReturn instanceof Response, 'return should be a Response');
    st.is(actualReturn.status, 200, 'response status should be OK');
    // Notice we're not doing anything other than checking the type of the body here.
    // This is a weak assertion - we would have to recreate the logic of rendering
    // here to actually test the contents of the result. Clearly more componentization
    // is necessary to test the heart of this logic.
    st.is(typeof actualReturn.body, 'string', 'response body should be an HTML string');
    st.end();
  });

  t.end();
});
