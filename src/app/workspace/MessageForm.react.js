import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ValidationError, focusInvalidField } from '../../common/lib/validation';
import { sendMessage } from '../../common/lib/redux-firebase/actions';
import FileUploader from './FileUploader.react';

const _isValidTs = (val) => !isNaN(val) && isFinite(val);

/**
 * MessageForm Component
 * Form input for adding new messages
 */
class MessageForm extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    onUploadFinish: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedTs: 'startTs',
    };

    this.onUploadFinish = this.onUploadFinish.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this._onSubmit = this._onSubmit.bind(this);
  }

  componentDidMount() {
    // this.refs.messageText.getDOMNode().focus();
  }

  onUploadFinish(name, url) {
    if (this.props.onUploadFinish) {
      this.props.onUploadFinish(name, url);
    }
  }

  setTimestampOnSelection(timestamp) {
    if (!_isValidTs(timestamp)) {
      return;
    }
    if (this.state.selectedTs === 'startTs') {
      this.refs.startTs.value = timestamp;
    } else {
      this.refs.endTs.value = timestamp;
    }
  }

  _validate(user, startTs, endTs, message) {
    if (!user) {
      alert('Invalid user !');
      return false;
    }

    if (!_isValidTs(startTs)) {
      focusInvalidField(this, new ValidationError('required', { prop: 'startTs' }));
      return false;
    }

    if (!_isValidTs(endTs)) {
      focusInvalidField(this, new ValidationError('required', { prop: 'endTs' }));
      return false;
    }

    if (startTs > endTs) {
      alert('startTs > endTs !');
      focusInvalidField(this, new ValidationError('required', { prop: 'startTs' }));
      return false;
    }

    if (!message || !message.length) {
      focusInvalidField(this, new ValidationError('required', { prop: 'message' }));
      return false;
    }

    return true;
  }

  /**
   * Submit the new Message
   * @param {object} event - onsubmit event
   */
  _onSubmit(event) {
    event.preventDefault();

    const user = this.props.viewer;
    const startTs = parseFloat(this.refs.startTs.value);
    const endTs = parseFloat(this.refs.endTs.value);
    const message = this.refs.message.value.trim();

    // optional
    const file = this.refs.file.state;

    if (!this._validate(user, startTs, endTs, message)) {
      return;
    }

    // TODO cmc room not implemented
    this.sendMessage(user, { id: 'fake-room-id' }, {
      startTs,
      endTs,
      message,
      fileName: file.name ? file.name : '',
      fileUrl: file.url ? file.url : '',
    });

    event.target.reset();
  }

  async sendMessage(user, room, messageObj) {
    const { sendMessage } = this.props;
    try {
      await sendMessage(user, room, messageObj);
    } catch (error) {
      if (error instanceof ValidationError) {
        focusInvalidField(this, error);
        return;
      }
      throw error;
    }
  }

  render() {
    return (
      <form onSubmit={this._onSubmit}>
        <input name="startTs" ref="startTs" type="number" step="0.01" placeholder="Start time" />
        <input name="endTs" ref="endTs" type="number" step="0.01" placeholder="End time" />
        <input name="message" ref="message" type="text" placeholder="Message..." />
        <FileUploader {...{ onUploadFinish: this.onUploadFinish }} ref="file" />
        <input type="submit" value="Send" />
      </form>
    );
  }
}

export default connect(state => ({
  viewer: state.users.viewer
}), { sendMessage })(MessageForm);
