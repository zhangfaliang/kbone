import React, { Component } from 'react';
import ListView from 'antd-mobile/lib/list-view';
import PullToRefresh from '../pulltorefresh';
import 'antd-mobile/lib/list-view/style';

class Node extends Component {
  // 构造
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => {
        console.log(row1, row2);
        return row1 !== row2;
      },
    });
    this.state = {
      dataSource,
      isScrollEnabled: true,
    };
  }
  componentDidMount() {
    this.props.scrollTopNum && this.lv.scrollTo(0, this.props.scrollTopNum);
    this.firstScrollFlag = true;
  }
  // 节流
  throttle = (fn, interval = 300) => {
    if (this.canRun === undefined) this.canRun = true;
    return function() {
      if (!this.canRun) return;
      this.canRun = false;
      setTimeout(() => {
        if (fn) {
          fn.apply(this, arguments);
        }
        this.canRun = true;
      }, interval);
    };
  };

  onScroll = e => {
    if (this.firstScrollFlag && this.props.scrollTopNum > e.target.scrollTop) {
      this.props.scrollTopNum && this.lv.scrollTo(0, this.props.scrollTopNum);
      this.firstScrollFlag = false;
    } else {
      this.throttle(this.props.onScroll).call(this, e);
    }
  };

  onRefresh = () => {
    const { refreshing, getDataSourceList } = this.props;
    if (refreshing) return;
    getDataSourceList();
    this.setState({ isScrollEnabled: true });
  };

  scrollEnabled = event => {
    const {
      pageIndex,
      pageSize,
      currentPageSize,
      refreshing,
      scrollEnabled,
      pushDataSourceList,
    } = this.props;
    if (event) {
      this.setState({
        isScrollEnabled: true,
      });
    }
    if (refreshing || currentPageSize < pageSize || scrollEnabled) return;
    if (event && (this.state.isScrollEnabled || scrollEnabled)) {
      pushDataSourceList(pageIndex + 1);
      this.setState({
        isScrollEnabled: false,
      });
    }
  };

  render() {
    const {
      notDataText,
      refeshText,
      refreshing,
      dataSource,
      scrollEnabled,
      ListItemNode,
      renderSectionBodyWrapper,
      style,
      pageSize,
      currentPageSize,
      classNames,
    } = this.props;
    // const loading = <img src={require('../../assets/v1/下拉loading.gif')} alt="" />;
    const loading = <img src={require('../../assets/s02/loading.gif')} alt="" />;
    const renderFooterText = currentPageSize < pageSize ? notDataText : refeshText;
    return (
      <ListView
        ref={el => (this.lv = el)}
        dataSource={this.state.dataSource.cloneWithRows(dataSource)}
        renderRow={ListItemNode}
        renderFooter={() => (
          <div style={{ padding: 10, textAlign: 'center' }}>
            {scrollEnabled ? loading : renderFooterText}
          </div>
        )}
        onScroll={this.onScroll}
        className={classNames}
        contentContainerStyle={{ position: 'relative' }}
        style={style}
        renderSectionBodyWrapper={renderSectionBodyWrapper}
        scrollerOptions={{ scrollbars: true, scrollingComplete: null }}
        onEndReached={this.scrollEnabled}
        initialListSize={20}
        scrollRenderAheadDistance={500}
        onEndReachedThreshold={40}
        pageSize={20}
        useBodyScroll={true}
        pullToRefresh={
          <PullToRefresh
            refreshing={refreshing}
            distanceToRefresh={window.devicePixelRatio * 25}
            onRefresh={this.onRefresh}
          />
        }
      />
    );
  }
}

export default Node;
