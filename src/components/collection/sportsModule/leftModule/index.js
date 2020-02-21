import React, { PureComponent } from 'react';
import styles from './index.less';
import BetContentModule from './betContentModule';
import { isEmpty } from 'lodash';
/**
 * FIXME: 功能OK,组件是否再次拆分成更小的组件？ 测试中
 * */

class LeftModule extends PureComponent {
  constructor(props) {
    super(props);
    this.tableTitleRefs = React.createRef();
    this.tableTdRefs = React.createRef();
    this.state = {
      onMouseStartTitleStatus: false,
    };
  }
  quickBet = e => {
    this.props.quickBet(e);
  };
  setChecked = (betArry, itemValue) => {
    if (isEmpty(betArry)) {
      return false;
    }
    let a = betArry.some(
      v => v.optionId === itemValue.optionId && v.matchId * 1 === itemValue.matchId * 1
    );
    return a;
  };
  onMouseLeave = (e, value) => {
    if (value.sportType === 2) {
      // TODO: 如果是sportType = 2 （篮球）设置不执行
      return false;
    }
    this.setState({
      onMouseStartTitleStatus: false,
    });
  };
  onMouseDown = (e, value) => {
    if (value.sportType === 2) {
      // TODO: 如果是sportType = 2 （篮球）设置不执行
      return false;
    }
    this.setState({
      onMouseStartTitleStatus: true,
      startingPointClientX: e.clientX,
    });
  };
  onMouseUp = (e, value) => {
    if (value.sportType === 2) {
      // TODO: 如果是sportType = 2 （篮球）设置不执行
      return false;
    }
    this.setState({
      onMouseStartTitleStatus: false,
    });
  };
  onMouseMove = (e, num, value) => {
    if (value.sportType === 2) {
      // TODO: 如果是sportType = 2 （篮球）设置不执行
      return false;
    }
    const { onMouseStartTitleStatus, startingPointClientX } = this.state;
    if (onMouseStartTitleStatus) {
      const { current } = num === 2 ? this.tableTdRefs : this.tableTitleRefs;
      const { offsetParent } = current;
      if (!offsetParent) {
        return false;
      }
      const { scrollLeft } = offsetParent;
      offsetParent.scrollLeft = scrollLeft + startingPointClientX - e.clientX;
      const x = e.clientX;
      this.setState({ startingPointClientX: x });
      this.setDots(num, this.props.num);
    }
  };
  onTouchMove = (e, value) => {
    if (value.sportType === 2) {
      // TODO: 如果是sportType = 2 （篮球）设置不执行
      return false;
    }
    // console.log(value)
    this.setDots(e, this.props.num);
  };
  onTouchEnd = (e, value) => {
    /**
     * TODO: 待优化
     * 1、onTouchStart 记录(起点位置，起点时间)
     * 2、惯性公式
     * 3、减速运动....
     * FIXME: 目前采用作弊手段，onTouchEnd时300ms后,再次检测，滚动的位置。
     */
    if (value.sportType === 2) {
      // TODO: 如果是sportType = 2 （篮球）设置不执行
      return false;
    }
    setTimeout(() => {
      this.setDots(e, this.props.num);
    }, 300);
  };
  setDots = (e, changeMove) => {
    /**
     * FIXME: dot 滚动时设置dot的选中效果，功能已实现，感觉可以优化。
     */
    const { current } = this.tableTitleRefs;
    // console.log(current.children)
    const { offsetParent } = current;
    if (!offsetParent) {
      return false;
    }
    const { offsetWidth, scrollLeft } = offsetParent;
    if (e === 1) {
      this.setStateDots(offsetWidth, scrollLeft, changeMove, current);
    }

    if (e === 2) {
      this.setStateDots(offsetWidth, scrollLeft, changeMove, current);
    }
  };
  setStateDots = (offsetWidth, scrollLeft, changeMove, current) => {
    if ((offsetWidth * 2) / 10 > scrollLeft) {
      this.props.setDots({
        leftDot: true,
        rightDot: false,
        changeMove,
      });
    }
    // if (offsetWidth - scrollLeft < (offsetWidth * 2) / 10) {
    const { children } = current;
    if (offsetWidth + scrollLeft + 10 > children[0].offsetWidth * children.length) {
      this.props.setDots({
        leftDot: false,
        rightDot: true,
        changeMove,
      });
    }
  };
  render() {
    const { data, betArryChecked } = this.props;
    return (
      <>
        {data.map((value, index) => (
          <React.Fragment key={index}>
            {index === 0 && (
              <div
                className={styles.tableTitle}
                ref={this.tableTitleRefs}
                onMouseLeave={e => this.onMouseLeave(e, value)}
                onMouseDown={e => this.onMouseDown(e, value)}
                onMouseMove={e => this.onMouseMove(e, 1, value)}
                onMouseUp={e => this.onMouseUp(e, value)}
                onTouchMove={dot => this.onTouchMove(1, value)}
                onTouchEnd={() => this.onTouchEnd(1, value)}
              >
                {value.playName.map((v, i) => (
                  <div className={styles.cell} key={i}>
                    <div>{v}</div>
                  </div>
                ))}
              </div>
            )}
            <div
              className={styles.leftModule}
              key={index}
              ref={this.tableTdRefs}
              onMouseLeave={e => this.onMouseLeave(e, value)}
              onMouseDown={e => this.onMouseDown(e, value)}
              onMouseMove={e => this.onMouseMove(e, 2, value)}
              onMouseUp={e => this.onMouseUp(e, value)}
              onTouchMove={() => this.onTouchMove(2, value)}
              onTouchEnd={() => this.onTouchEnd(2, value)}
            >
              <BetContentModule
                data={value.listItem}
                betArryChecked={betArryChecked}
                quickBet={this.quickBet}
              />
            </div>
          </React.Fragment>
        ))}
      </>
    );
  }
}
LeftModule.defaultProps = {
  prefixCls: 'default',
  betArryChecked: [],
  quickBet: key => {
    console.log(key, '尚未传入执行事件');
    // return 'click';
  },
};
export default LeftModule;
