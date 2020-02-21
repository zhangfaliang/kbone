import React, { PureComponent } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { get, isEmpty } from 'lodash';
class SportType extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  handleChecked = () => {
    const { data, keys, checked, handleChecked, clickStatus } = this.props;
    const status = checked === get(data, keys['sportType']);
    if (!status && clickStatus) {
      handleChecked(data);
    }
  };
  render() {
    const { data, keys, checked, setStyle, lastChild } = this.props;
    const isExist = !isEmpty(get(data, keys['defaultImg'])); // 竞技的图标是否存在
    const status = checked === get(data, keys['sportType']);
    const isExistCls = classnames({
      [styles.default]: true, // 默认
      [styles.checked]: status, // 选中
      [styles.noExist]: !isExist,
      [styles.sport3]: !setStyle,
      [styles.sportMore]: setStyle,
      [styles.lastChild]: lastChild,
    });
    return (
      <div
        className={isExistCls}
        onClick={() => this.handleChecked(data)} // 抛出所有参数
      >
        {isExist && (
          <img
            src={status ? get(data, keys['checkedImg'], '') : get(data, keys['defaultImg'], '')}
            alt=""
          />
        )}
        <div>{get(data, keys['sportName'], '')}</div>
      </div>
    );
  }
}
SportType.defaultProps = {
  prefixCls: 'default',
  data: {
    defaultImg: '',
    checkedImg: '',
    sportType: '0',
    sportName: '所有比赛',
  },
  keys: {
    defaultImg: 'imgsdefaultImgrc',
    checkedImg: '',
    sportType: 'sportType',
    sportName: 'sportName',
  },
  clickStatus: true,
  onChecked: key => {
    console.log(key, '尚未传入执行事件');
    // return 'click';
  },
};
export default SportType;
