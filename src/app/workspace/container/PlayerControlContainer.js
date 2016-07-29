import { connect } from 'react-redux'
import { playerEditSeek } from '../action/Player'
import PlayerControl from '../component/PlayerControl'

const inputProps = (state) => {
  return {
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
