export default class SiteState {
  constructor() {
    this._state = new Set();
  }

  hasState(state) {
    return this._state.has(state);
  }

  setState (state) {
    this._state.add(state);
  }
}
