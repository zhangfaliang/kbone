import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
const ProgressText = ({
  handleClick = () => {},
  stringInTime = '',
  text = '',
  disabled = false,
}) => {
  const handleClickProgress = event => {
    event.preventDefault();
    !disabled && handleClick && handleClick();
  };
  const stringInTimeCls = classnames({
    [styles.stringInTime]: text,
    [styles.stringTime]: !text,
  });

  return (
    <div className={styles.progress} onClick={handleClickProgress}>
      <span className={styles.text}>{text}</span>
      <span className={stringInTimeCls}>{stringInTime}</span>
    </div>
  );
};

ProgressText.COMPONENT_NAME = 'PROGRESSTEXT';
export default ProgressText;
