import { connect } from 'react-redux';
import { Message, editingMessageStart } from '../action/Message';
import MessageList from '../component/MessageList';
import { app } from '../App';

const inputProps = (state) => {
  return {
    seekPos: state.player.get('seekPos'),
    messages: state.messages,
    editingMessageId: state.editingMessage.get('_id'),
  }
}

const outputProps = (dispatch) => {
  return {
    onClickEdit: (message) => {
      const me = app.get('user');
      if (me && me._id === message.userId) {
        dispatch(editingMessageStart(new Message(message)));
      }
    },
  }
}

const MessageContainer = connect(
  inputProps,
  outputProps
)(MessageList);

export default MessageContainer;
