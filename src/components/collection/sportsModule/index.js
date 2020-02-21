import React, { PureComponent } from 'react';
import classnames from 'classnames';
import SportItem from './sportsItem';
import Border from '../border';
import Bottom from './bottom';
import styles from './index.less';
import { isEmpty } from 'lodash';
class SportType extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  quickBet = value => {
    this.props.quickBet(value);
  };
  handleMore = e => {
    this.props.handleMore(e);
  };
  render() {
    const {
      favoritesList,
      statusJson,
      betArryChecked,
      favoritesItem,
      showTitle,
      setBottom,
    } = this.props;
    return (
      <>
        {!isEmpty(favoritesList) &&
          favoritesList.map((value, index) => {
            const titleCls = classnames({
              [styles.default]: true, // 默认
              [styles.bgcolorYellow]: index === 0,
              [styles.bgcolorWhite]: index !== 0,
            });
            return (
              <React.Fragment key={index}>
                {showTitle && (
                  <div className={titleCls}>
                    <div>
                      <div className={styles['sport' + value.sportType]}>{value.sportName}</div>
                      <div>{value.numberOfMatches}场比赛</div>
                    </div>
                  </div>
                )}
                <SportItem
                  statusJson={statusJson}
                  listChild={value.listChild}
                  quickBet={this.quickBet}
                  handleMore={this.handleMore}
                  betArryChecked={betArryChecked}
                  favoritesItem={favoritesItem}
                  setFirstTitleBgYollow={!showTitle}
                />
              </React.Fragment>
            );
          })}
        <Border prefixCls={'sports'} />
        <Bottom setBottom={setBottom} />
      </>
    );
  }
}
SportType.defaultProps = {
  prefixCls: 'default',
  betArryChecked: [],
  showTitle: true, // 是否显示 竞技类型的标题(true显示, false 不显示)
  handleMore: key => {
    // console.log(key, '尚未传入执行事件');
    // return 'click';
  },
  favoritesItem: '',
};
export default SportType;
