import React, { Component, PureComponent } from 'react';
import { formatMessage } from 'umi/locale';
import classnames from 'classnames';
import { Transition } from 'react-transition-group';
import styles from './index.less';
import { HIGHLIGHT_SPORTS_REG, HIGHLIGHT_IN_PLAY_REG } from '@/constants/game-config';
import home from '@/assets/v1/menu@3x.png';
class Game extends PureComponent {
  state = {
    currentTap: this.props.currentTap,
    visible: true,
  };

  static defaultProps = {
    isLogin: false,
    leftContent: {
      icon: {
        value: '',
        handle: () => {},
        overlay: null,
        visible: false,
      },
      menu: {
        value: 'Sports',
        handle: () => {},
      },
    },
    rightContent: {
      icon: {
        value: 'Login',
        handle: () => {},
        overlay: null,
        visible: false,
      },
      menu: {
        value: 'In-Play',
        handle: () => {},
      },
    },
    logo: 'ss',
    onCloseOverlay: () => {},
  };

  onChangeCurrentTap = currentTap => {
    this.setState({ currentTap });
    this.props.onChangeCurrentTap(currentTap);
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { leftContent, rightContent } = this.props;
    const nextVisible = leftContent.icon.visible || rightContent.icon.visible;
    if (nextVisible) {
      return 'hidden';
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentTap != this.props.currentTap) {
      this.setState({ currentTap: this.props.currentTap });
    }
    if (snapshot === 'hidden') {
      document.body.style.overflow = snapshot;
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  render() {
    const { isLogin } = this.props;
    const { currentTap } = this.state;
    const leftItemCls = classnames({
      [styles.item]: true,
      [styles.leftItem]: true,
      [styles.active]: HIGHLIGHT_SPORTS_REG.test(currentTap),
    });

    const rightItemCls = classnames({
      [styles.item]: true,
      [styles.rightItem]: true,
      [styles.noLogin]: !isLogin,
      [styles.active]: HIGHLIGHT_IN_PLAY_REG.test(currentTap),
    });

    const menuCls = classnames({
      [styles.menu]: true,
    });
    const { leftContent, rightContent, onCloseOverlay } = this.props;

    const overlays = [
      { overlay: leftContent.icon.overlay, visible: leftContent.icon.visible },
      { overlay: rightContent.icon.overlay, visible: rightContent.icon.visible },
    ];

    return (
      <div className={styles.wrap}>
        <div className={styles.main}>
          <div className={leftItemCls}>
            <div
              onClick={() => {
                this.props.leftContent.icon.handle();
                this.setState({ visible: true });
              }}
              className={styles.icon}
            >
              <img src={home} alt="" />
            </div>
            <div className={menuCls}>
              <span
                onClick={() => {
                  this.onChangeCurrentTap('/game/index');
                  this.props.leftContent.menu.handle();
                }}
              >
                {this.props.leftContent.menu.value}
              </span>
            </div>
          </div>
          <div className={styles.banner}>{this.props.logo}</div>
          <div className={rightItemCls}>
            <div className={menuCls}>
              <span
                onClick={() => {
                  this.onChangeCurrentTap('/game/inPlay');
                  this.props.rightContent.menu.handle();
                }}
              >
                {this.props.rightContent.menu.value}
              </span>
            </div>
            <div
              onClick={() => {
                this.props.rightContent.icon.handle();
                this.setState({ visible: true });
              }}
              className={styles.icon}
            >
              {isLogin ? (
                <img src={this.props.rightContent.icon.value} alt="" />
              ) : (
                this.props.rightContent.icon.value
              )}
            </div>
          </div>
        </div>
        {overlays.map((v, k) => {
          return (
            <Transition key={k} in={v.visible} timeout={500}>
              {state => {
                return (
                  <div
                    onClick={() => {
                      onCloseOverlay();
                    }}
                    className={classnames({
                      [styles.dropdown]: true,
                      [styles[state]]: true,
                    })}
                  >
                    {v.overlay}
                  </div>
                );
              }}
            </Transition>
          );
        })}
      </div>
    );
  }
}

export default Game;
