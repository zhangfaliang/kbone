import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import ChooseTitle from './ChooseTitle';
import Back from './Back';
import HorseRaceChooseSite from './HorseRaceChooseSite';
import HorseRaceSiteList from './HorseRaceSiteList';
import { ChoosePlay } from '../matchListTitle';
import { GamePlayModule } from '../matchListTitle';
import HorseRaceNum from '../horseRaceNum';

describe('HorseRaceBetButtonCell', async () => {
  it('Back', () => {
    expect.assertions(1);
    const wrapper = render(<Back />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('click Back', () => {
    expect.assertions(1);
    const wrapper = mount(<Back />);
    const selectBetBtn = wrapper.prop('onClickBack');
    const click = jest.fn(selectBetBtn);
    wrapper.simulate('click');
    expect(click()).toBe(undefined);
  });

  it('ChooseTitle', () => {
    expect.assertions(1);
    const wrapper = render(<ChooseTitle />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('ChooseTitle ChoosePlay', () => {
    expect.assertions(1);
    const wrapper = mount(
      <ChooseTitle>
        <Back />
        <ChoosePlay />
      </ChooseTitle>
    );

    const selectChoose = wrapper.prop('handleChoose');
    const handleChoose = jest.fn(selectChoose);
    wrapper.find('ChoosePlay').simulate('click');
    expect(handleChoose()).toBe('handleChoose');
  });
  it('ChooseTitle onClickBack', () => {
    expect.assertions(1);
    const wrapper = mount(
      <ChooseTitle>
        <Back />
        <GamePlayModule />
      </ChooseTitle>
    );
    const selectBetBtn = wrapper.prop('onClickBack');
    const click = jest.fn(selectBetBtn);
    wrapper.find('Back').simulate('click');
    expect(click()).toBe('onClickBack');
  });

  it('HorseRaceChooseSite', () => {
    expect.assertions(1);
    const wrapper = render(
      <HorseRaceChooseSite>
        <ChooseTitle />
        <GamePlayModule />
      </HorseRaceChooseSite>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('HorseRaceSiteList handleSiteItem', () => {
    expect.assertions(1);
    const wrapper = render(<HorseRaceSiteList sites={[{ key: '43534', value: 'dfdsfsdf' }]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('HorseRaceChooseSite handleSiteLayer', () => {
    expect.assertions(1);
    const wrapper = mount(
      <HorseRaceChooseSite>
        <ChooseTitle />
        <GamePlayModule />
      </HorseRaceChooseSite>
    );
    const selectBetBtn = wrapper.prop('handleSiteLayer');
    const click = jest.fn(selectBetBtn);
    wrapper.find('GamePlayModule').simulate('click');
    expect(click()).toBe('handleLayer');
  });
  it('HorseRaceChooseSite handleChooseSite', () => {
    expect.assertions(1);
    const wrapper = mount(
      <HorseRaceChooseSite>
        <ChooseTitle />
        <GamePlayModule />
      </HorseRaceChooseSite>
    );
    const selectBetBtn = wrapper.prop('handleChooseSite');
    const click = jest.fn(selectBetBtn);
    wrapper.find('GamePlayModule').simulate('click');
    expect(click()).toBe('handleChooseSite');
  });
  it('HorseRaceChooseSite handleSiteItem', () => {
    expect.assertions(1);
    const wrapper = mount(
      <HorseRaceChooseSite>
        <ChooseTitle />
        <GamePlayModule>
          <HorseRaceSiteList sites={[{ key: '43534', value: 'dfdsfsdf' }]} />
        </GamePlayModule>
      </HorseRaceChooseSite>
    );
    const selectBetBtn = wrapper.prop('handleSiteItem');
    const click = jest.fn(selectBetBtn);
    wrapper
      .find('GamePlayModule')
      .find('HorseRaceSiteList')
      .find('span')
      .simulate('click');
    expect(click()).toBe('handleItem');
  });

  it('HorseRaceSiteList handleSiteItem', () => {
    expect.assertions(1);
    const wrapper = mount(
      <HorseRaceSiteList
        maxHeight={2}
        activeKey="435341"
        sites={[
          { key: '435341', value: 'dfdsfsdf' },
          { key: '435342', value: 'dfdsfsdf' },
          { key: '435343', value: 'dfdsfsdf' },
          { key: '435344', value: 'dfdsfsdf' },
          { key: '435345', value: 'dfdsfsdf' },
          { key: '435346', value: 'dfdsfsdf' },
          { key: '435347', value: 'dfdsfsdf' },
          { key: '435348', value: 'dfdsfsdf' },
          { key: '435349', value: 'dfdsfsdf' },
          { key: '4353410', value: 'dfdsfsdf' },
          { key: '4353411', value: 'dfdsfsdf' },
          { key: '4353412', value: 'dfdsfsdf' },
          { key: '4353413', value: 'dfdsfsdf' },
          { key: '4353414', value: 'dfdsfsdf' },
          { key: '4353415', value: 'dfdsfsdf' },
          { key: '4353416', value: 'dfdsfsdf' },
        ]}
      />
    );
    wrapper.setProps({
      activeKey: '4353416',
    });
    const selectBetBtn = wrapper.prop('handleItem');
    const click = jest.fn(selectBetBtn);
    wrapper.simulate('click');
    expect(click()).toBe('handleItem');
  });

  it('HorseRaceSiteList handleSiteItem', () => {
    expect.assertions(1);
    const wrapper = mount(
      <HorseRaceSiteList
        maxHeight={12}
        activeKey="4353416"
        sites={[
          { key: '435341', value: 'dfdsfsdf' },
          { key: '435342', value: 'dfdsfsdf' },
          { key: '435343', value: 'dfdsfsdf' },
          { key: '435344', value: 'dfdsfsdf' },
          { key: '435345', value: 'dfdsfsdf' },
        ]}
      />
    );
    wrapper.setProps({
      activeKey: '4353416',
    });
    const selectBetBtn = wrapper.prop('handleItem');
    const click = jest.fn(selectBetBtn);
    wrapper.simulate('click');
    expect(click()).toBe('handleItem');
  });
  it('HorseRaceChooseSite handleSiteItem', () => {
    expect.assertions(1);
    const wrapper = mount(
      <HorseRaceChooseSite>
        <ChooseTitle>
          <Back />
          <ChoosePlay />
        </ChooseTitle>
      </HorseRaceChooseSite>
    );
    const selectBetBtn = wrapper.prop('handleSiteItem');
    const click = jest.fn(selectBetBtn);
    wrapper
      .find('ChooseTitle')
      .find('ChoosePlay')
      .simulate('click');
    expect(click()).toBe('handleItem');
  });
  it('HorseRaceChooseSite onClickBack', () => {
    expect.assertions(1);
    const wrapper = mount(
      <HorseRaceChooseSite>
        <ChooseTitle>
          <Back />
          <GamePlayModule />
        </ChooseTitle>
      </HorseRaceChooseSite>
    );
    const selectBetBtn = wrapper.prop('onClickBack');
    const click = jest.fn(selectBetBtn);

    wrapper
      .find('ChooseTitle')
      .find('Back')
      .simulate('click');
    expect(click()).toBe(undefined);
  });
});
