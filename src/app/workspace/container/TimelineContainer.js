import { connect } from 'react-redux'
import { playerEditSeek } from '../action/Player'
import Timeline from '../component/Timeline'

const inputProps = (state) => {
  return {
    seekPos: state.player.get('seekPos'),
    duration: state.player.get('duration'),
  }
}

const outputProps = (dispatch) => {
  return {
    onSeekPos: (seekPos) => {
      dispatch(playerEditSeek(seekPos));
    },
  }
}

const TimelineContainer = connect(
  inputProps,
  outputProps
)(Timeline);

export default TimelineContainer;
