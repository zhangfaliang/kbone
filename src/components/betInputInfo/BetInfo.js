import React, { Component } from 'react';
import classnames from 'classnames';
import IconFont from '../iconFont';
import styles from './index.less';
class BetInfo extends Component {
  static COMPONENT_NAME = 'BETINFO';
  constructor(props) {
    super(props);
    this.state = {
      isChangeSp: props.defaultChangeSp,
      isChangeHandicap: props.defaultChangeHandicap,
    };
  }
  shouldComponentUpdate(nextProps) {
    const {
      optionId,
      playtypeCode,
      sp,
      sportType,
      optionName,
      matchId,
      handicap,
      isChangeHandicap,
      isChangeSp,
    } = this.props;
    if (nextProps.isChangeSp !== isChangeSp) {
      this.setState({
        isChangeSp: nextProps.isChangeSp,
      });
    }
    if (nextProps.isChangeHandicap !== isChangeHandicap) {
      this.setState({
        isChangeHandicap: nextProps.isChangeHandicap,
      });
    }
    if (
      nextProps.optionId === optionId &&
      nextProps.playtypeCode === playtypeCode &&
      nextProps.matchId === matchId &&
      nextProps.sportType === sportType
    ) {
      if (nextProps.sp !== sp) {
        this.props.changeSp && this.props.changeSp(nextProps.sp);
        this.setState({
          isChangeSp: true,
        });
      }
      if (nextProps.handicap && handicap && nextProps.handicap !== handicap) {
        this.props.changeHandicap && this.props.changeHandicap(nextProps.sp);
        this.setState({
          isChangeHandicap: true,
        });
      }
    }
    return true;
  }

  render() {
    const {
      prefixCls,
      optionName,
      gamePlay,
      gameAgainst,
      handleDelete,
      defaultChangeHandicap,
      defaultChangeSp,
      sp,
    } = this.props;
    const clsName = styles[`${prefixCls}-betinfor`];
    const { isChangeSp, isChangeHandicap } = this.state;

    const spCls = classnames({
      [styles.sp]: true,
      [styles.changeSp]: isChangeSp,
    });
    const optionNameCls = classnames({
      [styles.changeHandicap]: isChangeHandicap,
    });
    return (
      <div
        className={clsName}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className={styles.left}>
          <div className={styles.optionName}>
            <span className={optionNameCls}>{optionName}</span>
            <span className={spCls}>{sp}</span>
          </div>
          <div className={styles.gamePlayName}>{gamePlay}</div>
          <div className={styles.gameAgainst}>{gameAgainst}</div>
        </div>
        <div
          className={styles.right}
          onClick={() => {
            handleDelete(this.props);
          }}
        >
          <IconFont type="delete" />
        </div>
      </div>
    );
  }
}
BetInfo.defaultProps = {
  defaultChangeSp: '',
  defaultChangeHandicap: '',
  isChangeSp: false,
  isChangeHandicap: false,
  prefixCls: '',
  optionName: '',
  handicap: '',
  sp: '',
  optionId: '',
  playtypeCode: '',
  matchId: '',
  sportType: '',
  gamePlay: '',
  gameAgainst: '',

  handleDelete: () => {
    console.log('handleDelete');
    return 'handleDelete';
  },
  changeSp: () => {
    console.log('ChangeSp');
    return 'ChangeSp';
  },
  changeHandicap: () => {
    console.log('changeHandicap');
    return 'changeHandicap';
  },
};
export default BetInfo;
