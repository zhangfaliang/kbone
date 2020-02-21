import React, { PureComponent } from 'react';
import { formatMessage } from 'umi/locale';
import { getTimeFromCTSDateString } from '@/utils/getTimeFromCTSDateString';
// import { getTimezone } from '@/utils/getTimezone';
import moment from 'moment';
const unit = {
  h: formatMessage({ id: 'Wiki.2016' }),
  m: formatMessage({ id: 'Wiki.2017' }),
  s: formatMessage({ id: 'Wiki.2018' }),
};
export default class CountDown extends PureComponent {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      times: '',
    };
  }
  componentDidMount() {
    const { biginTime } = this.props;
    if (biginTime) {
      this.countFun();
    }
  }
  //组件卸载取消倒计时
  componentWillUnmount() {
    this.clear();
  }
  /**
   *@method clear 取消定时器方法
   */
  clear = () => {
    clearInterval(this.timer);
  };
  /**
   * @method countFun 计算时间
   * @param {*} time 比赛开始时间
   * @param {*} status 比赛的状态
   */
  countFun = () => {
    const _this = this;
    const { biginTime, newTime } = this.props;
    // const getTime = getTimezone();
    const startTime = moment(getTimeFromCTSDateString(biginTime)).unix(); // 比赛开始时间戳
    let timeDifference = startTime - Math.round(newTime / 1000);
    _this.computingTime(timeDifference);
    this.timer = setInterval(function() {
      timeDifference--;
      _this.computingTime(timeDifference);
    }, 1000);
  };
  /**
   *
   *@function computingTime 计算时间
   * @param {*} status
   * @param {*} startTime 开始时间
   * @param {*} newTime 采用utc 时间 单位秒
   * @returns
   */
  computingTime = timeDifference => {
    if (timeDifference < 0) {
      this.setTime(formatMessage({ id: 'Wiki.2013' }));
      this.clear();
      return false;
    }
    const m = Math.floor(timeDifference / 60);
    const s = timeDifference % 60;
    const h = Math.floor(m / 60);
    const timesReg = new Map([
      [
        /(?!86400)^[8][6-9][4-9][0-9][0-9]|[\d]{6,}|[9][\d]{4}$/, // 大于24小时（24*60*60）
        () => '',
      ],
      [
        /^3[6-9][0-9][0-9]$|^[4-9][\d]{3}$|^[1-7][\d]{4}$|^8[0-5][\d]{3}$|^86[0-3][\d]{2}$|^86400$/, // 小于等于24小时且大于等于1小时
        () => this.setTime(h + `${unit.h}` + (m % 60) + `${unit.m}`),
      ],
      [
        /^[6-9]\d{1}$|^[1-9][\d]{2}$|^[1-2][\d]{3}$|^3[0-5][\d]{2}/, // 小于1小时大于等于1分钟
        () => this.setTime(m + `${unit.m}` + s + `${unit.s}`),
      ],
      [
        /^[1-9]$|^[1-5]\d{1}$/, // 小于1分钟大于0秒
        () => this.setTime(s + `${unit.s}`),
      ],
    ]);
    if (timeDifference === 0) {
      // 比赛时间到默认开始(已和产品确认)没有开始状态
      this.setTime(formatMessage({ id: 'Wiki.2013' }));
      this.clear();
    } else {
      const timesObj = [...timesReg].find(([key, value]) => key.test(timeDifference));
      timesObj && timesObj[1]();
    }
  };
  /**
   * @method setTime 设置时间
   * @param {*} times 距离比赛开始的时间或者比赛推迟的时间
   */
  setTime = times => {
    this.setState({
      times: times,
    });
  };
  render() {
    return <span>{this.state.times}</span>;
  }
}
