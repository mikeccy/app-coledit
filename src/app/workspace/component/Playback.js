import Component from 'react-pure-render/component';
import React from 'react';

class Playback extends Component {

  render() {
    const {
      playing,
      onStartPlaying,
      onPausePlaying,
      onStopPlaying,
    } = this.props;

    return (
      <div>
        <button className="playStop button button-primary" onClick={onStopPlaying}>停止</button>
        <button className="playStart button button-primary" onClick={onStartPlaying} disabled={playing}>开始</button>
        <button className="playPause button button-primary" onClick={onPausePlaying} disabled={!playing}>暂停</button>
      </div>
    );
  }
}

export default Playback;
