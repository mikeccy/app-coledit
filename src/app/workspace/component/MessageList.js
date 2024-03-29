import Component from 'react-pure-render/component';
import React from 'react';
import { List } from 'immutable';
import { AutoSizer, VirtualScroll } from 'react-virtualized';
import KeyHandler from 'react-key-handler';

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

    this._onCancelMod = this._onCancelMod.bind(this);
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
    let newPos = null;
    if (nextProps.seekPos !== this.props.seekPos) {
      newPos = nextProps.seekPos;
    }
    if (nextProps.newMessagePos !== this.props.newMessagePos) {
      newPos = nextProps.newMessagePos;
    }

    if (newPos) {
      const scrollToIndex = this._getScrollToIndex(newPos);
      if (scrollToIndex !== this.state.scrollToIndex) {
        this.setState({
          scrollToIndex: scrollToIndex,
        });
      }
    }
    this.refs.sizer.refs.scroll.forceUpdateGrid();
  }

  _onCancelMod(event) {
    event.preventDefault();
    if (this.props.onCancelMod) {
      this.props.onCancelMod();
    }
  }

  _getScrollToIndex(seekPos) {
    return this.props.messages.findLastIndex((message) => {
      return needsHighlight(message, seekPos);
    });
  }

  _getRowHeight({ index }) {
    return 65;
  }

  _renderMessage({ index, isScrolling }) {
    const {
      onClickEdit,
      onClickDelete,
    } = this.props;

    const message = this.props.messages.get(index);
    const sender = message.sentBy;
    const highlight = needsHighlight(message, this.props.seekPos);
    const editing = message._id == this.props.editingMessageId;

    return (
      <div key={message._id} className="message flex flex-row">
        <img src={sender.avatar} alt={sender.email} className="avatar flex-1" />
        <div
          className="message-wrapper flex flex-1"
          onClick={() => onClickEdit(message)}
          style={{
            backgroundColor: editing ? '56E2B4' : (highlight ? '#FFC061' : ''),
          }}
        >
          <div className="flex flex-1 font-300">{message.startTs.toFixed(2)}</div>
          <div className="flex flex-1 font-300">{message.endTs.toFixed(2)}</div>
          <div className="flex flex-4 font-600">{message.text}</div>
          { editing ? <button className="button button-danger font-600 delete" onClick={() => onClickDelete(message)}>删除</button> : null }
        </div>
      </div>
    );
  }

  render() {
    return (
      <main ref="container" style={{ overflow: 'hidden' }} className="chat flex flex-column flex-1">
        <KeyHandler keyEventName={'keydown'} keyValue="Escape" onKeyHandle={this._onCancelMod} />
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
