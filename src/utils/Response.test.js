import test from 'tape';
import Response from './Response';

test('test Response', (t) => {
  const mock = {
    header: {
      status: 101,
      foo: 'bar',
    },
    body: {
      foo: 'bar',
      bar: 'baz',
      baz: 'qux',
    },
  };

  const full = new Response(mock.header, mock.body);
  t.deepEqual(full, mock, 'a Response constructed with a header and body should preserve both');

  const partial = new Response(mock.header);
  t.deepEqual(partial, { header: mock.header }, 'a Response constructed with only a header should not have a body property');

  const ok = Response.ok(mock.body);
  t.deepEqual(ok, { header: { status: 200 }, body: mock.body });

  const notFound = Response.notFound(mock.body);
  t.deepEqual(notFound, { header: { status: 404 }, body: mock.body });

  const serverError = Response.serverError(mock.body);
  t.deepEqual(serverError, { header: { status: 500 }, body: mock.body });
  t.end();
});
