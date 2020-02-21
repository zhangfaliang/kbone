import React from 'react';
import styles from './order.less';

const ResultImg = ({ resultImgSrc = '', prefixCls = 'default', alt = '..' }) => {
  return (
    resultImgSrc && (
      <img className={styles[`${prefixCls}-result-img`]} src={resultImgSrc} alt={alt} />
    )
  );
};

ResultImg.COMPONENT_NAME = 'RESULTIMG';

export default ResultImg;
