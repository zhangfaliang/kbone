import toJson from 'enzyme-to-json';
import { render, mount, shallow } from 'enzyme';
import Horizontal from './index';
import moment from 'moment';

describe('Horizontal', async () => {
  const obj = {
    data: {
      matchStatus: 0,
      matchTime: moment(moment().unix() + 10000).format('YYYY-MM-DD HH:mm:ss'),
      raceNum: 1,
    },
    keys: {
      id: 'matchId',
      sort: 'raceNum', // 赛马比赛顺序（后台返回的）
      status: 'matchStatus',
      startTime: 'matchTime', //比赛开始时间
      bookClosedStatus: 'handicapStatus', // 关盘的状态
      resultStatus: 'auditStatus', // 结果的状态
    },
  };
  // it('base', () => {
  //   expect.assertions(1);
  //   const wrapper = render(<Horizontal {...obj} />);
  //   expect(toJson(wrapper)).toMatchSnapshot();
  // });

  it('click', () => {
    const wrapper = mount(<Horizontal {...obj} />);
    wrapper.setProps({
      rouders: () => {
        wrapper.setProps({
          data: {
            raceNum: 'test',
          },
        });
      },
    });
    wrapper.find('div.item').simulate('click');
    const name = wrapper.find('div.name');
    expect(name.text()).toBe('test');
  });
  it('sort', () => {
    const wrapper = mount(<Horizontal {...obj} />);
    wrapper.setProps({
      data: {
        matchStatus: 2,
        matchTime: '',
        raceNum: 5,
      },
    });
    const name = wrapper.find('div.name');
    expect(name.text()).toBe('5');
  });

  it('结果', () => {
    const wrapper = mount(<Horizontal {...obj} />);
    wrapper.setProps({
      data: {
        handicapStatus: 9,
        auditStatus: 1,
        matchId: 10,
        matchStatus: 9,
        raceNum: 1,
        matchTime: '', //比赛开始时间
      },
      // keys:{
      //   serialNumber: 2,
      // }
    });
    const result = wrapper.find('div.result');
    expect(result.text()).toBe('');
  });
  it('关盘', () => {
    const wrapper = mount(<Horizontal {...obj} />);
    wrapper.setProps({
      data: {
        handicapStatus: 9,
        auditStatus: 0,
        matchId: 10,
        matchStatus: 9,
        raceNum: 1,
        matchTime: '', //比赛开始时间
      },
      // keys:{
      //   serialNumber: 2,
      // }
    });
    const bookClosedStatus = wrapper.find('div.bookClosedStatus');
    expect(bookClosedStatus.text()).toBe('');
  });
  it('比赛已经开始', () => {
    const wrapper = mount(<Horizontal {...obj} />);
    wrapper.setProps({
      data: {
        handicapStatus: 8,
        auditStatus: 0,
        matchId: 10,
        matchStatus: 8,
        raceNum: 1,
        matchTime: '', //比赛开始时间
      },
      // keys:{
      //   serialNumber: 2,
      // }
    });
    const startStatus = wrapper.find('div.startStatus');
    expect(startStatus.text()).toBe('');
  });
  it('比赛没有开始 ', () => {
    const wrapper = mount(<Horizontal {...obj} />);
    wrapper.setProps({
      data: {
        handicapStatus: 8,
        auditStatus: 0,
        matchId: 10,
        matchStatus: 0,
        raceNum: 1,
        matchTime: '', //比赛开始时间
      },
      // keys:{
      //   serialNumber: 2,
      // }
    });
    const status = wrapper.find('div.status');
    expect(status.text()).toBe('');
  });
});
