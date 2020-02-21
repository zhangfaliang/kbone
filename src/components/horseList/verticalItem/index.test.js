import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import Recommend from './index';

describe('VerticalItem', async () => {
  let data = {
    title: 222,
    arryData: [
      { playerLogo: 'http:123.png', horseName: '111', riderName: '222', odds: 2, paused: 0 },
      {
        playerLogo: '',
        horseName: '111',
        riderName: '222',
        odds: 2,
        bettingSlipId: 111,
        paused: 0,
      },
      { playerLogo: '', horseName: '111', riderName: '222', odds: 13, paused: 0 },
      { playerLogo: '', horseName: '111', riderName: '222', odds: 14, paused: 0 },
    ],
    dataList: [],
  };
  it('VerticalItem', () => {
    expect.assertions(1);
    const wrapper = render(
      <Recommend
        data={data}
        keys={{
          raceNum: 'title',
          arryData: 'arryData',
          playerLogo: 'playerLogo',
          horseName: 'horseName',
          riderName: 'riderName',
          odds: 'odds',
        }}
        item={() => {}}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('click', () => {
    const wrapper = mount(
      <Recommend
        data={data}
        keys={{
          raceNum: 'title',
          arryData: 'arryData',
          playerLogo: 'playerLogo',
          horseName: 'horseName',
          riderName: 'riderName',
          odds: 'odds',
        }}
        item={() => {}}
        viewDetail={() => {}}
        quickBet={() => {}}
      />
    );
    wrapper.find('span.iconColor').simulate('click');
  });
  it('click item checked', () => {
    const wrapper = mount(
      <Recommend
        data={{
          title: 222,
          arryData: [
            {
              playerLogo: '',
              horseName: '111',
              riderName: '222',
              odds: 2,
              bettingSlipId: 111,
              paused: 0,
            },
          ],
          dataList: [],
        }}
        keys={{
          raceNum: 'title',
          arryData: 'arryData',
          playerLogo: 'playerLogo',
          horseName: 'horseName',
          riderName: 'riderName',
          odds: 'odds',
        }}
        item={() => {}}
        viewDetail={() => {}}
        quickBet={() => {}}
      />
    );
    wrapper.find('div.checked').simulate('click');
  });
  it('click item nochecked', () => {
    const wrapper = mount(
      <Recommend
        data={{
          title: 222,
          arryData: [{ playerLogo: '', horseName: '111', riderName: '222', odds: 2, paused: 0 }],
          dataList: [],
        }}
        keys={{
          raceNum: 'title',
          arryData: 'arryData',
          playerLogo: 'playerLogo',
          horseName: 'horseName',
          riderName: 'riderName',
          odds: 'odds',
        }}
        item={() => {}}
        viewDetail={() => {}}
        quickBet={() => {}}
      />
    );
    wrapper.find('div.nochecked').simulate('click');
  });
  it('click item paused', () => {
    const wrapper = mount(
      <Recommend
        data={{
          title: 222,
          arryData: [{ playerLogo: '', horseName: '111', riderName: '222', odds: 2, paused: 1 }],
          dataList: [],
        }}
        keys={{
          raceNum: 'title',
          arryData: 'arryData',
          playerLogo: 'playerLogo',
          horseName: 'horseName',
          riderName: 'riderName',
          odds: 'odds',
        }}
        item={() => {}}
        viewDetail={() => {}}
        quickBet={() => {}}
      />
    );
    wrapper.find('div.paused').simulate('click');
  });
});

//  item.js 43行 onError 验证 目前没有找到验证方法
