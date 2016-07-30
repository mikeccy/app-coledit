import { connect } from 'react-redux';
import { messageService } from '../App';
import ComposeMessage from '../component/ComposeMessage';
import {
  Message,
  editingMessageStart,
  editingMessageText,
  editingMessageStartTs,
  editingMessageEndTs,
  editingMessageSubmit,
  editingMessageEnd
} from '../action/Message';
import { playerEditSeek } from '../action/Player';

const isValidTs = (val) => !isNaN(val) && isFinite(val);

const validation = (editingMessage) => {
  const startTs = parseFloat(editingMessage.get('startTs'));
  const endTs = parseFloat(editingMessage.get('endTs'));
  if (!isValidTs(startTs)) {
    alert('起始秒❌');
    return false;
  }

  if (!isValidTs(endTs)) {
    alert('结束秒❌');
    return false;
  }

  if (startTs > endTs) {
    alert(`起始秒(${startTs}) > 结束秒(${endTs})`);
    return false;
  }
  return true;
}

const inputProps = (state) => {
  return {
    playing: state.player.get('playing'),
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
    _messageEditStartTs: (ts) => {
      dispatch(editingMessageStartTs(ts));
      dispatch(playerEditSeek(ts));
    },
    _messageEditEndTs: (ts) => {
      dispatch(editingMessageEndTs(ts));
      dispatch(playerEditSeek(ts));
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
    onMessageEditStartTs: (event) => {
      outputProps._messageEditStartTs(event.target.value);
    },
    onMessageEditEndTs: (event) => {
      outputProps._messageEditEndTs(event.target.value);
    },
    onMessageEditSubmit: (event) => {
      outputProps._messageEditSubmit();

      if (!validation(inputProps.editingMessage)) {
        return;
      }
      console.log(inputProps.editingMessage.toString());


      if (inputProps.editingMessage.isNew()) {
        messageService.create(inputProps.editingMessage)
          .then(outputProps._messageEditEnd());
      } else {
        messageService.update(inputProps.editingMessage.get('_id'), inputProps.editingMessage)
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
