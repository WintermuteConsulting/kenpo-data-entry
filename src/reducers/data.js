function data(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_ITEM':
      return Object.assign({}, state, { [action.id]: action.datum });

    default:
      return state;
  }
}

export default data;
