import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import CountDown from './index';
import moment from 'moment';

jest.useFakeTimers();
describe('CountDown', async () => {
  it('时间转化组件', () => {
    expect.assertions(1);
    const wrapper = render(<CountDown />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('时间转化组件 componentDidMount', () => {
    const wrapper = mount(
      <CountDown
        status={true}
        biginTime={moment.unix(moment().unix() - 100).format('YYYY-MM-DD HH:mm:ss')}
        newTime={moment().unix() + 1000}
      />
    );
    wrapper.instance().componentDidMount();
    wrapper.instance().componentWillUnmount();
  });

  it('时间转化组件 countFun', () => {
    const wrapper = mount(
      <CountDown
        biginTime={moment.unix(moment().unix() + 1000).format('YYYY-MM-DD HH:mm:ss')}
        status={true}
        newTime={moment().unix() + 1000}
      />
    );
    wrapper.instance().countFun();
    expect(setInterval);
    // console.log(wrapper.state('times'), 'times1');
  });

  it('时间转化组件 computingTime 大于24小时', () => {
    const wrapper = mount(<CountDown status={true} />);
    wrapper.instance().computingTime(24 * 60 * 60 + 10);
    expect(wrapper.state('times')).toBe('');
  });

  it('时间转化组件 computingTime 小于24小时大于0小时', done => {
    const wrapper = mount(<CountDown status={true} />);
    wrapper.instance().computingTime(24 * 60 * 60 - 10);
    done();
    expect(wrapper.state('times')).toBe('23null59null');
  });

  it('时间转化组件 computingTime 不足1小时且大于0分钟', () => {
    const wrapper = mount(<CountDown status={true} />);
    wrapper.instance().computingTime(60 * 60 - 1);
    expect(wrapper.state('times')).toBe('59null59null');
  });

  it('时间转化组件 computingTime 不足1分钟且大于0秒', () => {
    const wrapper = mount(<CountDown status={true} />);
    wrapper.instance().computingTime(60 - 1);
    expect(wrapper.state('times')).toBe('59null');
  });

  it('时间转化组件 computingTime 0小时0分钟0秒且状态没有推迟', () => {
    // expect.assertions(1);
    const wrapper = mount(<CountDown status={true} />);
    wrapper.instance().computingTime(0);
    expect(wrapper.state('times')).toBe(null);
  });
  it('时间转化组件 computingTime 比赛开始或者推迟', () => {
    // expect.assertions(1);
    const wrapper = mount(<CountDown status={true} />);
    wrapper.instance().computingTime(true, moment().unix() - 1);
    expect(wrapper.state('times')).toBe('');
  });
});
