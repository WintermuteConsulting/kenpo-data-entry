import test from 'tape';
import changePath from './path';

test('test change path action', (t) => {
  const path = { foo: 'bar', bar: 'baz' };
  const expected = { type: 'CHANGE_PATH', path };
  const actual = changePath(path);
  t.deepEqual(actual, expected);
  t.end();
});
