import { lensProp, lensPath, view, set, compose } from 'ramda';

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
      const timestamp = Date.now().toString();
      return compose(
        set(selectionLens, timestamp),
        set(itemLens(timestamp), emptyItem),
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
        const newData =
          Object.keys(view(dataLens, state))
          .filter(key => key !== selection)
          .reduce((obj, key) => Object.assign(obj, { [key]: view(itemLens(key), state) }), {});
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
