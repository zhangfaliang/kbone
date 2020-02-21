import React, { Component } from 'react';
import classnames from 'classnames';
import BetInfo from './BetInfo';
import BetInput from './BetInput';
import Keyboard from '../keyboard';
import styles from './index.less';
import { formatMoney } from '../../utils/commonFn';

class BetModule extends Component {
  static COMPONENT_NAME = 'BETMODULE';
  constructor(props) {
    super(props);
    this.state = {
      isShowBetModule: props.isShow,
    };
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.isShow !== this.props.isShow) {
      this.setState({
        isShowBetModule: nextProps.isShow,
      });
    }
    //TODO 等待赔率小于1.01时需求改变是不展示投注弹框
    // if(nextProps.sp !== this.props.sp&&Number(nextProps.sp)<1.01){
    //   this.setState({
    //     isShowBetModule: false,
    //   });
    // }
    return true;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this.state.isShowBetModule) {
      return 'hidden';
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot === 'hidden') {
      document.body.style.overflow = snapshot;
    } else {
      document.body.style.overflow = 'auto';
    }
  }
  handelFocusInput = () => {
    if (!this.props.isShowKeyboard) {
      this.props.focusInput();
    }
  };
  handleKeyboardChange = value => {
    this.props.handleKeyboardChange(value);
  };

  handleInputChange = value => {
    console.log(value);
  };
  handleAllIn = activeFlag => {
    const { allAmount, handleAllIn } = this.props;
    handleAllIn(allAmount);
  };
  handleFillIn = activeFlag => {
    const { fillAmount, handleFillIn } = this.props;
    handleFillIn(fillAmount);
  };
  handleBet = activeFlag => {
    this.props.handleBet();
  };
  handleCloseBetModule = e => {
    e && e.stopPropagation();
    const { handleCloseBetModule } = this.props;
    this.setState(
      {
        isShowBetModule: false,
      },
      () => {
        handleCloseBetModule(false);
      }
    );
  };
  handleCloseKeyboard = e => {
    e.stopPropagation();
    this.props.closeKeyboard();
  };
  render() {
    const {
      prefixCls,
      children,
      maskClosable,
      allAmount,
      fillAmount,
      isShowKeyboard,
      allInDisabled,
      fillInDisabled,
      isFillInActive,
      isAllInActive,
      isBetBtnActive,
      keyboardValue,
      possibleWin,
    } = this.props;
    const { isShowBetModule } = this.state;
    const clsName = classnames({
      [styles[`${prefixCls}-bet-module`]]: true,
      [styles.isShowBetModule]: isShowBetModule,
    });
    const childrens = React.Children.map(children, option => {
      const { ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'BETINPUT') {
        return (
          <BetInput
            {...other}
            allAmount={allAmount}
            fillAmount={fillAmount}
            handleInputChange={this.handleInputChange}
            betAmount={keyboardValue}
            possibleWin={possibleWin}
            handleAllIn={this.handleAllIn}
            handleFillIn={this.handleFillIn}
            allInDisabled={allInDisabled}
            fillInDisabled={fillInDisabled}
            handleBet={this.handleBet}
            focusInput={this.handelFocusInput}
            isBetBtnActive={isBetBtnActive}
            isFillInActive={isFillInActive}
            isAllInActive={isAllInActive}
          />
        );
      } else if (option.type.COMPONENT_NAME === 'BETINFO') {
        return <BetInfo {...other} handleDelete={this.handleCloseBetModule} />;
      } else if (option.type.COMPONENT_NAME === 'KEYBOARD') {
        return (
          <Keyboard
            {...other}
            handleChange={this.handleKeyboardChange}
            isShow={isShowKeyboard}
            value={keyboardValue}
          />
        );
      }
    });
    return (
      <div className={clsName} onClick={maskClosable && this.handleCloseKeyboard}>
        {childrens}
      </div>
    );
  }
}
BetModule.defaultProps = {
  prefixCls: 'default',
  allAmount: '',
  fillAmount: '',
  isShow: false,
  maskClosable: true,
  handleCloseBetModule: () => {
    console.log('module----handleDelete');
    return 'handleCloseBetModule';
  },
  handleBet: betInfo => {
    console.log('handleBet---module', betInfo);
    return 'handleBet';
  },
  focusInput: () => {
    console.log('focusInput---module');
    return 'focusInput';
  },
  closeKeyboard: () => {
    console.log('closeKeyboard---module');
    return 'closeKeyboard';
  },
  handleKeyboardChange: value => {
    console.log('handleKeyboardChange---module', value);
    return 'handleKeyboardChange';
  },
  handleAllIn: activeFlag => {
    console.log('handleAllIn---module', value);
    return 'handleAllIn';
  },
  handleFillIn: activeFlag => {
    console.log('handleFillIn---module', value);
    return 'handleFillIn';
  },
};
export default BetModule;
