import styles from './index.less';
import Live from '@/assets/game/index/live-group.png';
import { isFunction } from 'lodash';

function MatchCell({
  prefixCls = 'default',
  leftText = '',
  center = '',
  rightText = () => '',
  live = false,
  leftcls = false,
  none = true,
}) {
  return (
    <div className={styles[`${prefixCls}-cell`]}>
      <div className={styles[`${leftcls && 'left-name'}`]}>{leftText}</div>
      {none && (
        <>
          <div>{center}</div>
          <div>
            <div className={styles.leftText}>
              {live && (
                <div>
                  <img src={Live} alt="live" />
                </div>
              )}
              <div>{isFunction(rightText) ? rightText() : ''}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MatchCell;
