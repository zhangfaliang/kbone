import React from 'react';
import HorseImg from './HorseImg';
import HorseNum from './HorseNum';
import HorseTrackNum from './HorseTrackNum';
import HistoricalRecord from './HistoricalRecord';
import HorseName from './HorseName';
import styles from './index.less';

class SingleHorseInfo extends React.Component {
  static COMPONENT_NAME = 'SINGLEHORSERACEINFO';

  render() {
    const {
      historyRecord,
      horseCode,
      horseTrack,
      picUrl,
      shortName,
      horseTrainer,
      jockey,
      horseAge,
      jockeyWeight,
    } = this.props;
    const LeftInfo = (
      <div className={styles.leftInfo}>
        <div className={styles.top}>
          <div className={styles.left}>
            <HorseNum prefixCls="single" horseCode={horseCode} />
            <HorseTrackNum prefixCls="single" horseTrack={horseTrack} />
          </div>
          <HorseImg prefixCls="single" picUrl={picUrl} />
        </div>
        <HistoricalRecord prefixCls="single" historyRecord={historyRecord} />
      </div>
    );

    const rightInfo = (
      <div className={styles.rightInfo}>
        <HorseName prefixCls="single" shortName={shortName} />
        {/*//todo 右侧是骑手名字。每个名字最多展示12位，超过12位用“..."显示*/}
        <div className={styles.horseman}>
          <span>{horseTrainer}</span> <span>/ </span>
          <span>{jockey}</span>
        </div>
        <div>
          <span className={styles.age}> {horseAge}</span>
          <span className={styles.weight}>{jockeyWeight}</span>
        </div>
      </div>
    );

    return (
      <div className={styles['single-horse-info']}>
        {LeftInfo}
        {rightInfo}
      </div>
    );
  }
}

SingleHorseInfo.defaultProps = {
  horseCode: '', //马号
  picUrl: '', // 图片
  horseTrack: '', //赛道
  shortName: '', //马名
  horseTrainer: '', //训练师
  jockey: '', //骑手
  historySp: '', //历史赔率
  horseAge: '',
  jockeyWeight: 100,
};
export default SingleHorseInfo;
