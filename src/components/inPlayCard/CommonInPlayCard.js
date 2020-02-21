import React from 'react';
import get from 'lodash/get';
import styles from './CommonInPlayCard.less';
import TimeText from './TimeText';
import SwitchBtn from './SwitchBtn';
class CommonInPlayCard extends React.Component {
  getTotalScore = (scores, isTennis, tennisScore, isLeftScore) => {
    if (isTennis) {
      if (isLeftScore) return tennisScore[0];
      return tennisScore[1];
    }
    return scores.reduce((acc, n) => acc + n, 0);
  };

  render() {
    const {
      isLive,
      favoriteStatus,
      isShowFavourite,
      score,
      teams,
      formatDate,
      formatTime,
      matchStatus,
      getTimeTextObj,
      clickFavorite,
      matchTime,
      leagueName,
      handleSwitch,
      text,
      switchImgUrl,
      type,
      isFinish,
      isTennis,
      tennisScore,
    } = this.props;
    return (
      <React.Fragment>
        <div className={styles['top']}>
          <div>{isLive ? <img src={require('../../assets/icon-live.png')} /> : ''}</div>
          {/* formatDate */}
          {/* <div>{isLive ? <TimeText {...getTimeTextObj} text={matchStatus} /> : formatTime}</div> */}
          <div className={styles['leagueName']}>{leagueName}</div>
          <div
            style={{ visibility: isShowFavourite ? 'block' : 'hidden' }}
            onClick={() => clickFavorite({ matchTime, operation: favoriteStatus === 1 ? 2 : 1 })}
          >
            <img
              src={require(favoriteStatus === 1
                ? '../../assets/favorite-active.png'
                : '../../assets/favorite-inactive.png')}
            />
          </div>
        </div>
        <div className={styles['center']}>
          <div>{teams[0]}</div>

          {isLive || isFinish ? (
            <div className={styles['score']}>
              <span>{this.getTotalScore(get(score, '0', []), isTennis, tennisScore, true)}</span>
              &nbsp;
              <span>-</span>
              &nbsp;
              <span>{this.getTotalScore(get(score, '1', []), isTennis, tennisScore)}</span>
            </div>
          ) : (
            <div className={styles['without-score']}>VS</div>
          )}

          <div>{teams[1]}</div>
        </div>
        <div className={styles['bottom']}>
          <div className={styles.time}>
            {isLive ? <TimeText {...getTimeTextObj} text={matchStatus} /> : formatTime}
          </div>
          {isLive ? (
            <SwitchBtn
              handleSwitch={handleSwitch}
              switchImgUrl={switchImgUrl}
              text={text}
              type={type}
            />
          ) : (
            ''
          )}
        </div>
      </React.Fragment>
    );
  }
}

CommonInPlayCard.defaultProps = {
  clickFavorite: () => {},
};
export { CommonInPlayCard };
