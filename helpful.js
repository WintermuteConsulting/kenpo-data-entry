const R = require('ramda');

// Function to stringify raw ObjectIDs from Mongo
const idLens = R.lensProp('_id');
const toStringLens = R.lensProp('toHexString');
const _stringifyID = R.over(idLens, id => R.view(toStringLens, id).call(id))

module.exports = { stringifyID: _stringifyID }
