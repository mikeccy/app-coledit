import { connect } from 'react-redux'
import PlayerControl from '../component/PlayerControl'

const inputProps = (state) => {
  return {
    seekPos: state.player.get('seekPos'),
    duration: state.player.get('duration'),
  }
}

const outputProps = (dispatch) => {
  return {
  }
}

const PlayerControlContainer = connect(
  inputProps,
  outputProps
)(PlayerControl);

export default PlayerControlContainer;
