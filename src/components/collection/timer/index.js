import React, { Component } from 'react';
import { getTimeFromCTSDateString } from '@/utils/getTimeFromCTSDateString';
// import { getTimezone } from '@/utils/getTimezone';
import { getLocale, formatMessage } from 'umi/locale';
import moment from 'moment';
// import { get } from 'lodash';
// import { formatMessage } from 'umi/locale';
// const unit = {
//   h: formatMessage({ id: 'Wiki.2016' }),
//   m: formatMessage({ id: 'Wiki.2017' }),
//   s: formatMessage({ id: 'Wiki.2018' }),
// };
// TODO: 走查1 20191031 删除小时和分钟之间的空格
function times(biginTime, matchTimezoneStr) {
  return moment(getTimeFromCTSDateString(biginTime)).unix();
}
function dateformat(biginTime) {
  return moment(moment.unix(times(biginTime))).format(formatMessage({ id: 'Date.05' }));
}
export default class CountDown extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.addTimer = null;
    this.state = {
      times: '',
    };
  }
  shouldComponentUpdate(nextProps, nextstate) {
    const update = nextProps.elapseTime === this.props.elapseTime;
    if (!update) {
      if (!nextProps.live) {
        return false;
      }
      this.clearAdd();
      this.clear();
      this.addtime();
    }
    return true;
  }
  componentDidMount() {
    const { biginTime, nowTime, live, matchTimezoneStr, elapseTime } = this.props;
    const startTime = moment(getTimeFromCTSDateString(biginTime)).unix(); // 比赛开始时间戳
    let timeDifference = startTime - Math.round(nowTime / 1000);
    if (elapseTime > 0) {
      if (!live) {
        this.setTime(dateformat(biginTime, matchTimezoneStr));
      } else {
        this.clearAdd();
        this.clear();
        this.addtime();
      }
      return false;
    } else {
      if (!live) {
        this.setTime(dateformat(biginTime, matchTimezoneStr));
      } else {
        this.clearAdd();
        this.countFun();
      }
    }
    // if (timeDifference < 0) {
    //   if (!live) {
    //     this.setTime(dateformat(biginTime, matchTimezoneStr));
    //   } else {
    //     this.clearAdd();
    //     this.clear();
    //     this.addtime();
    //   }
    //   return false;
    // } else {
    //   debugger;
    //   if (!live) {
    //     this.setTime(dateformat(biginTime, matchTimezoneStr));
    //   } else {
    //     this.clearAdd();
    //     this.countFun();
    //   }
    // }
  }
  //组件卸载取消倒计时
  componentWillUnmount() {
    this.clear();
    this.clearAdd();
  }
  /**
   *@method clear 取消定时器方法
   */
  clear = () => {
    clearInterval(this.timer);
  };
  clearAdd = () => {
    clearInterval(this.addTimer);
  };
  /**
   * @method countFun 计算时间
   * @param {*} time 比赛开始时间
   * @param {*} status 比赛的状态
   */
  countFun = () => {
    const _this = this;
    const {
      biginTime,
      // status,
      nowTime,
    } = this.props;
    const startTime = moment(getTimeFromCTSDateString(biginTime)).unix(); // 比赛开始时间戳
    let timeDifference = startTime - Math.round(nowTime / 1000);
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
   * @param {*} nowTime 采用utc 时间 单位秒
   * @returns
   */
  computingTime = timeDifference => {
    const m = Math.floor(timeDifference / 60);
    const s = timeDifference % 60;
    const h = Math.floor(m / 60);
    const timesReg = new Map([
      [
        /(?!86400)^[8][6-9][4-9][0-9][0-9]|[\d]{6,}|[9][\d]{4}$/, // 大于24小时（24*60*60）
        () => this.setTime(dateformat(this.props.biginTime)),
      ],
      [
        /^3[6-9][0-9][0-9]$|^[4-9][\d]{3}$|^[1-7][\d]{4}$|^8[0-5][\d]{3}$|^86[0-3][\d]{2}$|^86400$/, // 小于等于24小时且大于等于1小时
        () => this.setTime(h + 'H' + (m % 60) + `'`, this.props.startIn),
      ],
      [
        /^[6-9]\d{1}$|^[1-9][\d]{2}$|^[1-2][\d]{3}$|^3[0-5][\d]{2}/, // 小于1小时大于等于1分钟
        () => this.setTime(m + `'`, this.props.startIn),
      ],
      [
        /^[1-9]$|^[1-5]\d{1}$/, // 小于1分钟大于0秒
        () => this.setTime(s + `"`, this.props.startIn),
      ],
    ]);
    if (timeDifference === 0) {
      // 比赛时间到默认开始(已和产品确认)没有开始状态
      const { statusJson, period } = this.props;
      const locale = getLocale();
      this.setTime(statusJson[period][locale]);
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
  setTime = (times, startin) => {
    this.setState({
      times: times,
      startin: startin,
    });
  };
  addtime = () => {
    const { paused, elapseTime, statusJson, matchStatus, sportType } = this.props;
    const _this = this;
    let addtimes = elapseTime ? Math.round(elapseTime / 1000) : 1;
    if (paused) {
      const locale = getLocale();
      const m = Math.floor(addtimes / 60);
      this.setTime(statusJson[matchStatus][locale] + ' ' + m + "'");
      _this.clearAdd();
      return false;
    }
    if (sportType === 2 && addtimes === 0) {
      this.clearAdd();
      return false;
    }
    this.addComputingTime(addtimes);
    this.addTimer = setInterval(function() {
      if ((sportType === 2 && addtimes === 0) || (sportType === 1 && addtimes === 45 * 60)) {
        _this.clearAdd();
        return false;
      }
      if (sportType === 1) {
        addtimes++;
      } else if (sportType === 2) {
        addtimes--;
      }
      _this.addComputingTime(addtimes);
    }, 1000);
  };
  addComputingTime = timeDifference => {
    const { statusJson, matchStatus } = this.props;
    const m = Math.floor(timeDifference / 60);
    // const h = Math.floor(m / 60);
    const locale = getLocale();
    const timesReg = new Map([
      [
        /^[6-9]\d{1}$|^[1-9]\d{2,}$/, // 大于等于1分钟
        () => this.setTime(statusJson[matchStatus][locale] + ' ' + m + "'"),
      ],
      [
        /^[1-9]$|^[1-5]\d{1}$/, // 小于1分钟大于0秒
        () => this.setTime(statusJson[matchStatus][locale] + ' ' + 0 + "'"),
      ],
    ]);
    const timesObj = [...timesReg].find(([key, value]) => key.test(timeDifference));
    timesObj && timesObj[1]();
  };
  render() {
    const { times, startin } = this.state;
    return (
      <span>
        {startin ? (
          <span>
            {startin} {<span style={{ color: '#E62300' }}>{times}</span>}
          </span>
        ) : (
          times
        )}
      </span>
    );
  }
}
