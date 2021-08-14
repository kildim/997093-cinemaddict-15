import {STATES} from '../constants/states.js';

export default class SiteState {
  constructor() {
    this._state = new Set();
  }

  hasState(state) {
    return this._state.has(STATES[state]);
  }

  setState (state) {
    this._state.add(STATES[state]);
  }
}
