import { curry } from 'ramda';
import { mapYield } from './helpful';

function apply(obj, method, ...args) {
  return ({
    type: 'APPLY',
    params: {
      obj,
      method,
      args,
    },
  });
}

function invoke(effect) {
  switch (effect.type) {
    case 'APPLY': {
      const { obj, method, args } = effect.params;
      return method.apply(obj, args);
    }

    default:
      throw new TypeError(`Unknown effect type ${effect.type}`);
  }
}

const run = curry(mapYield)(invoke);

export { apply, invoke, run };
