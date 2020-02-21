import React, { useState, useEffect } from 'react';
import { Switch } from 'antd-mobile';
import TouchFeedback from 'rmc-feedback';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './index.less';

function KeyboardPanel({
  value: defaultValue,
  visabled,
  maxLength,
  onChangeRememberFun,
  onChange,
  onAddToBetSlipFun,
  onDoneFun,
  disabled,
  type,
  isClearInput,
  addToBetSlipText,
  doneText,
  rememberStakeText,
  betUnit,
  isFFF,
}) {
  const complexMap = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['.', 0, 'del'],
    // [addToBetSlipText, doneText],
    // [rememberStakeText],
  ];

  const simpleMap = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 0], ['.', 'del', doneText]];

  const [checked, setChecked] = useState(true);
  const [value, setValue] = useState(defaultValue + '');

  let keyboardMap = complexMap;
  if (type === 'simple') {
    keyboardMap = simpleMap;
  }

  useEffect(() => {
    if (!!isClearInput && visabled) {
      setValue('');
    }

    if (!visabled) {
      setValue('');
    }
  });

  let valueAfterChange = defaultValue;

  function transformValue(v) {
    return v.toString().replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
  }
  function handleKey(values) {
    const disabled = values.disabled;
    const kk = values.kk;
    const k = values.k;
    const itemVale = values.value + '';
    switch (k) {
      case 4:
        if (kk === 0) {
          onAddToBetSlipFun(transformValue(value));
        } else if (kk === 1) {
          onDoneFun(transformValue(value));
        } else {
          console.error('无效操作');
        }
        break;
      default:
        if (!itemVale) {
          break;
        }
        if (k === 1 && type === 'simple' && kk === 2) {
          onDoneFun(transformValue(value));
          return;
        }
        if (itemVale === 'del') {
          valueAfterChange = value.substring(0, value.length - 1);
          if (disabled) {
            setValue(transformValue(valueAfterChange.substring(0, valueAfterChange.length)));
            onChange(transformValue(valueAfterChange.substring(0, valueAfterChange.length)));
          } else {
            setValue(transformValue(valueAfterChange));
            onChange(transformValue(valueAfterChange));
          }
        } else {
          if (!disabled) {
            if (
              maxLength !== undefined &&
              +maxLength >= 0 &&
              (value + itemVale).length > maxLength
            ) {
              valueAfterChange = (value + itemVale).substr(0, maxLength);
              setValue(transformValue(valueAfterChange));
              onChange(transformValue(valueAfterChange));
            } else {
              valueAfterChange = value + itemVale;
              setValue(transformValue(valueAfterChange));
              onChange(transformValue(valueAfterChange));
            }
          }
        }
        break;
    }
  }

  function itemClsF(v) {
    if (type === 'complex') {
      return classnames({
        [styles.item]: true,
        [styles.fontD]: v < 4,
        [styles.actionItem]: v > 3,
        [styles.rememberItem]: v === 5,
        [styles.disbaled]: v <= 3 && disabled,
      });
    } else if (type === 'simple') {
      return classnames({
        [styles.item]: true,
        [styles.isFFF]: isFFF,
        [styles.simpleNumItem]: v === 0,
        [styles.simpleActionItem]: v === 1,
      });
    }
  }

  const hidePoint = parseFloat(betUnit) >= 1;

  const wrapCls = classnames({
    [styles.wrap]: true,
    [styles.pa]: type !== 'simple',
  });
  return (
    <div className={wrapCls}>
      {keyboardMap.map((v, k) => {
        return (
          <div className={itemClsF(k, disabled)} key={`keyboardMap${k}`}>
            {v
              .map(v => (!hidePoint ? v : v === '.' ? '' : v))
              .map((vv, kk) => {
                return (
                  <TouchFeedback
                    key={`keyboardMap-item-${kk}`}
                    activeClassName={k !== 5 && styles.active}
                    // disabled={k > 3 || (disabled && k <= 3 && vv !== 'del')}
                  >
                    {k === 5 ? (
                      <a>
                        <div>{vv}</div>
                        <div>
                          <Switch
                            color="#00A7FE"
                            checked={checked}
                            onChange={() => {
                              setChecked(!checked);
                              onChangeRememberFun(!checked);
                            }}
                          />
                        </div>
                      </a>
                    ) : (
                      <a onClick={handleKey.bind(this, { value: vv, k, kk, disabled })}>
                        {vv === 'del' ? <span /> : vv}
                      </a>
                    )}
                  </TouchFeedback>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}

KeyboardPanel.defaultProps = {
  onChangeRememberFun: checked => {},
  onChange: value => {},
  onAddToBetSlipFun: value => {},
  onDoneFun: value => {},
  visabled: true,
  value: '',
  maxLength: 10,
  disabled: false,
  betUnit: '0.01',
  type: 'complex',
  isFFF: false,
};

KeyboardPanel.propTypes = {
  type: PropTypes.oneOf(['simple', 'complex']),
};

export default KeyboardPanel;
