import React, { createRef } from 'react';
import styles from './index.less';
const defaultHorseTeam = require('../../assets/horse/defaultHorseTeam.png');

class HorseImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: props.picUrl || props.defaultUrl,
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.imgUrl !== state.imgUrl) {
      return { activeKey: props.imgUrl };
    }
    return null;
  }
  onError = () => {
    this.setState({
      imgUrl: this.props.defaultUrl,
    });
  };
  render() {
    const { picUrl, prefixCls } = this.props;
    const clsStr = styles[`${prefixCls}-horse-img`];
    return <img className={clsStr} src={this.state.imgUrl} alt="" onError={this.onError} />;
  }
}
HorseImg.defaultProps = {
  defaultUrl: defaultHorseTeam,
  prefixCls: 'single',
  picUrl: '',
};
export default HorseImg;
