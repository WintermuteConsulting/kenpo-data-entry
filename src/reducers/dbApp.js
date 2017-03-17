const initialState = {
  selection: '',
  data: {},
};

function dbApp(state = initialState, action) {
  switch (action.type) {
    case 'SET_SELECTION':
      return Object.assign({}, state, { selection: action.id });

    default:
      return state;
  }
}

export default dbApp;
