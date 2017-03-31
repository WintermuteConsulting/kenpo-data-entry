/* eslint no-underscore-dangle: off */
import test from 'tape';
import { ObjectID } from 'mongodb';
import { apply } from './effects';
import { transmog, promiseify } from './helpful';
import Response from './Response';
import * as handle from './handlers';

// --- MOCK VALUES ------------------------------------------------------------
// About the ugly mocks below: these are internal Mongo classes that can't be
// instantiated directly.
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

// eslint-disable-next-line func-names
const trivial = function* () { yield; return Response.ok(); };

const params = {
  id: ObjectID.createFromHexString('000000000000000000000004'),
  collection: 'foo',
  body: { foo: 'bar' },
};

const doc = {
  _id: ObjectID.createFromHexString('000000000000000000000001'),
  foo: 'bar',
  bar: 'baz',
};

const doc2 = {
  _id: ObjectID.createFromHexString('000000000000000000000002'),
  foo: 'qux',
  bar: 'foo',
};

const moggedDoc = transmog(doc);

const query = { _id: doc._id };
// ----------------------------------------------------------------------------

test('test handleRequest', (t) => {
  t.test('---> test try { connect } catch block', (st) => {
    const gen = handle.handleRequest(client, params, trivial);
    st.deepEqual(
      gen.next().value,
      apply(client, client.connect),
      'first effect should call client.connect',
    );
    st.deepEqual(
      gen.throw().value,
      Response.serverError(),
      'throwing on client.connect should return SERVER ERROR',
    );
    st.end();
  });

  t.test('---> test try { collection } catch block', (st) => {
    const expected = apply(db, promiseify(db.collection), params.collection, { strict: true });
    const gen = handle.handleRequest(client, params, trivial);
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
      'throwing on db.collection should close the DB connection',
    );
    st.deepEqual(
      gen.next().value,
      Response.notFound(),
      'after throwing on db.collection, should return NOT FOUND',
    );
    st.end();
  });

  t.end();
});

test('test handleItem', (t) => {
  t.test('---> test invalid ObjectID', (st) => {
    const gen = handle.handleItem(coll, { id: 'wrong' }, trivial);
    t.deepEqual(
      gen.next().value,
      Response.notFound(),
      'invalid ID should return NOT FOUND',
    );
    st.end();
  });

  t.test('---> test try { delegated generator } block', (st) => {
    const gen = handle.handleItem(coll, params, trivial);
    gen.next(); // yield in trivial
    t.deepEqual(
      gen.throw().value,
      Response.serverError(),
      'throwing on delegated generator should return SERVER ERROR',
    );
    st.end();
  });

  t.test('---> test happy path', (st) => {
    const gen = handle.handleItem(coll, params, trivial);
    gen.next(); // yield in trivial
    t.deepEqual(
      gen.next().value,
      Response.ok(),
      'happy path should return trivial generator\'s value',
    );
    st.end();
  });
});

test('test handleCollection', (t) => {
  t.test('---> test try { delegated generator } block', (st) => {
    const gen = handle.handleCollection(coll, params, trivial);
    gen.next(); // yield in trivial
    st.deepEqual(
      gen.throw().value,
      Response.serverError(),
      'throwing on delegated generator should return SERVER ERROR',
    );
    st.end();
  });

  t.test('---> test happy path', (st) => {
    const gen = handle.handleCollection(coll, params, trivial);
    gen.next(); // yield in trivial
    st.deepEqual(
      gen.next().value,
      Response.ok(),
      'happy path should return trivial generator\'s value',
    );
    st.end();
  });
});

test('test getOne', (t) => {
  const expectedEffect = apply(coll, coll.findOne, query);

  // non-null result
  let gen = handle.getOne(doc._id, coll);
  t.deepEqual(
    gen.next().value,
    expectedEffect,
    'yielded effect should call findOne on the collection',
  );
  t.deepEqual(
    gen.next(doc).value,
    Response.ok(moggedDoc),
    'success result should be status:OK, body:doc',
  );

  // null result
  gen = handle.getOne(doc._id, coll);
  gen.next(); // effect tested above
  t.deepEqual(
    gen.next(null).value,
    Response.notFound(),
    'failure result should be status:NOTFOUND with empty body',
  );

  t.end();
});

test('test putOne', (t) => {
  const mockReqBody = { foo: 'bar' };
  const expectedEffect = apply(coll, coll.findOneAndReplace, query, mockReqBody);

  // non-null result
  let gen = handle.putOne(doc._id, coll, mockReqBody);
  t.deepEqual(
    gen.next().value,
    expectedEffect,
    'yielded effect should call findOneAndReplace on the collection',
  );
  t.deepEqual(
    gen.next({ value: doc }).value,
    Response.ok(),
    'success result should be status:OK with empty body',
  );

  // null result
  gen = handle.putOne(doc._id, coll, mockReqBody);
  gen.next(); // effect tested above
  t.deepEqual(
    gen.next({ value: null }).value,
    Response.notFound(),
    'failure result should be status:NOTFOUND with empty body',
  );

  t.end();
});

test('test deleteOne', (t) => {
  const expectedEffect = apply(coll, coll.findOneAndDelete, query);

  // non-null result
  let gen = handle.deleteOne(doc._id, coll);
  t.deepEqual(
    gen.next().value,
    expectedEffect,
    'yielded effect should call findOneAndDelete on the collection',
  );
  t.deepEqual(
    gen.next({ value: doc }).value,
    Response.ok(),
    'success result should be status:OK with empty body',
  );

  // null result
  gen = handle.deleteOne(doc._id, coll);
  gen.next();
  t.deepEqual(
    gen.next({ value: null }).value,
    Response.notFound(),
    'failure result should be status:NOTFOUND with empty body',
  );

  t.end();
});

test('test getMany', (t) => {
  const premog = [doc, doc2];
  const postmog = Object.assign({}, transmog(doc), transmog(doc2));
  const firstEffect = apply(cursor, cursor.toArray);

  const gen = handle.getMany(coll);
  t.deepEqual(gen.next().value, firstEffect, 'first yield should call toArray on the cursor');
  t.deepEqual(gen.next(premog).value, Response.ok(postmog), 'return should be status:OK with results as nested objects');

  t.end();
});

test('test createOne', (t) => {
  const mockReqBody = { foo: 'bar' };
  const mockID = ObjectID.createFromHexString('000000000000000000000003');
  const expectedEffect = apply(coll, coll.insertOne, mockReqBody);
  const expectedResult = new Response({ status: 201, Location: mockID.toHexString() });

  const gen = handle.createOne(coll, mockReqBody);
  t.deepEqual(
    gen.next().value,
    expectedEffect,
    'yielded effect should call createOne on the collection with the req body',
  );
  t.deepEqual(
    gen.next({ insertedId: mockID }).value,
    expectedResult,
    'result should be status:CREATED with Location field set to the inserted ID',
  );

  t.end();
});
