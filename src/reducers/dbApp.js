import { view, set, compose } from 'ramda';
import State, { lens, deleteDatum } from '../data/state';
import Technique from '../data/technique';

const setCollection = (state, action) => {
  const currentCollection = view(lens.collection, state);
  const currentItem = view(lens.item, state);
  if (currentCollection !== action.name) {
    if (currentItem) {
      return compose(
        set(lens.item, ''),
        set(lens.collection, action.name),
      )(state);
    }
    return set(lens.collection, action.name, state);
  }
  return state;
};

const setItem = (state, action) => {
  const currentCollection = view(lens.collection, state);
  const currentItem = view(lens.item, state);
  if (currentCollection) {
    if (currentItem !== action.id) {
      return set(lens.item, action.id, state);
    }
    return state;
  }
  return state;
};

const createItem = (state, action) => {
  const currentCollection = view(lens.collection, state);
  if (currentCollection) {
    switch (currentCollection) {
      case 'techniques': {
        const datum = new Technique();
        return compose(
          set(lens.item, action.id),
          set(lens.datum(currentCollection, action.id), datum),
        )(state);
      }
      default:
        return state;
    }
  }
  return state;
};

const updateSelectedItem = (state, action) => {
  const currentCollection = view(lens.collection, state);
  const currentItem = view(lens.item, state);
  if (currentCollection) {
    if (currentItem) {
      return set(lens.datum(currentCollection, currentItem), action.datum, state);
    }
    return state;
  }
  return state;
};

const deleteSelectedItem = (state) => {
  const currentCollection = view(lens.collection, state);
  const currentItem = view(lens.item, state);
  if (currentCollection) {
    if (currentItem) {
      return compose(
        set(lens.item, ''),
        deleteDatum(currentCollection, currentItem),
      )(state);
    }
    return state;
  }
  return state;
};

function dbApp(state = new State(), action) {
  switch (action.type) {
    case 'SET_COLLECTION': return setCollection(state, action);
    case 'SET_ITEM': return setItem(state, action);
    case 'CREATE_ITEM': return createItem(state, action);
    case 'UPDATE_SELECTED_ITEM': return updateSelectedItem(state, action);
    case 'DELETE_SELECTED_ITEM': return deleteSelectedItem(state, action);
    default: return state;
  }
}

export default dbApp;
