import { lensProp, lensPath, view, set, compose, dissoc } from 'ramda';

const emptyItem = {
  title: 'Untitled technique',
  attack: '',
};

const defaultState = {
  selection: '',
  data: {},
};

const selectionLens = lensProp('selection');
const dataLens = lensProp('data');
const itemLens = key => lensPath(['data', key]);

function dbApp(state = defaultState, action) {
  switch (action.type) {
    case 'SET_SELECTION':
      return set(selectionLens, action.id, state);

    case 'CREATE_ITEM': {
      // create a new item and set it as the selection
      return compose(
        set(selectionLens, action.id),
        set(itemLens(action.id), emptyItem),
      )(state);
    }

    case 'UPDATE_ITEM': {
      if (action.id !== '') {
        return set(itemLens(action.id), action.datum, state);
      }

      return state;
    }

    case 'DELETE_ITEM': {
      // delete the selected item and set the selection to nothing
      const selection = view(selectionLens, state);
      if (selection !== '') {
        const newData = dissoc(selection, view(dataLens, state));
        return compose(
          set(selectionLens, ''),
          set(dataLens, newData),
        )(state);
      }

      return state;
    }

    default:
      return state;
  }
}

export default dbApp;
