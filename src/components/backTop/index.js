import React, { Component } from 'react';
import raf from 'raf';
import addEventListener from 'rc-util/lib/Dom/addEventListener';
import styles from './index.less';

const easeInOutCubic = (t, b, c, d) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return (cc / 2) * t * t * t + b;
  } else {
    return (cc / 2) * ((t -= 2) * t * t + 2) + b;
  }
};

function noop() {}

function getScroll(target, top) {
  if (typeof window === 'undefined') {
    return 0;
  }

  const prop = top ? 'pageYOffset' : 'pageXOffset';
  const method = top ? 'scrollTop' : 'scrollLeft';
  const isWindow = target === window;

  let ret = isWindow ? target[prop] : target[method];
  return ret;
}

class BackTop extends Component {
  static defaultProps = {
    visibilityHeight: 400,
    target: () => window,
  };

  state = {
    visible: false,
  };

  getCurrentScrollTop = () => {
    const getTarget = () => window;
    const targetNode = getTarget();
    if (targetNode === window) {
      return window.pageYOffset || document.body.scrollTop;
    }
    return targetNode.scrollTop;
  };

  scrollToTop = e => {
    const scrollTop = this.getCurrentScrollTop();
    const startTime = Date.now();
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      this.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));
      if (time < 450) {
        raf(frameFunc);
      } else {
        this.setScrollTop(0);
      }
    };
    raf(frameFunc);
    (this.props.onClick || noop)(e);
  };

  setScrollTop(value) {
    const getTarget = () => window;
    const targetNode = getTarget();
    if (targetNode === window) {
      document.body.scrollTop = value;
      document.documentElement.scrollTop = value;
    } else {
      targetNode.scrollTop = value;
    }
  }

  handleScroll = () => {
    const { visibilityHeight, target } = this.props;
    const scrollTop = getScroll(target(), true);
    this.setState({
      visible: scrollTop > visibilityHeight,
    });
  };

  componentDidMount() {
    const getTarget = () => window;
    this.scrollEvent = addEventListener(getTarget(), 'scroll', this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  }

  render() {
    const { children } = this.props;

    const defaultElement = (
      <div className={styles.content}>
        <div className={styles.icon} />
        TOP
      </div>
    );

    const backTopBtn = this.state.visible ? (
      <div className={styles.wrap} onClick={this.scrollToTop}>
        {children || defaultElement}
      </div>
    ) : null;
    return <div>{backTopBtn}</div>;
  }
}

export default BackTop;
