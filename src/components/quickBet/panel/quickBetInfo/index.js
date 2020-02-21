import React, { Component } from 'react';
import { get } from 'lodash';
import BetInfo from './betInfo';
import styles from './index.less';
import MistakeHorseBetInfo from '../../../betInputInfo/BetInfo';
import { HORSE_SPORT_TYPE_REG } from '@/constants/game-config';
class QuickBetInfo extends Component {
  render() {
    const { dataSource, onDelete, isAcceptChange, onEmitChangeSP, onSetDataSource } = this.props;
    return (
      <div className={styles.wrap}>
        {dataSource.map((v, k) => {
          return (
            <React.Fragment key={v.bettingSlipId + 'quickBet'}>
              <BetInfo
                emitChangeSP={onEmitChangeSP}
                isAcceptChange={isAcceptChange}
                onChangeEW={isEW => {
                  this.props.onSetDataSource(`${k}.isEW`, isEW);
                }}
                onChangeOdds={odds => {
                  this.props.onSetDataSource(`${k}.isSP`, odds === 'SP');
                }}
                onDelete={onDelete}
                onSetDataSource={onSetDataSource}
                itemKey={k}
                key={v.bettingSlipId + 'quickBet'}
                {...v}
              />
            </React.Fragment>
          );
        })}
      </div>
    );
  }
}

export default QuickBetInfo;
