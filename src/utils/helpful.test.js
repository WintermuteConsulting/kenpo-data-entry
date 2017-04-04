import test from 'tape';
import { ObjectID } from 'mongodb';
import { response } from 'express';
import sinon from 'sinon';
import * as helpful from './helpful';
import Response from './Response';

test('test transmog', (t) => {
  const mockID = ObjectID.createFromTime(Date.now() / 1000);
  const mockDoc = {
    _id: mockID,
    field: 'hello there',
  };
  const expected = {
    [mockID.toHexString()]: {
      field: 'hello there',
    },
  };

  t.deepEqual(helpful.transmog(mockDoc), expected);
  t.end();
});

test('test maybeTry', (t) => {
  function mockFn(n) {
    if (n > 9000) {
      throw (new Error('over 9000!'));
    } else {
      return 'whew';
    }
  }
  const wrapped = helpful.maybeTry(mockFn);

  t.notok(wrapped(9001), 'throwing case should return null');
  t.equals(wrapped(1000), 'whew', 'non-throwing case should return a value');
  t.end();
});

test('test mapYield', (t) => {
  function* genf(start) {
    let n;
    try {
      n = yield 1;
    } catch (e) {
      return 0;
    }
    return start + n;
  }
  const wrapped = helpful.mapYield(n => n * 2, genf);

  let g = wrapped(3);
  const first = g.next().value;
  t.is(first, 2, 'yielded values should be mapped');
  t.is(g.next(first).value, 5, 'returned values should not be mapped');

  g = wrapped(5);
  g.next(); // advance to the function body
  t.is(g.throw('oops!').value, 0, 'exceptions should be thrown into the wrapped function');
  t.end();
});

test('test promiseify', (t) => {
  // callback is of the form (error, result) => {}
  // only one parameter will have a value; the other will be null
  const obj = {
    lolwut: 1,
    bar(n, cb) {
      if (n === 4) {
        cb(null, this.lolwut + n);
      } else {
        cb('oops', null);
      }
    },
  };

  const wrapped = helpful.promiseify(obj.bar);
  const success = wrapped.apply(obj, [4]); // called with apply
  t.assert(success instanceof Promise, 'wrapped function should return a Promise when called');
  success.then(n => t.is(n, 5, 'wrapped function should resolve with the correct sum on success'));

  const failure = wrapped.apply(obj, [1]);
  failure.catch(e => t.is(e, 'oops', 'wrapped function should reject with an error on failure'));
  t.end();
});

test('test expressify', (t) => {
  const status = sinon.stub(response, 'status').returnsThis();
  const send = sinon.stub(response, 'send').returnsThis();
  const set = sinon.stub(response, 'set').returnsThis();
  const sendStatus = sinon.stub(response, 'sendStatus').returnsThis();

  t.test('──> with header only', (st) => {
    const template = new Response().created().withHeader({ 'Content-Type': 'text/json' });
    helpful.expressify(response, template);
    st.assert(
      set.calledWith(template.header),
      'res.set should be called with the contents of the template header field',
    );
    st.assert(
      sendStatus.calledWith(template.status),
      'res.sendStatus should be called with the template status value',
    );
    st.end();
  });

  t.test('──> with body', (st) => {
    const template = new Response().ok().withBody({ foo: 'bar' });
    helpful.expressify(response, template);
    st.assert(
      status.calledWith(template.status),
      'res.status should be called with the template status value',
    );
    st.assert(
      send.calledWith(template.body),
      'res.send should be called with the template body',
    );
    st.end();
  });

  t.end();
});

test('test expand', (t) => {
  t.test('---> with empty body', (st) => {
    const req = { params: { foo: 'bar', bar: 'baz' } };
    const actual = helpful.expand(req);
    st.deepEqual(actual, req.params);
    st.end();
  });
  t.test('---> with body', (st) => {
    const req = { params: { foo: 'bar', bar: 'baz' }, body: { qux: 'quux' } };
    const actual = helpful.expand(req);
    const expected = Object.assign({}, req.params, { body: { qux: 'quux' } });
    st.deepEqual(actual, expected);
    st.end();
  });
  t.end();
});
