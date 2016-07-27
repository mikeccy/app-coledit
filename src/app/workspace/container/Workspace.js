import Component from 'react-pure-render/component';
import React from 'react';
import { connect } from 'react-redux';
import { userService, messageService } from '../App';
import { userLogin } from '../action/User';
import { messageAdded } from '../action/Message';
import UserContainer from './UserContainer';
import MessageContainer from './MessageContainer';
// import ComposeMessageContainer from '../container/ComposeMessageContainer';

class Workspace extends Component {

  componentDidUpdate() {
    // // Whenever something happened, scroll to the bottom of the chat window
    // const node = this.getDOMNode().querySelector('.chat');
    // node.scrollTop = node.scrollHeight - node.clientHeight;
  }

  componentDidMount() {
    const {
      dispatch
    } = this.props;

    userService.find().then(
      (page) => page.data.map((user) => dispatch(userLogin(user)))
    );
    userService.on('created',
      (user) => dispatch(userLogin(user))
    );

    messageService.find({
      query: {
        $sort: { createdAt: -1 },
        $limit: this.props.limit || 1000
      }
    }).then(
      (page) => page.data.map((message) => dispatch(messageAdded(message)))
    );
    messageService.on('created',
      (message) => dispatch(messageAdded(message))
    );
  }

  render() {
    return (
      <div id="app" className="flex flex-column">
        <header className="title-bar flex flex-row flex-center">
          <div className="title-wrapper block center-element">
            <img className="logo" src="http://feathersjs.com/img/feathers-logo-wide.png" alt="Feathers Logo" />
            <span className="title">Coledit</span>
          </div>
        </header>
        <div className="flex flex-row flex-1 clear">
          <UserContainer />
          <div className="flex flex-column col col-9">
            <MessageContainer />
            {/*<ComposeMessageContainer />*/}
          </div>
        </div>
      </div>
    );
  }
}
Workspace = connect()(Workspace)

export default Workspace;
