import { Map } from 'immutable';

const initial = Map({
  playing: false,
  seekPos: 0,
  duration: 0,
});

const player = (state = initial, action) => {
  switch (action.type) {
    case 'PLAYER_START_PLAYING':
      return state.set('playing', true);
    case 'PLAYER_STOP_PLAYING':
      return state.set('playing', false);
    case 'PLAYER_EDIT_SEEK':
    case 'PLAYER_AUTO_UPDATE_SEEK':
      return state.set('seekPos', action.seekPos);
    case 'PLAYER_EDIT_DURATION':
      return state.set('duration', action.duration);
    default:
      return state;
  }
}

export default player;
