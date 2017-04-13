import R from 'ramda';

// --- STATE ------------------------------------------------------------------
export default class State {
  constructor(data = {}, col = '', item = '') {
    this.collection = col;
    this.item = item;
    this.data = data;
  }
}

// --- STATE ACCESSORS --------------------------------------------------------
const collection = R.lensProp('collection');
const item = R.lensProp('item');
const datum = (col, id) => R.lensPath(['data', col, id]);

// Selector to get a collection's data. Why not a lens? Because collections can't be set.
const getData = (col, state) => R.view(R.lensPath(['data', col]), state);

// Ramda lenses can get and set proprties, but not delete them.
const deleteDatum = (col, id) => R.dissocPath(['data', col, id]);

const lens = { collection, item, datum };
export { lens, getData, deleteDatum };
