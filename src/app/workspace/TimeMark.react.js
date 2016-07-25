import Component from 'react-pure-render/component';
import React, { PropTypes } from 'react';

class TimeMark extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 'none',
      top: 0,
      height: 0,
      left: 0,
    };

    this.background = this.initBackground();
    this.updateMark = this.updateMark.bind(this);
  }

  initBackground() {
    return (function () {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;

      const context = canvas.getContext('2d');
      context.fillStyle = '#f00';
      context.fillRect(0, 0, 1, 1);

      return canvas.toDataURL();
    }());
  }

  updateMark(left, display, top, height) {
    this.setState({ left, display, top, height });
  }

  render() {
    return (
      <div
        style={{
          display: this.state.display,
          position: 'absolute',
          top: this.state.top,
          width: 1,
          height: this.state.height,
          pointerEvents: 'none',
          overflow: 'hidden',
          backgroundImage: `url(${this.background})`,
          left: this.state.left,
        }}
      />
    );
  }
}

export default TimeMark;
