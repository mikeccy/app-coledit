import './WorkspacePage.scss';
import MessageList from './MessageList.react';
import Component from 'react-pure-render/component';
import Gravatar from 'react-gravatar';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { onUsersPresence } from '../../common/users/actions';
import { queryFirebase } from '../../common/lib/redux-firebase';
import AudioControl from './AudioControl.react';
import MessageForm from './MessageForm.react';
import Canvas from './Canvas.react';
import { listenMessage } from '../../common/lib/redux-firebase/actions';

import { List, Set, OrderedMap, Map } from 'immutable';

class WorkspacePage extends Component {

  static propTypes = {
    children: PropTypes.object,
    viewer: PropTypes.object.isRequired,
    listenMessage: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      list: List(),
      rowCount: 0,
    };

    this.onUploadFinish = this.onUploadFinish.bind(this);
    this.onListenMessage = this.onListenMessage.bind(this);
    this.listenMessage = this.listenMessage.bind(this);
    this.createDisplayList = this.createDisplayList.bind(this);
  }

  componentDidMount() {
    this.onListenMessage();
    this.refs.audio.initAV(this.refs.canvas);
  }

  // shouldComponentUpdate(newProps, newState) {
  //   this.refs.mlist.changeList(this.state.list);
  //   return false;
  // }

  onUploadFinish(name, url) {
    const img = new Image;
    img.onload = () => {
      this.refs.canvas.drawImage(img, 0, 0);
    };
    img.src = url;
  }

  onListenMessage() {
    this.listenMessage(
      { id: 'fake-room-id' },
      (allMessages) => {
        let newList = List();
        let newMap = Map();
        allMessages.forEach((child) => {
          // console.log(child.key);
          // console.log(child.val());
          newMap = newMap.set(child.key, child.val());
          newList = newList.push(child.val());
        });
        this.createDisplayList(newList, newMap);
      }
    );
  }

  createDisplayList(list, map) {
    if (!list) {
      return;
    }
    this.setState({
      map,
      list,
      rowCount: list.size,
    });
    this.refs.mlist.setState({
      rowCount: list.size,
    });
  }

  async listenMessage(room, callback) {
    const { listenMessage } = this.props;
    try {
      await listenMessage(room, callback);
    } catch (error) {
      if (error instanceof ValidationError) {
        focusInvalidField(this, error);
        return;
      }
      throw error;
    }
  }

  render() {
    const { children, viewer } = this.props;
    const { displayName, email, photoURL } = viewer;

    return (
      <div>
        <Canvas {...{ width: 853.33, height: 480 }} ref="canvas" />
        <AudioControl {...{ map: this.state.map }} ref="audio" />
        <MessageForm {...{ onUploadFinish: this.onUploadFinish }} ref="messageForm" />
        <MessageList {...{ list: this.state.list, rowCount: this.state.rowCount }} ref="mlist" />
      </div>
    );
  }

}

export default connect(state => ({
  viewer: state.users.viewer
}), { listenMessage })(WorkspacePage);
