import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import pug from 'pug';
import root from '../reducers/root';
import AppContainer from '../components/AppContainer/AppContainer';
import { apply } from './effects';
import { transmog, promiseify } from './helpful';
import Response from './Response';
import State from '../data/state';

// Renders the client application.
export default function* renderClient(dbc) {
  try {
    const db = yield apply(dbc, dbc.connect);
    try {
      const collection =
      yield apply(db, promiseify(db.collection), 'techniques', { strict: true });
      const cursor = collection.find();
      const docs = yield apply(cursor, cursor.toArray);
      const data = Object.assign({}, ...docs.map(transmog));
      const state = new State({ collection: 'techniques', item: null }, { techniques: data });
      const store = createStore(root, state, applyMiddleware(thunk));
      const html = renderToString(
        <Provider store={store}>
          <AppContainer />
        </Provider>,
      );
      const preloadedState = store.getState();
      const result = pug.renderFile('./build/views/index.pug', { html, preloadedState });
      return new Response().ok().withBody(result);
    } catch (e) {
      return new Response().serverError();
    } finally {
      yield apply(db, db.close);
    }
  } catch (e) {
    return new Response().serverError();
  }
}
