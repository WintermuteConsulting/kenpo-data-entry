const express = require('express');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const dbApp = require('./reducers/dbApp').default;
const App = require('./components/App/App').default;

const mock = {
  selection: '',
  data: {
    '1jiu192': { title: 'Groveling Hands', attack: 'front left lapel grab' },
    '291038s': { title: 'Graceful Retreat', attack: 'rear hair pull' },
    '2949dda': { title: 'Pondering Crane Strike', attack: 'right side leg sweep' },
    '0fds02s': { title: 'Lurking Tiger Punch', attack: 'left side elbow punch' },
  },
};

const router = express.Router();

router.get('/', (req, res) => {
  const store = createStore(dbApp, mock);
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const preloadedState = store.getState();
  res.render('index', { html, preloadedState });
});

module.exports = router;
