import Action from './Action';
import ActionType from './ActionType';
import ActionState from './ActionState';
import { List, Set, OrderedMap, Map } from 'immutable';

class ActionSeq {

  constructor(canvas) {
    this._seq = List();
    this._map = Map();

    // TODO add z-order iterator to the constructor
    this._activeActionsZIndIterator = null;
    this._activeActions = OrderedMap();

    // TODO refactor into lifecycle handler
    this._canvas = canvas;

    this.reset = this.reset.bind(this);
    this.has = this.has.bind(this);
    this.getAction = this.getAction.bind(this);
    this.addAction = this.addAction.bind(this);
    this.removeAction = this.removeAction.bind(this);
    this.addIndAction = this.addIndAction.bind(this);
    this.removeIndAction = this.removeIndAction.bind(this);
    this.startAction = this.startAction.bind(this);
    this.updateAction = this.updateAction.bind(this);
    this.stopAction = this.stopAction.bind(this);
    this._getRangeAction = this._getRangeAction.bind(this);

    this._addActive = this._addActive.bind(this);
    this._removeActive = this._removeActive.bind(this);
    this._removeAllInactive = this._removeAllInactive.bind(this);
    this.hasActive = this.hasActive.bind(this);
    this._updateActive = this._updateActive.bind(this);
  }

  reset() {
    this._activeActions = this._activeActions.clear();
    this._seq = this._seq.clear();
  }

  has(ind) {
    return this._seq.has(ind);
  }

  getAction(key) {
    return this._map.get(key, null);
  }

  addAction(action) {
    this._map = this._map.set(action.getKey(), action);
  }

  removeAction(action) {
    this._map = this._map.delete(action.getKey());
  }

  addIndAction(ind, action) {
    this.addAction(action);

    let targetSet = this._seq.get(ind, null);
    if (!targetSet) {
      targetSet = new Set();
    }
    targetSet = targetSet.add(action.getKey());
    this._seq = this._seq.set(ind, targetSet);
  }

  removeIndAction(ind, action) {
    this.removeAction(action);

    let targetSet = this._seq.get(ind, null);
    if (!targetSet) {
      return;
    }
    targetSet = targetSet.delete(action.getKey());
    this._seq = this._seq.set(ind, targetSet);
  }

  startAction(ind) {
    // clear canvas
    this._canvas._canvasClear();
    this.reset();

    this._map.map((action) => {
      this.addIndAction(action.getInd(), action);
      return true;
    });

    // go from 0 to ind
    // populate active action
    const rangeAction = this._getRangeAction(0, ind);
    rangeAction.map((val, key) => {
      // console.log(`Starting seq ${key}`);
      this.updateAction(key);
      return true;
    });
    this.updateAction(ind);
  }

  updateAction(ind) {
    let changed = false;

    // try to add
    const targetSet = this._seq.get(ind, null);
    if (targetSet) {
      targetSet.map((keyVal) => {
        if (this.hasActive(keyVal)) {
          return true;
        }
        const action = this.getAction(keyVal);
        // console.log(action);
        if (action && action.isActive(ind)) {
          // console.log(keyVal);
          this._addActive(action);
          changed = true;
        }
        return true;
      });
    }

    // console.log('yo ' + Math.floor(ind));

    // try to remove
    changed = changed || this._removeAllInactive(ind);
    if (!changed) {
      // console.log('ignored ' + this._activeActions.size);
      return;
    }

    // TODO clear canvas
    // console.log('Clearing');
    this._canvas._canvasClear();

    // render the active actions
    this._updateActive(ActionState.UPDATE);
  }

  stopAction(ind) {
    // go through active actions and stop types that needs stopping, video
  }

  _getRangeAction(startInd, endInd) {
    if (!endInd || startInd === endInd) {
      endInd = startInd + 1;
    }
    return this._seq.slice(startInd, endInd);
  }

  _addActive(action) {
    if (!action) {
      return;
    }
    this._activeActions = this._activeActions.set(action.getKey(), action);
  }

  _removeActive(action) {
    if (!action) {
      return;
    }
    this._activeActions = this._activeActions.delete(action.getKey());
  }

  _removeAllInactive(ind) {
    const oldSize = this._activeActions.size;
    this._activeActions = this._activeActions.filter((action, actionKey) => {
      if (!this.getAction(actionKey)) {
        return false;
      }
      const active = action.isActive(ind);
      return active;
    });
    return this._activeActions.size !== oldSize;
  }

  hasActive(key) {
    return this._activeActions.has(key);
  }

  _updateActive(state) {
    // TODO add z-order iterator to the mapper
    this._activeActions.map((action) => {
      action.handle(state);
      return true;
    });
  }
}

export default ActionSeq;
