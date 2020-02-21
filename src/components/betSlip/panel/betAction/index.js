import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
import AddBetSlip from '../addBetSlip';
import BetCount from '../betCount';

function BetAction({
  betCountText,
  disabled,
  onClick,
  onOpenBetSlipPanel,
  addBetSlipText,
  betCountVisibled,
  addBetSlipVisibled,
  betCount,
  level,
}) {
  const aCls = classnames({
    [styles.a]: true,
    [styles.avisabled]: betCountVisibled,
    [styles.level2]: level === 2,
    [styles.a_b2visabled]: addBetSlipVisibled && betCountVisibled,
  });

  const abCls = classnames({
    [styles.a_b]: true,
    [styles.a_bvisabled]: addBetSlipVisibled,
    [styles.a_b2visabled]: addBetSlipVisibled && betCountVisibled,
  });
  return (
    <div className={styles.wrap}>
      <div className={abCls}>
        <AddBetSlip disabled={disabled} text={addBetSlipText} onClick={onClick} />
      </div>
      <div className={aCls}>
        <BetCount onOpenBetSlipPanel={onOpenBetSlipPanel} count={betCount} text={betCountText} />
      </div>
    </div>
  );
}

export default BetAction;
