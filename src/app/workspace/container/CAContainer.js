import { connect } from 'react-redux';
import CanvasAudio from '../component/CanvasAudio';
import {
  playerEditDuration,
  playerEditedSeek,
  playerAutoUpdateSeek,
  playerPausePlaying,
} from '../action/Player';

const inputProps = (state) => {
  return {
    messages: state.messages,
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
    onAudioEnd: () => {
      dispatch(playerPausePlaying());
    },
  }
}

const CAContainer = connect(
  inputProps,
  outputProps
)(CanvasAudio);

export default CAContainer;
