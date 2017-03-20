import selection from './selection';
import data from './data';

function dbApp(state, action) {
  return {
    selection: selection(state.selection, action),
    data: data(state.data, action),
  };
}

export default dbApp;
