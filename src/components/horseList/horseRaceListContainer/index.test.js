import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import HorseRaceListContainer from './index';
import moment from 'moment';
import { getTimeFromCTSDateString } from '@/utils/getTimeFromCTSDateString';

describe('Horizontal', async () => {
  const data = { location: 222, listDate: [], dataList: [] };
  it('赛马场列表容器', () => {
    expect.assertions(1);
    const wrapper = render(
      <HorseRaceListContainer
        {...data}
        keys={{ title: 'location', dataList: 'list', listDate: 'listDate' }}
        item={() => {}}
        tabsItem={() => console.log()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('列表', () => {
    const wrapper = mount(
      <HorseRaceListContainer
        {...data}
        keys={{ title: 'location', dataList: 'list', listDate: 'listDate' }}
        item={v => v.key}
        tabsItem={() => console.log()}
      />
    );

    wrapper.setProps({
      data: { listDate: [{ key: 1, value: 1 }], list: [{ key: 2 }, { key: 3 }] },
    });
    const show = wrapper.find('div.show');
    expect(show.text()).toBe('23');
  });

  it('点击事件 click', () => {
    const wrapper = mount(
      <HorseRaceListContainer
        {...data}
        keys={{ title: 'location', dataList: 'list', listDate: 'listDate' }}
        item={v => v.key}
        tabsItem={() => console.log()}
      />
    );

    wrapper.setProps({
      data: {
        listDate: [{ key: 1, value: 1 }],
        list: [{ key: 2, list: [{ matchTime: moment() }] }, { key: 3 }],
      },
      displayHidden: () => {
        wrapper.setProps({
          data: {
            location: 1111,
          },
        });
      },
    });
    wrapper.setState({
      isActive: false,
    });
    wrapper.find('span.icon').simulate('click');
    expect(wrapper.state('isActive')).toBe(true);
  });
  it('设置第一次选中那个星期 transform', done => {
    const wrapper = mount(
      <HorseRaceListContainer
        {...data}
        keys={{ title: 'location', dataList: 'list', listDate: 'listDate' }}
        item={v => v.key}
        tabsItem={() => console.log()}
        timestamp={(v, f) =>
          moment(moment.unix(getTimeFromCTSDateString(v) / 1000).format(f)).unix()
        }
      />
    );
    wrapper.instance().transform({
      listDate: [{ key: 1, value: 1 }],
      list: [
        {
          key: 2,
          list: [
            {
              matchTime: moment()
                .add(1, 'day')
                .format('YYYY-MM-DD'),
            },
          ],
        },
        {
          key: 3,
          list: [
            {
              matchTime: moment()
                .add(1, 'day')
                .format('YYYY-MM-DD'),
            },
          ],
        },
      ],
    });
    done();
    expect(wrapper.state('activeKey')).toBe(
      moment()
        .add(1, 'day')
        .format('YYYY-MM-DD')
    );
  });

  it('设置第一次选中那个星期 tabs', done => {
    const wrapper = mount(
      <HorseRaceListContainer
        {...data}
        keys={{ title: 'location', dataList: 'list', listDate: 'listDate' }}
        item={v => v.key}
        tabsItem={() => console.log()}
        timestamp={(v, f) =>
          moment(moment.unix(getTimeFromCTSDateString(v) / 1000).format(f)).unix()
        }
      />
    );
    wrapper.instance().tabs(
      moment()
        .add(1, 'day')
        .format('YYYY-MM-DD')
    );
    done();
    expect(wrapper.state('activeKey')).toBe(
      moment()
        .add(1, 'day')
        .format('YYYY-MM-DD')
    );
  });

  it('点击事件', done => {
    const wrapper = mount(
      <HorseRaceListContainer
        {...data}
        keys={{ title: 'location', dataList: 'list', listDate: 'listDate' }}
        item={v => v.key}
        tabsItem={() => console.log()}
        timestamp={(v, f) =>
          moment(moment.unix(getTimeFromCTSDateString(v) / 1000).format(f)).unix()
        }
      />
    );
    wrapper.setState({
      activeKey: true,
    });
    wrapper.instance().onClick();
    done();
    expect(wrapper.state('isActive')).toBe(false);
  });
});
