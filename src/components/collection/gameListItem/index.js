import React, { PureComponent } from 'react';
import styles from './index.less';
import { get, isEmpty } from 'lodash';
import MatchCell from '../matchCell';
import Time from '../timer';

class GameListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleUpDown = key => {
    this.props.handleUpDown(key);
  };
  render() {
    const { prefixCls, data, statusJson } = this.props;
    // console.log(data, '----');
    return (
      <div
        className={styles[`${prefixCls}-game-list-item`]}
        onClick={() => this.handleUpDown(data)}
      >
        {!isEmpty(get(data, 'list')) &&
          get(data, 'list').map((v, i) => (
            <React.Fragment key={JSON.stringify(v)}>
              {i === 0 && <MatchCell {...v} />}
              {i === 1 && (
                <MatchCell
                  leftText={v.leftText}
                  center={v.center}
                  rightText={() => <Time {...v} statusJson={statusJson} />}
                  live={v.live}
                />
              )}
              {i === 2 && <MatchCell {...v} none={false} />}
            </React.Fragment>
          ))}
      </div>
    );
  }
}
GameListItem.defaultProps = {
  prefixCls: 'default',
  data: {
    list: [],
  },
  handleUpDown: key => {
    console.log(key + 'handleGameType');
    return 'click';
  },
};
export default GameListItem;
