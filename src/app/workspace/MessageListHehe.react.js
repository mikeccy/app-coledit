import Immutable from 'immutable';
import Component from 'react-pure-render/component';
import { AutoSizer, VirtualScroll } from 'react-virtualized';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import shallowCompare from 'react-addons-shallow-compare';
import './MessageList.scss';

class MessageList extends Component {

  static propTypes = {
    children: PropTypes.object,
    viewer: PropTypes.object.isRequired,
    list: PropTypes.instanceOf(Immutable.List).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      list: Immutable.List(),
      overscanRowCount: 0,
      rowCount: props.list.size,
      scrollToIndex: undefined,
      useDynamicRowHeight: false,
      virtualScrollHeight: 300,
      virtualScrollRowHeight: 50
    };

    this._getRowHeight = this._getRowHeight.bind(this);
    this._noRowsRenderer = this._noRowsRenderer.bind(this);
    this._onRowCountChange = this._onRowCountChange.bind(this);
    this._onScrollToRowChange = this._onScrollToRowChange.bind(this);
    this._rowRenderer = this._rowRenderer.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('test yo');
    // console.log(nextProps.list);
    // console.log(shallowCompare(this, nextProps, nextState));
    // return true;
    return shallowCompare(this, nextProps, nextState);
  }

  _getDatum(index) {
    // console.log('_getDatum');
    const { list } = this.props;

    return list.get(index % list.size);
    // jsList = Immutable.List(list);

    // return jsList.get(index % jsList.size);
  }

  _getRowHeight({ index }) {
    return this._getDatum(index).size;
  }

  _noRowsRenderer() {
    return (
      <div className="noRows">
        No rows
      </div>
    );
  }

  _onRowCountChange(event) {
    const rowCount = parseInt(event.target.value, 10) || 0;

    // this.setState({ rowCount });
  }

  _onScrollToRowChange(event) {
    const { rowCount } = this.state;
    let scrollToIndex = Math.min(rowCount - 1, parseInt(event.target.value, 10));

    if (isNaN(scrollToIndex)) {
      scrollToIndex = undefined;
    }

    this.setState({ scrollToIndex });
  }

  _rowRenderer({ index, isScrolling }) {
    const {
      useDynamicRowHeight
    } = this.state;

    // console.log('_rowRenderer');

    // if (isScrolling) {
    //   return (
    //     <div className="row">
    //       <span className="isScrollingPlaceholder">
    //         Scrolling...
    //       </span>
    //     </div>
    //   );
    // }

    const datum = this._getDatum(index);

    let additionalContent;

    if (useDynamicRowHeight) {
      switch (datum.size) {
        case 75:
          additionalContent = <div>It is medium-sized.</div>;
          break;
        case 100:
          additionalContent = <div>It is large-sized.<br />It has a 3rd row.</div>;
          break;
      }
    }

    return (
      <div className="row">
        <div>
          <div className="name">
            {datum.message}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      overscanRowCount,
      rowCount,
      scrollToIndex,
      useDynamicRowHeight,
      virtualScrollHeight,
      virtualScrollRowHeight
    } = this.state;

    // console.log('render');
    // this.setState({
    //   rowCount: this.props.list.size,
    // });

    const { children, viewer } = this.props;
    const { displayName, email, photoURL } = viewer;

    return (
      <div>
        <AutoSizer disableHeight>
          {({ width }) => (
            <VirtualScroll
              ref="VirtualScroll"
              className="VirtualScroll"
              height={virtualScrollHeight}
              overscanRowCount={overscanRowCount}
              noRowsRenderer={this._noRowsRenderer}
              rowCount={rowCount}
              rowHeight={useDynamicRowHeight ? this._getRowHeight : virtualScrollRowHeight}
              rowRenderer={this._rowRenderer}
              scrollToIndex={scrollToIndex}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default connect(state => ({
  viewer: state.users.viewer
}))(MessageList);
