import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import GameListItem from './index';
import moment from 'moment';

jest.useFakeTimers();
describe('CountDown', async () => {
  it('Button ', () => {
    expect.assertions(1);
    const wrapper = render(<GameListItem />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  // obj.live = status;
  // obj.rightText = e.matchTime;
  // obj.period = e.period;
  // obj.sportType = e.sportType;
  // obj.nowTime = selectNewTime;
  // obj.elapseTime = e.elapseTime;
  // obj.paused = e.paused === 1; // 0 不停表 1 停表
  // obj.startIn = formatMessage({ id: "Wiki.0008" })
  it('点击事件 click', () => {
    const wrapper = mount(
      <GameListItem
        data={{
          list: [
            { leftText: 4441, center: 2 },
            {
              leftcls: true,
              live: true,
              biginTime: '2019-10-11',
              sportType: 2,
              leftText: 444,
              center: 2,
              paused: false,
              startIn: 12131,
            },
          ],
        }}
        statusJson={{
          'zh-CN': '比赛状态',
          '0': {
            'zh-CN': '未开赛',
            'en-US': 'Starting soon',
          },
          '1': {
            'zh-CN': '第一节',
            'en-US': '1st Quarter',
          },
          '2': {
            'zh-CN': '第二节',
            'en-US': '2nd Quarter',
          },
        }}
      />
    );
    wrapper.find('div.default-game-list-item').simulate('click');
  });
});
