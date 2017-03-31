import R from 'ramda';

// Convert a raw mongo document that looks like this:
// {
//   _id: (some ObjectID),
//   ... fields ...
// }
//
// into an object that looks like this:
// {
//   id (just a string): {
//     ... fields ...
//   }
// }
export function transmog(doc) {
  // Mongo uses the name _id by default. Let's stick with that.
  // eslint-disable-next-line no-underscore-dangle
  const id = doc._id.toHexString();
  return {
    [id]: R.dissoc('_id', doc),
  };
}

// Decorates a throwing function to return null instead.
export function maybeTry(f) {
  return function maybeTryWrapper(...args) {
    try {
      return f(...args);
    } catch (e) {
      return null;
    }
  };
}

// Maps f over a generator's yielded values.
export function mapYield(f, genf) {
  return function* mapYieldWrapper(...args) {
    // We can't use for...of, because that will throw away the return value.
    // We can't use yield*, because we can't apply a function to each value it yields.
    // So, good old while-loop.
    const gen = genf(...args);
    let current = gen.next();
    while (!current.done) {
      try {
        current = gen.next(yield f(current.value));
      } catch (e) {
        current = gen.throw(e);
      }
    }
    return current.value;
  };
}

// Decorates a method that takes a callback to instead return a Promise.
// IMPORTANT: this function was created to deal with Mongo's db.collection()
// function, which doesn't adopt the Promise paradigm. This function is intended
// to be invoked using the apply() effect, which binds this.
// ONLY FOR CALLBACKS OF THE FORM (error, result) => {}
export function promiseify(method) {
  return function promiseifyWrapper(...args) {
    return new Promise((resolve, reject) => {
      method.bind(this)(...args, (error, result) => {
        if (error === null) {
          resolve(result);
        } else {
          reject(error);
        }
      });
    });
  };
}

// Executes methods on an Express res object using a Response as a template.
export function expressify(res, template) {
  if (template.body) {
    // if there is a body, it's only ever JSON
    res.status(template.header.status).json(template.body);
  } else {
    // otherwise it's just a status and optional header fields
    const fields = R.dissoc('status', template.header);
    res.set(fields).sendStatus(template.header.status);
  }
}

// Combines the params and body properties on an Express req into a single object.
export function expand(req) {
  if (req.body) {
    return Object.assign({}, req.params, { body: req.body });
  }
  return Object.assign({}, req.params);
}
