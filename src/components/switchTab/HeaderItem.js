import React from 'react';
import classnames from 'classnames';
import styles from './HeaderItem.less';
import CLOSE_ACTIVE from '../../assets/close-active.png';
import { SwitchTabContext } from './SwitchTabContext';

export const HeaderItem = ({
  handleClick,
  logo,
  text,
  showCloseIcon = false,
  isActive = false,
}) => {
  const wrapperClass = isActive
    ? styles['item']
    : classnames(styles['item'], styles['item-inactive']);

  return (
    <SwitchTabContext.Consumer>
      {({ hideCategory }) => (
        <div className={wrapperClass} onClick={handleClick}>
          <img src={logo} alt="logo" />
          <div className={styles['title']}>{text}</div>
          {showCloseIcon && <img src={CLOSE_ACTIVE} alt="close" onClick={hideCategory} />}
        </div>
      )}
    </SwitchTabContext.Consumer>
  );
};
