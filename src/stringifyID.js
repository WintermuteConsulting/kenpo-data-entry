import R from 'ramda';

// Function to stringify raw ObjectIDs from Mongo
const idLens = R.lensProp('_id');
const toStringLens = R.lensProp('toHexString');
const stringifyID = R.over(idLens, id => R.view(toStringLens, id).call(id));

export default stringifyID;
