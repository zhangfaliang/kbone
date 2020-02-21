import React, { useEffect } from 'react';
import Modal from '@/components/modal';
import { reduce } from 'lodash';
import classnames from 'classnames';
import NP from 'number-precision';
import styles from './index.less';

function PassItem({ title, odds }) {
  return (
    <div className={styles.passItem}>
      <div>
        {title.map((v, k) => {
          if (v.split(',').length > 1) {
            return v.split(',').map((vv, kk) => {
              return <p key={kk}>{vv}</p>;
            });
          } else {
            return <p key={k}>{v}</p>;
          }
        })}
      </div>
      <div>
        <div className={styles.odds}>{odds}</div>
      </div>
    </div>
  );
}

function BetSlipModal({ visible, effectPassModalInfo, title, onClose, onPress, dataSource }) {
  function orderStatusTxt(orderCode) {
    const orderSuccess = orderCode === 3;
    if (orderSuccess) {
      return '成功';
    } else {
      return '失败';
    }
  }

  return (
    <Modal
      wrapClassName={styles.aaaa}
      className={styles.wrap}
      visible={visible}
      transparent
      maskClosable={false}
      title={title}
      onClose={onClose}
      footer={[{ text: 'Ok', onPress: onPress }]}
    >
      {dataSource.map((v, k) => {
        // 订单状态 处理中 2、订单成功 3、订单失败 4
        const orderSuccess = v.result === 3;
        const statusCls = classnames({
          [styles.status]: true,
          [styles.success]: orderSuccess,
          [styles.fail]: !orderSuccess,
        });
        return (
          <div key={k} className={styles.item}>
            <div className={styles.info}>
              <div className={styles.title}>
                <div className={styles.name}>
                  {v.title.map((vv, kk) => (
                    <div key={'title' + kk}>{vv}</div>
                  ))}
                </div>
                <div className={styles.otherInfo}>
                  {v.effectPassModalInfo ? (
                    <span>X{v.noteCount}</span>
                  ) : (
                    <span>{v.isSP ? 'SP' : v.odds}</span>
                  )}
                  <div className={statusCls}>{orderStatusTxt(v.result)}</div>
                </div>
              </div>
              {v.effectPassModalInfo ? (
                <div className={styles.playType}>
                  {effectPassModalInfo[v.groupType].split('|').map((v, k) => {
                    const odds = v.split('@')[1];
                    const title = v.split('@')[0];
                    return <PassItem key={k} title={title.split()} odds={odds} />;
                  })}
                </div>
              ) : (
                <>
                  <div className={styles.playType}>{v.playName}</div>
                  <div className={styles.matchInfo}>{v.matchInfo}</div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </Modal>
  );
}

export default BetSlipModal;
