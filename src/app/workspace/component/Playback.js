import Component from 'react-pure-render/component';
import React from 'react';
import KeyHandler from 'react-key-handler';

class Playback extends Component {

  constructor(props) {
    super(props);

    this._togglePlay = this._togglePlay.bind(this);
  }

  _togglePlay(event) {
    event.preventDefault();
    if (this.props.playing) {
      if (this.props.onPausePlaying) {
        this.props.onPausePlaying();
      }
    } else {
      if (this.props.onStartPlaying) {
        this.props.onStartPlaying();
      }
    }
  }

  render() {
    const {
      playing,
      onStartPlaying,
      onPausePlaying,
      onStopPlaying,
    } = this.props;

    return (
      <div>
        <KeyHandler keyEventName={'keydown'} keyValue=" " onKeyHandle={this._togglePlay} />
        <button style={{ marginRight : 10, }} className="playStop button button-primary" onClick={onStopPlaying}>停止</button>
        <button style={{ marginRight : 10, }} className="playStart button button-primary" onClick={onStartPlaying} disabled={playing}>开始</button>
        <button style={{ marginRight : 10, }} className="playPause button button-primary" onClick={onPausePlaying} disabled={!playing}>暂停</button>
      </div>
    );
  }
}

export default Playback;
