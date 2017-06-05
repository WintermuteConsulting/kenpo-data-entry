export function getPath(state) {
  return state.path;
}

export function getCollection(state, path) {
  return state.entities[path.collection];
}

export function getItem(state, path) {
  return state.entities[path.collection][path.item];
}
