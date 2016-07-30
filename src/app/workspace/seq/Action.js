import ActionType from './ActionType';
import ActionState from './ActionState';

class Action {
  constructor(key, val, stateHandler) {
    this._key = key;
    this._val = val;
    this._stateHandler = stateHandler;

    this.getKey = this.getKey.bind(this);
    this.getVal = this.getVal.bind(this);
  }

  getInd() {
    return this._val.startTs;
  }

  getKey() {
    return this._key;
  }

  getVal() {
    return this._val;
  }

  isActive(ind) {
    // TODO refactor
    return this._val.startTs <= ind && this._val.endTs >= ind;
  }

  handle(state) {
    // console.log(`Rendering ${this._key}`);
    this._stateHandler(state, this._key, this._val);
  }
}

export default Action;
