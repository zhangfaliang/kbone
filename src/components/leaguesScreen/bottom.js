import React, { Component } from 'react';
import { className } from 'postcss-selector-parser';
import classnames from 'classnames';
import ScreenRadio from './screenRadio';
import Button from '../../components/button';
import styles from './index.less';

class ScreenBottom extends Component {
  render() {
    const { radioText, btnText, className, clickCheckBtn, handleRadio, allChoose } = this.props;
    const bottomCls = classnames(className, {
      [styles.bottom]: true,
    });
    return (
      <div className={bottomCls}>
        <ScreenRadio isActive={allChoose} handleRadio={handleRadio} />
        <Button className={styles.but} btnText={btnText} clickCheckBtn={clickCheckBtn} />
      </div>
    );
  }
}

ScreenBottom.defaultProps = {
  btnText: '确定',
  radioText: '全选',
  className: '',
  allChoose: false,
  clickCheckBtn: () => {},
  handleRadio: () => {},
};
export default ScreenBottom;
