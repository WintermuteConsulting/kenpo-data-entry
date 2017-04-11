import R from 'ramda';

// --- STATE ------------------------------------------------------------------
export class State {
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

// Ramda lenses can get and set proprties, but not delete them.
const deleteDatum = (col, id) => R.dissocPath(['data', col, id]);

export const lens = { collection, item, datum };
export { deleteDatum };
