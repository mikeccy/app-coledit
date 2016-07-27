import { connect } from 'react-redux'
import { messageService } from '../App';
import ComposeMessage from '../component/ComposeMessage'
import {
  Message,
  editingMessageStart,
  editingMessageText,
  editingMessageSubmit,
  editingMessageEnd
} from '../action/Message'

const inputProps = (state) => {
  return {
    editingMessage: state.editingMessage,
  }
}

const outputProps = (dispatch) => {
  return {
    _messageEditStart: (message) => {
      dispatch(editingMessageStart(message));
    },
    _messageEditText: (text) => {
      dispatch(editingMessageText(text));
    },
    _messageEditSubmit: () => {
      dispatch(editingMessageSubmit());
    },
    _messageEditEnd: () => {
      dispatch(editingMessageEnd());
    },
  };
}

const mixedProps = (inputProps, outputProps, ownProps) => {
  const mixed = {
    onMessageEditText: (event) => {
      outputProps._messageEditText(event.target.value);
    },
    onMessageEditSubmit: (event) => {
      outputProps._messageEditSubmit();

      if (inputProps.editingMessage.isNew()) {
        messageService.create(inputProps.editingMessage)
          .then(outputProps._messageEditEnd());
      } else {
        messageService.update(inputProps.editingMessage)
          .then(outputProps._messageEditEnd());
      }

      event.preventDefault();
    },
  };
  return Object.assign({}, ownProps, inputProps, mixed);
}

const ComposeMessageContainer = connect(
  inputProps,
  outputProps,
  mixedProps
)(ComposeMessage);

export default ComposeMessageContainer;
