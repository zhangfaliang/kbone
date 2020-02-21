import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import GameTypeList from './GameTypeList';
import { HorseRaceSiteList } from '../horseRaceChooseSite';
class GamePlayModule extends Component {
  static COMPONENT_NAME = 'GAMEPLAYMODULE';
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen,
    };
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      this.setState({
        isOpen: nextProps.isOpen,
      });
    }
    return true;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this.state.isOpen) {
      return 'hidden';
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot === 'hidden') {
      document.body.style.width = '100%';
      document.body.style.position = 'fixed';
    } else {
      document.body.style.position = 'relative';
    }
  }
  handleLayer = e => {
    const { maskClosable, handleLayer } = this.props;
    maskClosable &&
      this.setState(
        {
          isOpen: false,
        },
        () => {
          handleLayer && handleLayer(false);
        }
      );
  };
  handleItem = (item, gamePlayKey) => {
    const { handleItem, handleLayer } = this.props;

    this.setState(
      {
        isOpen: false,
      },
      () => {
        handleItem && handleItem(item, gamePlayKey);
      }
    );
  };
  render() {
    const { prefixCls, children, offsetTop } = this.props;
    const { isOpen } = this.state;
    const claName = classnames({
      [styles[`${prefixCls || 'default'}-game-play-module`]]: true,
      [styles.open]: isOpen,
    });
    const childrens = React.Children.map(children, option => {
      const { ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'GAMETYPELIST') {
        return <GameTypeList {...other} handleItem={this.handleItem} />;
      } else if (option.type.COMPONENT_NAME === 'HORSERACESITELIST') {
        return <HorseRaceSiteList {...other} handleItem={this.handleItem} />;
      }

      return option;
    });

    return (
      <div className={claName} style={{ top: `${offsetTop}px` }} onClick={this.handleLayer}>
        {isOpen && childrens}
      </div>
    );
  }
}
GamePlayModule.defaultProps = {
  prefixCls: 'default',
  isOpen: true,
  maskClosable: true,
  handleLayer: () => {
    console.log('handleLayer');
    return 'handleLayer';
  },
  handleItem: item => {
    console.log(item);
    return 'handleItem';
  },
};
export default GamePlayModule;
