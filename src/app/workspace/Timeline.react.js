import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';
import TimeMark from './TimeMark.react';

class Timeline extends Component {
  static propTypes = {
    onSeekProgress: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      runing: false,
      selection_mode: false,
      progress: 0,
    };

    this.rect = null;
    this.background = this.initBackground();
    this.getMarkLeft = this.getMarkLeft.bind(this);
    this.updateProgress = this.updateProgress.bind(this);

    this._onClick = this._onClick.bind(this);
  }

  componentDidMount() {
    this.rect = this.refs.line.getBoundingClientRect();
    this.refs.mark.updateMark(this.getMarkLeft(0), 'block', this.rect.top, this.rect.height);
  }

  componentDidUpdate() {
    this.componentDidMount();
  }

  getMarkLeft(progress) {
    const left = this.rect.left;
    if (progress && progress > 0) {
      return left + progress * this.rect.width;
    }
    return left;
  }

  initBackground() {
    const canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 1;

    const context = canvas.getContext('2d');
    context.fillStyle = '#ccc';
    context.fillRect(8, 0, 1, 1);

    return canvas.toDataURL();
  }

  updateProgress(progress) {
    if (this.rect) {
      this.refs.mark.updateMark(
        this.getMarkLeft(progress),
        'block',
        this.rect.top,
        this.rect.height
      );
    }
  }

  // TODO refactor to redux
  _onClick(event) {
    if (!this.rect) {
      return;
    }

    let x = event.pageX - this.rect.left;
    x = Math.max(Math.min(x, this.rect.width), 0);
    const progress = this.rect.width === 0 ? 0 : x / this.rect.width;

    if (!this.state.selection_mode) {
      this.updateProgress(progress);
      this.props.onSeekProgress(progress);
    }
  }

  render() {
    return (
      <div onClick={this._onClick}>
        <div
          ref="line"
          style={{
            top: 0,
            width: 1024,
            height: 40,
            pointerEvents: 'none',
            backgroundImage: `url(${this.background})`,
            left: this.state.pxLeft,
          }}
        >
          <TimeMark ref="mark" />
        </div>
      </div>
    );
  }
}

export default Timeline;
