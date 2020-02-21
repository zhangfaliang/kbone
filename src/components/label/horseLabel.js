import React from 'react';
import styles from './horseLabel.less';
import classnames from 'classnames';
import { getStringInTime } from '@/utils/mistiming';

class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.text !== state.text) {
      return { activeKey: props.text };
    }
    return null;
  }
  render() {
    const { text } = this.state;
    return text;
  }
  componentDidMount() {
    const { matchTime } = this.props;
    if (!matchTime) return;
    this.timer = setInterval(() => {
      const { isShowStringInTime, stringInTime } = getStringInTime(matchTime) || {};
      if (isShowStringInTime && stringInTime) {
        this.setState({
          text: isShowStringInTime && stringInTime ? stringInTime : '',
        });
      } else {
        clearInterval(this.timer);
        this.setState({
          text: '',
        });
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
}

export default ({ labels = [], prefixCls = 'horse', matchTime = '' }) => {
  return (
    <div className={styles[`${prefixCls}-label`]}>
      {labels.map((label, index) => {
        const { labelText, isCountDown, isBtn } = label;

        const clsStr = classnames({
          [styles.text]: true,
          [styles.button]: isBtn,
        });
        return (
          <span className={clsStr} key={index}>
            {isCountDown ? <CountDown text={labelText} matchTime={matchTime} /> : labelText}
          </span>
        );
      })}
    </div>
  );
};
