import React from 'react';
import Activity from './activity';
import styles from './index.less';
import activityGroupTitle from '@/assets/guide/activityGroup-title.png';

const ActivityGroup = ({ activityList = [], picUseHost }) => (
  <div className={styles.wrapper}>
    <h2 className={styles.title} style={{ backgroundImage: `url(${activityGroupTitle})` }}>
      活动中心
    </h2>
    {activityList.map(({ bannerId, imageUrl, targetTo, ...res }, index) => (
      <Activity
        key={index}
        backgroundImage={imageUrl}
        href={targetTo}
        {...res}
        picUseHost={picUseHost}
      />
    ))}
  </div>
);

export default ActivityGroup;
