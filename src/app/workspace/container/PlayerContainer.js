import Component from 'react-pure-render/component';
import React from 'react';
import { connect } from 'react-redux';
import { userService, messageService } from '../App';

import CAContainer from './CAContainer';
import PlayerControlContainer from './PlayerControlContainer';

// TODO refactor to support video
class PlayerContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
    }
  }

  componentDidMount() {
    const {
      dispatch
    } = this.props;

    this.setState({
      playing: true,
    });

    // buffer video into memory?? optional
    // buffer image into memory
  }

  render() {
    const {
      playing,
      
    } = this.props;

    return (
      <main className="player flex flex-column flex-2">
        <CAContainer />
        <PlayerControlContainer />
      </main>
    );
  }
}
PlayerContainer = connect()(PlayerContainer)

export default PlayerContainer;
