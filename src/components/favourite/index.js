import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './style.less';

class Favourite extends Component {
  state = {
    isActive: false,
  };
  static getDerivedStateFromProps(props, state) {
    if (props.isActive !== state.isActive) {
      return { isActive: props.isActive };
    }
    return null;
  }
  handleFavourite = e => {
    const { matchId, sportType, matchTime, handleFavourite } = this.props;
    handleFavourite({
      isActive: !this.state.isActive,
      matchId,
      matchTime,
      sportType,
      operation: !this.state.isActive === true ? 1 : 2,
    });
    this.setState({
      isActive: !this.state.isActive,
    });
  };
  render() {
    const { className, isShow } = this.props;
    const favouriteCls = classnames(className, {
      [styles.favourite]: true,
      [styles.isShow]: isShow,
      [styles.active]: this.state.isActive,
    });
    return <div onClick={this.handleFavourite} className={favouriteCls} />;
  }
}
Favourite.defaultProps = {
  className: '',
  isActive: false,
  handleFavourite: () => {},
  matchId: '',
  matchTime: '',
  sportType: '',
  isActive: false,
  isShow: true,
};
export default Favourite;
