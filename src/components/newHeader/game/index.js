import React, { Component, PureComponent } from 'react';
import { formatMessage } from 'umi/locale';
import classnames from 'classnames';
import { Transition } from 'react-transition-group';
import styles from './index.less';
import { get } from 'lodash';
import { HIGHLIGHT_SPORTS_REG, HIGHLIGHT_IN_PLAY_REG } from '@/constants/game-config';
import { formatMoney } from '@/utils/commonFn';
import inplay from '@/assets/newheader/inplay@3x.png';
import home from '@/assets/newheader/game@3x.png';
function url(params) {
  let position = 1;
  if (params === '/game/index') {
    position = 1;
  } else if (params === '/game/inPlay') {
    position = 2;
  } else {
    position = 3;
  }
  return position;
}
class Game extends PureComponent {
  state = {
    currentTap: this.props.currentTap,
    visible: true,
    position: url(this.props.currentTap),
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

  onChangeCurrentTap = (currentTap, position) => {
    this.setState({ currentTap, position });
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
    const { isLogin, cashBalance, currencyType, getStatus, userConfig } = this.props;
    console.log(userConfig, 'userConfiguserConfiguserConfig');
    const { currentTap, position } = this.state;
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

    const login = classnames({
      [styles.icon]: true,
      [styles.loginWidth]: isLogin,
      [styles.animation]: cashBalance && cashBalance > 0,
    });
    const banner = classnames({
      [styles.banner]: true,
      [styles.bannerchecked]: position === 1,
    });
    const inPlay = classnames({
      [styles.inPlay]: true,
      [styles.bannerchecked]: position === 2,
    });
    const icon = classnames({
      [styles.icon]: true,
      [styles.menuheight]: true,
      [styles.bannerchecked]: position === 3,
    });
    const { leftContent, rightContent, onCloseOverlay, userConfig } = this.props;

    const overlays = [
      { overlay: leftContent.icon.overlay, visible: leftContent.icon.visible },
      { overlay: rightContent.icon.overlay, visible: rightContent.icon.visible },
    ];
    let priceUnit = get(userConfig, 'currencySymbol');
    priceUnit = priceUnit ? priceUnit : '';
    return (
      <div className={styles.wrap}>
        <div className={styles.main}>
          <div className={leftItemCls}>
            <div
              className={banner}
              onClick={() => {
                this.onChangeCurrentTap('/game/index', 1);
                this.props.leftContent.menu.handle();
              }}
            >
              {/* {this.props.logo} */}
            </div>
          </div>
          <div className={rightItemCls}>
            <div className={styles.rightContent}>
              <div
                className={inPlay}
                onClick={() => {
                  this.onChangeCurrentTap('/game/inPlay', 2);
                  this.props.rightContent.menu.handle();
                }}
              >
                <img src={inplay} alt="" />
              </div>
              <div
                onClick={() => {
                  this.props.leftContent.icon.handle();
                  this.setState({ visible: true, position: 3 });
                }}
                className={icon}
              >
                <img src={home} alt="" />
              </div>
              <div
                onClick={() => {
                  this.props.rightContent.icon.handle();
                  this.setState({ visible: true });
                }}
                className={login}
              >
                {isLogin
                  ? priceUnit +
                    ' ' +
                    (this.props.cashBalance ? formatMoney(this.props.cashBalance) : '0.00')
                  : this.props.rightContent.icon.value}
              </div>
              {isLogin && (
                <div
                  className={styles.loginimg}
                  onClick={() => {
                    this.props.rightContent.icon.handle();
                    this.setState({ visible: true });
                  }}
                >
                  <img src={this.props.rightContent.icon.value} alt="" />
                </div>
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
