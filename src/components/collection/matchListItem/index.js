import React, { PureComponent } from 'react';
import classnames from 'classnames';
import IconFont from '../../iconFont';
import styles from './index.less';
import { get, isEmpty } from 'lodash';
import Football from '@/assets/favorites/football@3x.png';
import Baseball from '@/assets/favorites/baseball@3x.png';
import Horse from '@/assets/favorites/horse@3x.png';

const iconImg = {
  1: Football,
  2: Baseball,
  3: Horse,
};
class MacthlistItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
    };
  }
  handleUpDown = key => {
    // console.log(key);
  };
  onClick = () => {
    this.setState(state => {
      return state.isActive ? { isActive: false } : { isActive: true };
    });
  };
  render() {
    const { prefixCls, data, item } = this.props;
    const { isActive } = this.state;
    const clsName = styles[`${prefixCls || 'default'}-match-list-item`];
    const isShow = classnames({
      [styles.show]: isActive, // 显示
      [styles.hidden]: !isActive, // 隐藏
    });
    const iconrotate = classnames({
      [styles.deg90]: isActive,
      [styles.deg270]: !isActive,
    });
    return (
      <>
        {!isEmpty(get(data, 'listChildrens')) && (
          <div className={clsName}>
            <div className={styles.title}>
              <div>
                <div>
                  <span>
                    <img src={iconImg[data.sportType]} alt="sportTypeIcon" />
                  </span>
                  <span>{data.sportName}</span>
                </div>
              </div>
              <div className={iconrotate} onClick={() => this.onClick()}>
                <IconFont type="mycopy" />
              </div>
            </div>
            <div className={isShow}>
              {get(data, 'listChildrens').map(v => (
                <div key={JSON.stringify(v)}>{item(v)}</div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}
MacthlistItem.defaultProps = {
  prefixCls: 'default',
  data: {
    sportName: '',
    sportType: undefined,
    listChildrens: [1],
  },
  handleUpDown: key => {
    // console.log(key + 'handleGameType');
    return 'click';
  },
  item: () => {
    return 'content';
  },
};
export default MacthlistItem;
