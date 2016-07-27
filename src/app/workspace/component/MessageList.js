import Component from 'react-pure-render/component';
import React from 'react';

class MessageList extends Component {

  constructor(props) {
    super(props);

    this.renderMessage = this.renderMessage.bind(this);
  }

  // Render a single message
  renderMessage(message) {
    const {
      onClickEdit,
    } = this.props;

    const sender = message.sentBy;

    return <div key={message._id} className="message flex flex-row">
      <img src={sender.avatar} alt={sender.email} className="avatar" />
      <div className="message-wrapper" onClick={() => onClickEdit(message._id)}>
        <p className="message-header">
          <span className="username font-600">{sender.email}</span>
          <span className="sent-date font-300">
            {moment(message.createdAt).format('MMM Do, hh:mm:ss')}
          </span>
        </p>
        <p className="message-content font-300">
          {message.text}
        </p>
      </div>
    </div>;
  }

  render() {
    const {
      messages,
    } = this.props;

    return <main className="chat flex flex-column flex-1 clear">
      {messages.map(this.renderMessage)}
    </main>;
  }
}

export default MessageList;
