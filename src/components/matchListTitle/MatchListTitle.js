import React, { Component } from 'react';
import LiveNum from './LiveNum';
import ChoosePlay from './ChoosePlay';
import LeftTitle from '../label/LeftTitle';
import LabelRight from '../label/LabelRight';
import GamePlayModule from './GamePlayModule';
import { offset } from '../../utils/commonFn.js';
import styles from './index.less';

class MatchListTitle extends Component {
  constructor(props) {
    super(props);
    this.listTitle = React.createRef();
    this.state = {
      isOpenFlag: false,
      selectItem: this.props.chooseText,
      offsetTop: 0,
    };
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.chooseText !== this.props.chooseText) {
      this.setState({
        selectItem: nextProps.chooseText,
      });
    }
    return true;
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.choosePlayOpenFlag !== prevState.isOpenFlag) {
      return {
        isOpenFlag: nextProps.choosePlayOpenFlag,
      };
    }
    return null;
  }

  handleChoose = isOpenFlag => {
    const { handleChoose } = this.props;
    this.setState({
      isOpenFlag,
    });
    handleChoose && handleChoose(isOpenFlag);
  };
  handleItem = (item, gamePlayKey) => {
    const { handleItem } = this.props;
    this.setState({
      selectItem: item,
    });
    this.setState({
      isOpenFlag: false,
    });
    handleItem && handleItem(item, gamePlayKey);
  };
  componentDidMount() {
    const offsetTop = offset(this.listTitle.current).top + this.listTitle.current.clientHeight;
    this.setState({ offsetTop: offsetTop });
  }

  render() {
    const { prefixCls, children } = this.props;
    const { isOpenFlag, selectItem, offsetTop } = this.state;

    const childrens = React.Children.map(children, option => {
      const { isOpen, chooseText, ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'LIVENUM') {
        return <LiveNum {...other} handleLive={this.props.handleLive} />;
      } else if (option.type.COMPONENT_NAME === 'CHOOSEPLAY') {
        return (
          <ChoosePlay
            {...other}
            chooseText={selectItem}
            handleChoose={this.handleChoose}
            active={isOpenFlag}
          />
        );
      } else if (option.type.COMPONENT_NAME === 'LEFTNODE') {
        return <LeftTitle {...other} clickLeftTitleText={this.props.clickLeftTitleText} />;
      } else if (option.type.COMPONENT_NAME === 'GAMEPLAYMODULE') {
        return (
          <GamePlayModule
            isOpen={isOpenFlag}
            {...other}
            handleItem={this.handleItem}
            handleLayer={this.handleChoose}
            offsetTop={offsetTop}
          />
        );
      } else if (option.type.COMPONENT_NAME === 'LABELRIGHT') {
        return <LabelRight {...other} />;
      }
    });
    const clsName = `${prefixCls || 'default'}-match-list-title`;
    return (
      <div ref={this.listTitle} className={styles[clsName]}>
        {childrens}
      </div>
    );
  }
}
MatchListTitle.defaultProps = {
  prefixCls: 'default',
  chooseText: '',
  handleLive: () => {
    console.log('handleLive --title ');
    return 'handleLive';
  },
  handleChoose: () => {
    console.log('handleChoose --title ');
    return 'handleChoose';
  },
  clickLeftTitleText: () => {
    console.log('clickLeftTitleText --title ');
    return 'clickLeftTitleText';
  },
  handleItem: item => {
    console.log(item + 'handleItem --title ');
    return 'handleItem';
  },
};
export default MatchListTitle;
