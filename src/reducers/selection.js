function selection(state = '', action) {
  switch (action.type) {
    case 'SET_SELECTION':
      return action.id;

    default:
      return state;
  }
}

export default selection;
