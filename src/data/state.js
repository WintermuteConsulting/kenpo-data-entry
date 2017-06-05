export default class State {
  constructor(path, ...entities) {
    this.path = path;
    this.entities = Object.assign({}, ...entities);
  }
}
