import React, { useEffect, useState, memo } from 'react';
import Modal from '@/components/modal';
import { reduce } from 'lodash';
import NP from 'number-precision';
import { formatMessage } from 'umi/locale';
import classnames from 'classnames';
import { transformItem } from '../../../../../../selector/passList';

import { getBlockList } from '@/utils/multiplesBlockBuilder';
import styles from './modal.less';

function passMXNModal({ visible, title, passMList, passN, passM, onClose, onPress }) {
  const [data, setData] = useState([]);

  useEffect(
    () => {
      if (visible) {
        setData(getBlockList(passMList, passN, passM));
      }
    },
    [visible]
  );

  const dataSource = transformItem(data);
  return (
    <Modal
      className={styles.wrap}
      visible={visible}
      transparent
      maskClosable={false}
      title={title}
      onClose={onClose}
      footer={[{ text: 'Ok', onPress: onPress }]}
    >
      <div className={styles.title}>
        <div>{formatMessage({ id: 'Wiki.0124' })}</div>
        <div>{formatMessage({ id: 'Wiki.0065' })}</div>
      </div>
      {dataSource.map((v, k) => {
        const odds = v.odds;
        const odd = reduce(odds, (a, b) => NP.strip(a * b) + '');
        const isSP = odds.findIndex(v => v === 'SP') > -1;
        const tranOdds = odd.indexOf('.') > -1 ? odd.substring(0, odd.indexOf('.') + 3) : odd;
        return (
          <div className={styles.item} key={k}>
            <div>{v.content}</div>
            <div>{isSP ? 'SP' : tranOdds}</div>
          </div>
        );
      })}
    </Modal>
  );
}

export default memo(passMXNModal);
