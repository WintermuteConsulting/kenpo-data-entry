import test from 'tape';
import * as effects from './effects';

const sumObj = {
  c: 5,
  sum(a, b) { return a + b + this.c; },
};

test('test apply', (t) => {
  const mockArgs = [1, 2];
  const expected = {
    type: 'APPLY',
    params: {
      obj: sumObj,
      method: sumObj.sum,
      args: mockArgs,
    },
  };

  const actual = effects.apply(sumObj, sumObj.sum, ...mockArgs);
  t.deepEqual(actual, expected);
  t.end();
});

test('test invoke', (t) => {
  t.is(effects.invoke(effects.apply(sumObj, sumObj.sum, 5, 5)), 15, 'invoke returns the correct result');
  t.throws(() => effects.invoke({ type: 'WHATEVER' }), TypeError, 'invoke should throw on unknown effects');
  t.end();
});

test('test run', (t) => {
  const mockObj = {
    id(x) { return x; },
  };

  function* genf() {
    const a = yield effects.apply(mockObj, mockObj.id, 1);
    const b = yield effects.apply(mockObj, mockObj.id, 2);
    const c = yield effects.apply(mockObj, mockObj.id, 3);
    return a + b + c;
  }

  const g = effects.run(genf)();
  const first = g.next().value;
  const second = g.next(first).value;
  const third = g.next(second).value;
  const res = g.next(third).value;

  t.is(first, 1);
  t.is(second, 2);
  t.is(third, 3);
  t.is(res, first + second + third);
  t.end();
});
