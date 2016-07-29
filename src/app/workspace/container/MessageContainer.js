import { connect } from 'react-redux';
import { messageEditStart } from '../action/Message';
import MessageList from '../component/MessageList';

const inputProps = (state) => {
  return {
    messages: state.messages,
  }
}

const outputProps = (dispatch) => {
  return {
    onClickEdit: (messageId) => {
      dispatch(messageEditStart(messageId));
    },
  }
}

const MessageContainer = connect(
  inputProps,
  outputProps
)(MessageList);

export default MessageContainer;
