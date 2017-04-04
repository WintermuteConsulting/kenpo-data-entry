import { ObjectID } from 'mongodb';
import { apply } from './effects';
import Response from './Response';
import { transmog, maybeTry, promiseify } from './helpful';

const maybeObjectID = maybeTry(ObjectID);

// On the pyramid of doom: try-catch is the only way co communicates errors.
// We can't have one catch and disambiguate the error because mongo only returns
// one type of error (MongoError).

// --- HANDLE REQUEST ---------------------------------------------------------
// the top-level generator, with which lower-level generators are composed
// need to service a GET request with an ID?
// handleRequest(handleItem(getOne)
// need to service a POST request?
// handleRequest(handleCollection(createOne))
// etc
export function* handleRequest(client, params, genf) {
  try {
    const db = yield apply(client, client.connect);
    try {
      const collection =
      yield apply(db, promiseify(db.collection), params.collection, { strict: true });
      return yield* genf(collection, params);
    } catch (e) {
      return new Response().notFound();
    } finally {
      yield apply(db, db.close);
    }
  } catch (e) {
    return new Response().serverError();
  }
}

// --- HANDLE ITEM ---------------------------------------------------------
// decorates a generator with ObjectId testing
export function* handleItem(collection, params, genf) {
  const oid = maybeObjectID(params.id);
  if (oid) {
    try {
      // delegate to a generator that handles a single item
      return yield* genf(oid, collection, params.body);
    } catch (e) {
      return new Response().serverError();
    }
  } else {
    return new Response().notFound();
  }
}

// --- HANDLE COLLECTION ------------------------------------------------------
export function* handleCollection(collection, params, genf) {
  try {
    // delegate to a generator that handles a collection
    return yield* genf(collection, params.body);
  } catch (e) {
    return new Response().serverError();
  }
}

// --- BOTTOM-LEVEL GENERATORS ------------------------------------------------
// Gets the specified item from the collection.
export function* getOne(id, collection) {
  const query = { _id: id };
  const result = yield apply(collection, collection.findOne, query);
  if (result) {
    return new Response().ok().withBody(transmog(result));
  }
  return new Response().notFound();
}

// Replaces the item in the collection.
export function* putOne(id, collection, reqBody) {
  const query = { _id: id };
  const result = yield apply(collection, collection.findOneAndReplace, query, reqBody);
  if (result.value) {
    return new Response().ok();
  }
  return new Response().notFound();
}

// Deletes the item from the collection.
export function* deleteOne(id, collection) {
  const query = { _id: id };
  const result = yield apply(collection, collection.findOneAndDelete, query);
  if (result.value) {
    return new Response().ok();
  }
  return new Response().notFound();
}

// Gets all of the items in a collection.
export function* getMany(collection) {
  const cursor = collection.find();
  const results = yield apply(cursor, cursor.toArray);
  const data = Object.assign({}, ...results.map(transmog));
  return new Response().ok().withBody(data);
}

// Inserts an item into the specified collection.
export function* createOne(collection, reqBody) {
  const result = yield apply(collection, collection.insertOne, reqBody);
  return new Response()
  .created()
  .withHeader({ Location: result.insertedId.toHexString() });
}
