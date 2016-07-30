import Component from 'react-pure-render/component';
import React from 'react';
import { connect } from 'react-redux';
import { userService, messageService } from '../App';
import { userLogin } from '../action/User';
import { messageAdded, messageUpdated } from '../action/Message';
import UserContainer from './UserContainer';
import PlayerContainer from './PlayerContainer';
import MessageContainer from './MessageContainer';
import ComposeMessageContainer from './ComposeMessageContainer';
import 'react-virtualized/styles.css';

class Workspace extends Component {

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
        $sort: { startTs: -1 },
        $limit: this.props.limit || 1000
      }
    }).then(
      (page) => page.data.reverse().map((message) => dispatch(messageAdded(message)))
    );
    messageService.on('created',
      (message) => dispatch(messageAdded(message))
    );
    messageService.on('updated',
      (message) => dispatch(messageUpdated(message))
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
            <PlayerContainer />
            <MessageContainer />
            <ComposeMessageContainer />
          </div>
        </div>
      </div>
    );
  }
}
Workspace = connect()(Workspace)

export default Workspace;
