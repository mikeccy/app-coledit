import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';

class Timeline extends Component {
  static propTypes = {
    seekPos: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    onSeekPos: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      markerDisplay: 'none',
      markerTop: 0,
      markerHeight: 0,
      markerLeft: 0,
    };

    this._rect = null;
    this._timebar = this._initTimebar();
    this._marker = this._initMarker();
    this._seekToProgress = this._seekToProgress.bind(this);
    this._progressToSeek = this._progressToSeek.bind(this);
    this._getMarkerLeft = this._getMarkerLeft.bind(this);
    this._updateRenderState = this._updateRenderState.bind(this);
    this._onClickSeekUpdate = this._onClickSeekUpdate.bind(this);
  }

  componentDidMount() {
    this._rect = this.refs.timebar.getBoundingClientRect();
    this._updateRenderState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._updateRenderState(nextProps);
  }

  _initTimebar() {
    const canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 1;

    const context = canvas.getContext('2d');
    context.fillStyle = '#3A3E3D';
    context.fillRect(8, 0, 1, 1);

    return canvas.toDataURL();
  }

  _initMarker() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;

    const context = canvas.getContext('2d');
    context.fillStyle = '#F53864';
    context.fillRect(0, 0, 1, 1);

    return canvas.toDataURL();
  }

  _seekToProgress(props) {
    if (!props.duration || props.duration === 0) {
      return 0;
    }
    return props.seekPos / props.duration;
  }

  _progressToSeek(progress) {
    return progress * this.props.duration;
  }

  _getMarkerLeft(props) {
    return this._seekToProgress(props) * this._rect.width;
  }

  _updateRenderState(props) {
    if (!this._rect) {
      return;
    }
    this._rect = this.refs.timebar.getBoundingClientRect();

    this.setState({
      markerDisplay: 'block',
      markerTop: this._rect.top,
      markerHeight: this._rect.height,
      markerLeft: this._getMarkerLeft(props),
    });
  }

  _onClickSeekUpdate(event) {
    if (!this._rect) {
      return;
    }
    this._rect = this.refs.timebar.getBoundingClientRect();

    let x = event.pageX - this._rect.left;
    x = Math.max(Math.min(x, this._rect.width), 0);
    const progress = this._rect.width === 0 ? 0 : x / this._rect.width;

    if (this.props.onSeekPos) {
      this.props.onSeekPos(this._progressToSeek(progress));
    }
  }

  render() {
    return (
      <div onClick={this._onClickSeekUpdate}>
        <div
          ref="timebar"
          style={{
            position: 'relative',
            top: 0,
            height: 40,
            pointerEvents: 'none',
            backgroundImage: `url(${this._timebar})`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              display: this.state.markerDisplay,
              width: 1,
              height: this.state.markerHeight,
              pointerEvents: 'none',
              overflow: 'hidden',
              backgroundImage: `url(${this._marker})`,
              left: this.state.markerLeft,
            }}
          />
        </div>
      </div>
    );
  }
}

export default Timeline;
