import R from 'ramda';

function path(state, action) {
  return R.assoc('path', action.path, state);
}

function create(state, action) {
  const { collection, item } = action.path;
  return R.assocPath(['entities', collection, item], action.datum, state);
}

function update(state, action) {
  const { collection, item } = action.path;
  return R.assocPath(['entities', collection, item], action.datum, state);
}

// 'delete' is a reserved keyword
function del(state, action) {
  const { collection, item } = action.path;
  return R.dissocPath(['entities', collection, item], state);
}

export default function root(state = {}, action) {
  switch (action.type) {
    case 'CHANGE_PATH': return path(state, action);
    case 'CREATE_SUCCESS': return create(state, action);
    case 'CREATE_FAILURE': return state;
    case 'UPDATE_SUCCESS': return update(state, action);
    case 'UPDATE_FAILURE': return state;
    case 'DELETE_SUCCESS': return del(state, action);
    case 'DELETE_FAILURE': return state;
    default: return state;
  }
}
