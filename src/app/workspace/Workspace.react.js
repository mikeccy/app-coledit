import App from './App';
import React from 'react';
import UserList from './UserList.react';
import MessageList from './MessageList.react';
import ComposeMessage from './ComposeMessage.react';

const Workspace = React.createClass({
  getInitialState() {
    return {
      users: [],
      messages: []
    };
  },

  componentDidUpdate: function() {
    // // Whenever something happened, scroll to the bottom of the chat window
    // const node = this.getDOMNode().querySelector('.chat');
    // node.scrollTop = node.scrollHeight - node.clientHeight;
  },

  componentDidMount() {
    const userService = App.service('users');
    const messageService = App.service('coledit-workspaces');

    // Find all users initially
    userService.find().then(page => this.setState({ users: page.data }));
    // Listen to new users so we can show them in real-time
    userService.on('created', user => this.setState({
      users: this.state.users.concat(user)
    }));

    // Find the previous messages
    messageService.find({
      query: {
        $sort: { createdAt: -1 },
        $limit: this.props.limit || 1000
      }
    }).then(page => this.setState({ messages: page.data.reverse() }));
    // Listen to newly created messages
    messageService.on('created', message => this.setState({
      messages: this.state.messages.concat(message)
    }));
  },

  render() {
    return <div className="flex flex-row flex-1 clear">
      <UserList users={this.state.users} />
      <div className="flex flex-column col col-9">
        <MessageList users={this.state.users} messages={this.state.messages} />
        <ComposeMessage />
      </div>
    </div>
  }
});

export default Workspace;
