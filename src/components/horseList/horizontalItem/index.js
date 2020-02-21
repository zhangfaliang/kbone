import styles from './style.less';
import CountDown from '../countDown/index';
import classnames from 'classnames';
import { formatMessage } from 'umi/locale';
const message = {
  Off: formatMessage({ id: 'Wiki.2013' }),
  Finished: formatMessage({ id: 'Wiki.2046' }),
  Delay: formatMessage({ id: 'Wiki.2047' }),
  Result: formatMessage({ id: 'Wiki.2012' }),
  BookClosed: formatMessage({ id: 'Wiki.2049' }),
};
const statusResult = {
  // delay: (data, keys) => {
  //   // 比赛推迟
  //   return <CountDown biginTime={data[keys['startTime']]} status={false} />;
  // },
  notStarted: (data, keys, newTime) => {
    // 比赛未开始
    return <CountDown biginTime={data[keys['startTime']]} newTime={newTime} status={true} />;
  },
  off: () => {
    // 比赛开始
    return message.Off;
  },
  // finished: () => {
  //   // 比赛结束
  //   return message.Finished;
  // },
  result: () => {
    // 结果
    return message.Result;
  },
  bookClosed: () => {
    // 关盘
    return message.BookClosed;
  },
};
/**
 * @param {*} status 比赛状态
 * @param {*} resultStatus 结果状态
 * @param {*} BookClosedStatus 关盘的状态
 * @returns 比赛流程状态
 */
function matchStatusFun(status, resultStatus, bookClosedStatus, data, keys, newTime) {
  const competitionState = new Map([
    [
      /^0[0][0-8]$/, //比赛开始未关盘
      (data, keys, newTime) => statusResult.notStarted(data, keys, newTime),
    ],
    [
      /^[1-8][0][0-8]$/, //比赛开始未关盘
      (data, keys) => statusResult.off(data, keys),
    ],
    [
      /^[0-9][0]9$/, //关盘
      () => statusResult.bookClosed(),
    ],
    [
      /^9[1][0-9]$/, // 有结果
      () => statusResult.result(),
    ],
  ]);
  const timesObj = [...competitionState].find(([key, value]) =>
    key.test(status + '' + resultStatus + '' + bookClosedStatus)
  );
  return timesObj && timesObj[1](data, keys, newTime);
}
/**
 * @export
 * @param {*} props {data: "数据"， keys:{id:"id",}
 * @returns
 */
export default function Horizontal(props) {
  const { data, keys, rouders, newTime } = props;
  const status = data[keys['status']]; // 比赛是否开始、结束
  const bookClosedStatus = data[keys['bookClosedStatus']] === 9; // 9 代表已关盘
  const statusCls = classnames({
    // [styles.status]: status === 0 && !bookClosedStatus, // 倒计时样式
    [styles.status]: status === 0, // 倒计时样式
    // [styles.status]: true, // 倒计时样式
    [styles.startStatus]: status !== 9, // 比赛开始结束样式
    [styles.bookClosedStatus]: bookClosedStatus, // 关盘样式
    [styles.result]: data[keys['resultStatus']] !== 0, // 关盘样式
  });
  return (
    <>
      {data && (
        <div className={styles.item} onClick={() => rouders(data)}>
          <div className={styles.name}>
            <span>{data[keys['sort']]}</span>
            {/* <span className={styles.delay}>{delay}</span> */}
          </div>
          <div className={statusCls}>
            {matchStatusFun(
              status,
              data[keys['resultStatus']],
              data[keys['bookClosedStatus']],
              data,
              keys,
              newTime
            )}
          </div>
        </div>
      )}
    </>
  );
}
