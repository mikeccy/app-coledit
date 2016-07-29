import { connect } from 'react-redux'
import { playerEditDuration, playerEditedSeek, playerAutoUpdateSeek } from '../action/Player'
import Audio from '../component/Audio'

const inputProps = (state) => {
  return {
    playing: state.player.get('playing'),
    seekPos: state.player.get('seekPos'),
    userSeekPos: state.player.get('userSeekPos'),
  }
}

const outputProps = (dispatch) => {
  return {
    onAudioLoad: (duration) => {
      dispatch(playerEditDuration(duration));
    },
    onAudioPlayUpdate: (seekPos) => {
      dispatch(playerAutoUpdateSeek(seekPos));
    },
    onAudioSeekEdited: () => {
      dispatch(playerEditedSeek());
    },
  }
}

const AudioContainer = connect(
  inputProps,
  outputProps
)(Audio);

export default AudioContainer;
