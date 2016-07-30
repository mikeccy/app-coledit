import { connect } from 'react-redux';
import { Message, editingMessageStart } from '../action/Message';
import MessageList from '../component/MessageList';
import { app, messageService } from '../App';
import { playerEditSeek } from '../action/Player';

const validateModification = (message) => {
  const me = app.get('user');
  return me && me._id === message.userId;
}

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
      if (validateModification(message)) {
        dispatch(editingMessageStart(new Message(message)));
        dispatch(playerEditSeek(message.startTs));
      }
    },
    onClickDelete: (message) => {
      if (validateModification(message)) {
        messageService.remove(message._id, message);
      }
    },
  }
}

const MessageContainer = connect(
  inputProps,
  outputProps
)(MessageList);

export default MessageContainer;
