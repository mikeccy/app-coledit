import React from 'react';

// A placeholder image if the user does not have one
const PLACEHOLDER = 'https://placeimg.com/60/60/people';
// An anonymous user if the message does not have that information
const dummyUser = {
  avatar: PLACEHOLDER,
  email: 'Anonymous'
};

const MessageList = React.createClass({
  // Render a single message
  renderMessage(message) {
    const sender = message.sentBy || dummyUser;

    return <div key={message._id} className="message flex flex-row">
      <img src={sender.avatar || PLACEHOLDER} alt={sender.email} className="avatar" />
      <div className="message-wrapper">
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
  },

  render() {
    return <main className="chat flex flex-column flex-1 clear">
      {this.props.messages.map(this.renderMessage)}
    </main>;
  }
});

export default MessageList;
