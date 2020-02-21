import React, { Component } from 'react';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import router from 'umi/router';
import withRouter from 'umi/withRouter';
import styles from './index.less';
@withRouter
class Back extends Component {
  static defaultProps = {
    title: 'Title',
    backIcon: require('../../../assets/v1/back@3x.png'),
    onBack: () => {
      router.backToSourcesPage();
    },
    rightContent: [],
  };
  render() {
    const {
      onBack,
      title,
      backIcon,
      location: { state },
      rightContent,
    } = this.props;
    const rightCls = classnames({
      [styles.right]: true,
      [styles.noRight]: isEmpty(rightContent),
    });
    return (
      <div className={styles.wrap}>
        <div className={styles.main}>
          <div
            onClick={() => {
              if (state && state.returnTo) {
                router.push(state.returnTo);
              } else {
                onBack();
              }
            }}
            className={styles.back}
          >
            <img src={backIcon} alt="" />
          </div>
          <div className={styles.content}>{title}</div>
          <div className={rightCls}>
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
