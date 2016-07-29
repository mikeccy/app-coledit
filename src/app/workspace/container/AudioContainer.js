import { connect } from 'react-redux'
import { playerEditDuration } from '../action/Player'
import Audio from '../component/Audio'

const inputProps = (state) => {
  return {
    playing: state.player.get('playing'),
    seekPos: state.player.get('seekPos'),
  }
}

const outputProps = (dispatch) => {
  return {
    onAudioLoad: (duration) => {
      dispatch(playerEditDuration(duration));
    },
  }
}

const AudioContainer = connect(
  inputProps,
  outputProps
)(Audio);

export default AudioContainer;
