import React, { Component } from 'react';
import isPwa from '@/utils/pwaAddScreen';
import getBrowser from '@/utils/getBrowser';
import IconFont from '../iconFont';
import { formatMessage, getLocale } from 'umi/locale';
import ios from './ios.less';
import android from './android.less';
import Modal from '@/components/modal';
import safari from '../../assets/safari@3x.png';

const browser = getBrowser();

class AddToScreen extends Component {
  state = {
    visible: !1,
    modalVisible: !1,
    helperImg: null,
    modalCloseClicked: !1,
  };

  componentDidMount() {
    const { parentThis, firstTime = 30000, secondTime = 180000 } = this.props;
    const showAddToHomeScreen = this.showAdd2screen;
    parentThis.setState({
      showAddToHomeScreen,
    });
    if (isPwa()) {
      window.sessionStorage.setItem('isPwa', !!1);
      return;
    }
    const now = performance.timing.navigationStart + performance.now();
    const storeTime = window.sessionStorage.getItem('storeTime');
    const pwa = window.sessionStorage.getItem('isPwa');
    const has30sShown = window.localStorage.getItem('has30sShown');
    if (pwa) return;
    if (has30sShown === 'shown') {
      this.autoShow(secondTime);
      return;
    }
    if (!storeTime) {
      window.sessionStorage.setItem('storeTime', now);
      this.autoShow(firstTime);
      return;
    }

    if (now - storeTime < firstTime) {
      this.autoShow(firstTime);
      return;
    }
    this.setState({
      visible: !!1,
    });
  }

  autoShow = time => {
    setTimeout(() => {
      this.setState({
        visible: !!1,
      });
    }, time);
  };

  onClose = e => {
    e.preventDefault();
    const { secondTime = 180000 } = this.props;
    // 判断是否提示过30s
    const has30sShown = window.localStorage.getItem('has30sShown');
    if (has30sShown === 'shown') {
      this.setState({
        modalCloseClicked: !!1,
        modalVisible: !!1,
        visible: !1,
      });
    } else {
      this.setState(
        {
          modalCloseClicked: !!1,
          visible: !1,
        },
        () => {
          window.localStorage.setItem('has30sShown', 'shown');
          setTimeout(() => {
            this.setState({
              visible: !!1,
            });
          }, secondTime);
        }
      );
    }
  };

  setPwa = () => {
    window.sessionStorage.setItem('isPwa', !!1);
    this.setState({
      visible: !1,
    });
  };

  showAdd2screen = () => {
    // window.sessionStorage.removeItem('isPwa');
    // this.setState({
    //   visible: !!1,
    // });
    // 点击页尾的添加到主屏幕后，从弹出引导条改为弹出弹窗
    this.onClick();
  };

  onClick = () => {
    this.importHelper(getLocale());
    this.setState({
      modalCloseClicked: !1,
      modalVisible: !!1,
      visible: !1,
    });
  };

  onModalOk = () => {
    const { secondTime } = this.props;
    const has30sShown = window.localStorage.getItem('has30sShown');

    if (has30sShown !== 'shown') {
      this.setState(
        {
          modalVisible: !1,
        },
        () => {
          window.localStorage.setItem('has30sShown', 'shown');
          this.autoShow(secondTime);
        }
      );
      return;
    }
    this.setPwa();
    this.setState({
      modalVisible: !1,
    });
  };

  importHelper = local => {
    const helperImg = require(`../../assets/add2ScreenHelper_${local}.png`);
    this.setState({
      helperImg,
    });
  };

  render() {
    const { children } = this.props;
    const { modalVisible, helperImg } = this.state;
    let styles = {};
    let platform = '';
    if (browser.versions.ios && !browser.versions.android) {
      //是否在IOS浏览器打开
      // styles = ios;
      styles = android; //改版 统一样式
      platform = 'ios';
    }
    if (!browser.versions.ios && browser.versions.android) {
      //是否在安卓浏览器打开
      styles = android;
      platform = 'android';
    }

    const modalContent = () => {
      const { modalCloseClicked } = this.state;
      let modalContent = <img className={styles.helperImg} src={helperImg} alt="helperImg" />;
      if (modalCloseClicked) {
        modalContent = (
          <div className={styles.modalclosing}>
            <p>{formatMessage({ id: 'Wiki.0145' })}</p>
          </div>
        );
      } else {
        if (platform === 'ios') {
          if (!browser.versions.isSafari) {
            modalContent = (
              <div className={styles.modalIosNotSafari}>
                <img src={safari} alt="safari" />
                <p>{formatMessage({ id: 'Wiki.0143' })}</p>
              </div>
            );
          }
        }
        if (platform === 'android') {
          modalContent = (
            <div className={styles.modalIosNotSafari}>
              <ul className={styles.ul}>
                {JSON.parse(formatMessage({ id: 'Wiki.0144' })).map(v => (
                  <li key={Math.random()}>{v}</li>
                ))}
              </ul>
            </div>
          );
          // 安卓无法单独区别chrome暂时不判断
          // if (!browser.versions.isChrome) {
          //   modalContent = formatMessage({ id: 'Wiki.0144' })
          // }
        }
      }

      return modalContent;
    };

    const defaultElement = (
      <>
        <div className={styles.content}>
          <span className={styles.add} role="img" aria-label="close" onClick={this.onClick}>
            <IconFont type="tianjiadaozhupingmuanniux" />
          </span>
          <span className={styles.text} onClick={this.onClick}>
            {formatMessage({ id: 'addToScreen' })}
          </span>
          <span className={styles.close} role="img" aria-label="close" onClick={this.onClose}>
            <IconFont type="close" />
          </span>
        </div>
        <div className={styles.icon} />
      </>
    );

    const addToScreen = this.state.visible ? (
      <div className={styles.wrap} onClick={this.scrollToTop}>
        {children || defaultElement}
      </div>
    ) : null;
    return (
      <div>
        {addToScreen}
        <Modal
          className={styles.modal || android.modal}
          visible={modalVisible}
          transparent
          maskClosable={false}
          // title={title}
          // onClose={this.onModalClose}
          footer={[{ text: formatMessage({ id: 'Wiki.0042' }), onPress: this.onModalOk }]}
        >
          {modalContent()}
        </Modal>
      </div>
    );
  }
}

export default AddToScreen;
