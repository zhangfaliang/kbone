import React, { Component } from 'react';
import classnames from 'classnames';
import IconFont from '../iconFont';
import styles from './index.less';

class ChoosePlay extends Component {
  static COMPONENT_NAME = 'CHOOSEPLAY';
  constructor(props) {
    super(props);
    this.state = {
      activeFlag: props.defaultActive,
    };
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.active !== this.props.active) {
      this.setState({
        activeFlag: nextProps.active,
      });
    }
    return true;
  }

  handleChoose = e => {
    e.preventDefault();
    const { handleChoose } = this.props;
    this.setState(
      {
        activeFlag: !this.state.activeFlag,
      },
      () => {
        this.props.handleChoose && this.props.handleChoose(this.state.activeFlag);
      }
    );
  };

  render() {
    const { prefixCls, active, chooseText } = this.props;
    const { activeFlag } = this.state;
    const chooseCls = [styles[`${prefixCls || 'default'}-choose-play`]];

    const iconCls = classnames({
      [styles['chooseIcon']]: true,
      [styles['chooseActive']]: activeFlag,
    });
    return (
      <div className={chooseCls} onClick={this.handleChoose}>
        <span className={styles.text}>{chooseText}</span>
        <span className={iconCls}>
          <IconFont type="mycopy2" />
        </span>
      </div>
    );
  }
}
ChoosePlay.defaultProps = {
  prefixCls: 'default',
  defaultActive: false,
  active: false,
  chooseText: '',
  handleChoose: () => {
    console.log('handleChoose');
    return 'handleChoose';
  },
};

export default ChoosePlay;
