import { connect } from 'react-redux'
import { playerStartPlaying, playerPausePlaying, playerStopPlaying } from '../action/Player'
import Playback from '../component/Playback'

const inputProps = (state) => {
  return {
    playing: state.player.get('playing'),
  }
}

const outputProps = (dispatch) => {
  return {
    onStartPlaying: () => {
      dispatch(playerStartPlaying());
    },
    onPausePlaying: () => {
      dispatch(playerPausePlaying());
    },
    onStopPlaying: () => {
      // hack for the howler library, seek() not work if is non-zero
      dispatch(playerStopPlaying(0.000001));
    },
  }
}

const PlaybackContainer = connect(
  inputProps,
  outputProps
)(Playback);

export default PlaybackContainer;
