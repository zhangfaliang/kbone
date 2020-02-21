import React, { useEffect, useState, useReducer } from 'react';
import { Button } from '@/components/form';
import classnames from 'classnames';
import styles from './index.less';

function AddBetSlipPanel({ disabled, onClick, text }) {
  return (
    <Button
      onClick={onClick}
      disabledCls={styles.disabled}
      disabled={disabled}
      shape="half-radius"
      className={styles.wrap}
    >
      {text}
    </Button>
  );
}

AddBetSlipPanel.defaultProps = {
  disabled: true,
  text: '',
  onClick: () => {},
};

export default AddBetSlipPanel;
