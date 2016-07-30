import Component from 'react-pure-render/component';
import React from 'react';
import { List } from 'immutable';
import { AutoSizer, VirtualScroll } from 'react-virtualized';

const needsHighlight = (message, seekPos) => {
  return message.startTs <= seekPos
      && message.endTs >= seekPos;
};

class MessageList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      scrollWidth: 0,
      scrollHeight: 0,
      overscanRowCount: 5,
      scrollToIndex: 0,
    };

    this._rect = null;

    this._getScrollToIndex = this._getScrollToIndex.bind(this);
    this._getRowHeight = this._getRowHeight.bind(this);
    this._renderMessage = this._renderMessage.bind(this);
  }

  componentDidMount() {
    this._rect = this.refs.container.getBoundingClientRect();
    this.setState({
      scrollWidth: this._rect.width,
      scrollHeight: this._rect.height,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.seekPos !== this.props.seekPos) {
      const scrollToIndex = this._getScrollToIndex(nextProps.seekPos);
      if (scrollToIndex !== this.state.scrollToIndex) {
        this.setState({
          scrollToIndex: scrollToIndex,
        });
      }
      this.refs.sizer.refs.scroll.forceUpdateGrid();
    }
  }

  _getScrollToIndex(seekPos) {
    return this.props.messages.findLastIndex((message) => {
      return needsHighlight(message, seekPos);
    });
  }

  _getRowHeight({ index }) {
    return 70;
  }

  _renderMessage({ index, isScrolling }) {
    const {
      onClickEdit,
    } = this.props;

    const message = this.props.messages.get(index);
    const sender = message.sentBy;
    const highlight = needsHighlight(message, this.props.seekPos);

    return (
      <div key={message._id} className="message flex flex-row">
        <img src={sender.avatar} alt={sender.email} className="avatar flex-1" />
        <div
          className="message-wrapper flex flex-1"
          onClick={() => onClickEdit(message)}
          style={{
            backgroundColor: highlight ? '#FFB03A' : '',
          }}
        >
          <div className="flex flex-1 font-300">{message.startTs.toFixed(2)}</div>
          <div className="flex flex-1 font-300">{message.endTs.toFixed(2)}</div>
          <div className="flex flex-4 font-600">{message.text}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <main ref="container" style={{ overflow: 'hidden' }} className="chat flex flex-column flex-1">
        <AutoSizer ref="sizer">
          {({ height, width }) => (
            <VirtualScroll
              ref="scroll"
              width={width}
              height={height}
              overscanRowCount={this.state.overscanRowCount}
              scrollToIndex={this.state.scrollToIndex}
              rowCount={this.props.messages.size}
              rowHeight={this._getRowHeight}
              rowRenderer={this._renderMessage}
            />
          )}
        </AutoSizer>
      </main>
    );
  }
}

export default MessageList;
