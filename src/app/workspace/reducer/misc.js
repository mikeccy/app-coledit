import { Map } from 'immutable';

const initial = Map({
  newMessagePos: 0,
});

const misc = (state = initial, action) => {
  switch (action.type) {
    case 'MISC_NEW_MESSAGE_POS':
      return state.set('newMessagePos', action.newMessagePos);
    default:
      return state;
  }
}

export default misc;
