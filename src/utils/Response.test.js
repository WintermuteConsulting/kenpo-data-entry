import test from 'tape';
import Response from './Response';

test('test Response', (t) => {
  const res = new Response();
  t.deepEqual(res, {}, 'a new Response should be an empty object');
  t.deepEqual(res.ok(), { status: 200 }, 'ok should set the status field to 200');
  t.deepEqual(res.created(), { status: 201 }, 'created should set the status field to 201');
  t.deepEqual(res.notFound(), { status: 404 }, 'notFound should set the status field to 404');
  t.deepEqual(res.serverError(), { status: 500 }, 'serverError should set the status field to 500');

  const header = { foo: 'bar' };
  t.deepEqual(new Response().withHeader(header), { header }, 'header should set the header field with the provided object');

  const body = { bar: 'baz' };
  t.deepEqual(new Response().withBody(body), { body }, 'body should set the body field with the provided data');
  t.end();

  const full = {
    status: 200,
    header: { foo: 'bar' },
    body: '<h1>some HTML</h1>',
  };
  t.deepEqual(
    new Response().ok().withHeader({ foo: 'bar' }).withBody('<h1>some HTML</h1>'),
    full,
    'fluid usage should combine properties into a single object',
  );
});
