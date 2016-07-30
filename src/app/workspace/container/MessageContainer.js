import { connect } from 'react-redux';
import { Message, editingMessageStart } from '../action/Message';
import MessageList from '../component/MessageList';

const inputProps = (state) => {
  return {
    seekPos: state.player.get('seekPos'),
    messages: state.messages,
  }
}

const outputProps = (dispatch) => {
  return {
    onClickEdit: (message) => {
      dispatch(editingMessageStart(new Message(message)));
    },
  }
}

const MessageContainer = connect(
  inputProps,
  outputProps
)(MessageList);

export default MessageContainer;
