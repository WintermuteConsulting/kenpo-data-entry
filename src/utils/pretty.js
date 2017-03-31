/* eslint comma-dangle: off */
import co from 'co';
import { curry, __ as _ } from 'ramda';
import * as handler from './handlers';
import { run } from './effects';

const request = curry(handler.handleRequest);
const onCollection = curry(handler.handleCollection);
const onItem = curry(handler.handleItem);

export function getCollection(mongoc, params) {
  return co(
    run(
      request(_, _, onCollection(_, _, handler.getMany))
    )(mongoc, params)
  );
}

export function insertIntoCollection(mongoc, params) {
  return co(
    run(
      request(_, _, onCollection(_, _, handler.createOne))
    )(mongoc, params)
  );
}

export function getItem(mongoc, params) {
  return co(
    run(
      request(_, _, onItem(_, _, handler.getOne))
    )(mongoc, params)
  );
}

export function updateItem(mongoc, params) {
  return co(
    run(
      request(_, _, onItem(_, _, handler.putOne))
    )(mongoc, params)
  );
}

export function deleteItem(mongoc, params) {
  return co(
    run(
      request(_, _, onItem(_, _, handler.deleteOne))
    )(mongoc, params)
  );
}
