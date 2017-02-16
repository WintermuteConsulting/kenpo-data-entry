import test from 'tape';

test('auto pass', (t) => {
  t.pass('This test will pass.');
  t.end();
});

test('simple arithmetic', (t) => {
  const expected = 4;
  const actual = 2 + 2;

  t.equal(actual, expected, 'The universe broke');
  t.end();
});
