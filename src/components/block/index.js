import React from 'react';
import styles from './index.less';
const Block = ({ prefixCls = 'default' }) => {
  const clsNameStr = `${prefixCls}-block`;
  return <div className={styles[clsNameStr]} />;
};
Block.COMPONENT_NAME = 'BLOCK';
export default Block;
