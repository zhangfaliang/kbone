import React from 'react';
import Back from './Back';
import { ChoosePlay } from '../matchListTitle';
import styles from './index.less';

class ChooseTitle extends React.Component {
  static COMPONENT_NAME = 'CHOOSETITLE';
  onClickBack = () => {
    const { onClickBack } = this.props;
    onClickBack && onClickBack();
  };
  handleChoose = activeFlag => {
    const { handleChoose } = this.props;
    handleChoose && handleChoose(activeFlag);
  };
  render() {
    const { children, chooseText, choosePlayActive, prefixCls } = this.props;
    const childrens = React.Children.map(children, option => {
      const { onClickBack, ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'BACK') {
        return <Back onClickBack={this.onClickBack} {...other} />;
      } else if (option.type.COMPONENT_NAME === 'CHOOSEPLAY') {
        return (
          <ChoosePlay
            {...other}
            active={choosePlayActive}
            chooseText={chooseText}
            handleChoose={this.handleChoose}
          />
        );
      }
    });
    return <div className={styles[`${prefixCls}-choose-title`]}>{childrens}</div>;
  }
}
ChooseTitle.defaultProps = {
  prefixCls: 'default',
  onClickBack: () => {
    console.log('onClickBack');
    return 'onClickBack';
  },
  choosePlayActive: false,
  chooseText: '',
  handleChoose: activeFlag => {
    console.log('handleChoose', activeFlag);
    return 'handleChoose';
  },
};

export default ChooseTitle;
