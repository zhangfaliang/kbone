import React, { PureComponent } from 'react';
import classnames from 'classnames';
// import SportItem from './sportsItem';
// import Border from '../border';
import styles from './index.less';
// import { isEmpty } from 'lodash';
class BottomModule extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { setBottom } = this.props;
    const bottomCls = classnames({
      [styles.default102]: !setBottom, // 默认
      [styles.bottom230]: setBottom,
    });
    return <div className={bottomCls} />;
  }
}
BottomModule.defaultProps = {
  setBottom: false,
};
export default BottomModule;
