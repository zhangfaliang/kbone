import React, { PureComponent } from 'react';
import IconFont from '../../iconFont';
import styles from './style.less';
import classnames from 'classnames';
import { get, isEmpty } from 'lodash';
// import moment from 'moment';
export default class Item extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActive: true,
    };
  }
  componentDidMount() {
    this.transform(this.props.data);
  }
  /**
   * transform 设置 选中星期几
   *
   * @param {*} v {location: 区域, listDate: 日期数据, list: 列表数据 }
   * @returns
   */
  transform = v => {
    if (v && v.list && v.list.length > 0) {
      const list = get(v, 'list');
      const newobj = list.filter(va => va.list.length > 0);
      if (newobj.length === 0) {
        return false;
      }
      const key = this.props.timestamp(get(newobj[0], 'list[0]'), 'YYYY-MM-DD');
      this.activeKey(key);
    }
  };
  /**
   * @param {*} v 选中的值
   */
  activeKey = v => {
    this.setState({
      activeKey: v,
    });
  };
  tabs = async v => {
    await this.activeKey(v);
    const { data, keys, onClicktabs } = this.props;
    onClicktabs({ someDay: v, location: data[keys['title']] });
  };
  onClick = () => {
    this.setState(state => {
      return state.isActive ? { isActive: false } : { isActive: true };
    });
  };
  render() {
    const { data, keys, item, tabsItem } = this.props;
    const { isActive, activeKey } = this.state;
    const statusCls = classnames({
      [styles.show]: isActive, // 显示
      [styles.hidden]: !isActive, // 隐藏
    });
    const iconrotate = classnames({
      [styles.icon]: true,
      [styles.deg90]: isActive,
      [styles.deg270]: !isActive,
    });
    return (
      <>
        {data && !isEmpty(get(data, 'listDate')) && (
          <div className={styles.national}>
            <div className={styles.title}>
              <span>{data[keys['title']]}</span>
              <span onClick={() => this.onClick()} className={iconrotate}>
                <IconFont type="mycopy" />
              </span>
            </div>
            <div className={statusCls}>
              <div>{tabsItem(data[keys['listDate']].slice(0, 6), this.tabs, activeKey)}</div>
              {data[keys['dataList']] &&
                data[keys['dataList']].map((v, i) => (
                  <div
                    key={`${JSON.stringify(v)}${Math.floor(Math.random() * 100)}`}
                    className={styles.spacing}
                  >
                    {item(v, i)}
                  </div>
                ))}
            </div>
          </div>
        )}
      </>
    );
  }
}
