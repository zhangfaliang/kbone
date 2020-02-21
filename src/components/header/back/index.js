import React, { Component } from 'react';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import router from 'umi/router';
import withRouter from 'umi/withRouter';
import styles from './index.less';
@withRouter
class Back extends Component {
  static defaultProps = {
    title: '',
    backIcon: require('../../../assets/s02/back-1.png'),
    onBack: () => {
      router.backToSourcesPage();
    },
    rightContent: [],
    onClose: null,
    noFixed: false,
    backStatus: false,
    handleRightContent: () => {},
  };

  renderContent = () => {
    const { title, showType } = this.props;
    switch (showType) {
      case 'modal':
        return <>{title}</>;
      default:
        return title;
    }
  };
  render() {
    const {
      onBack,
      title,
      backIcon,
      location: { state },
      rightContent,
      onClose,
      color,
      noFixed,
      backStatus,
      handleRightContent,
    } = this.props;
    const rightCls = classnames({
      [styles.right]: true,
      [styles.noRight]: isEmpty(rightContent),
    });

    const wrapCls = classnames({
      [styles.wrap]: true,
      [styles.fixed]: !noFixed,
    });
    const backCls = classnames({
      [styles.back]: true,
      [styles.noBack]: backStatus,
    });
    return (
      <div style={{ backgroundColor: color }} className={wrapCls}>
        <div className={styles.main}>
          <div
            onClick={() => {
              if (onClose) {
                onClose();
              } else {
                if (state && state.returnTo) {
                  router.push(state.returnTo);
                } else {
                  onBack();
                }
              }
            }}
            className={backCls}
          >
            <img src={backIcon} alt="" />
          </div>
          <div className={styles.content}>
            <div className={styles.title}>{this.renderContent()}</div>
          </div>
          <div className={rightCls} onClick={handleRightContent}>
            {rightContent.map((v, k) => {
              return <div key={k}>{v}</div>;
            })}
            {/* <img src={require('../../../assets/v1/back@3x.png')} alt="" /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Back;
