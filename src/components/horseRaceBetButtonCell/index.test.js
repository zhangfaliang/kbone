import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import HorseRaceBetButtonCell from './index';
import HorseRaceBetButton from '../horseRaceBetButton';

describe('HorseRaceBetButtonCell', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(
      <HorseRaceBetButtonCell>
        <HorseRaceBetButton
          optionName="sp"
          className="test"
          optionId="2.3"
          handicap="4"
          odds="6.7"
          historySp={[]}
          bettingSlipId="65"
          playtypeName="456"
          title="456"
          betLimit="5000"
          playtypeCode="sdf"
          prefixCls="withdraw-tir"
          showOdds={true}
        />
      </HorseRaceBetButtonCell>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('prefixCls', () => {
    const wrapper = render(
      <HorseRaceBetButtonCell prefixCls="default">
        <HorseRaceBetButton
          optionName="sp"
          className="test"
          optionId="2.3"
          handicap="4"
          odds="6.7"
          historySp={[]}
          bettingSlipId="65"
          playtypeName="456"
          title="456"
          betLimit="5000"
          playtypeCode="sdf"
          prefixCls="withdraw-tir"
          showOdds={true}
        />
      </HorseRaceBetButtonCell>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('selectBetBtn', () => {
    const wrapper = mount(
      <HorseRaceBetButtonCell prefixCls="default">
        <HorseRaceBetButton
          optionName="sp"
          className="test"
          optionId="2.3"
          handicap="4"
          odds="6.7"
          historySp={[]}
          bettingSlipId="65"
          playtypeName="456"
          title="456"
          betLimit="5000"
          playtypeCode="sdf"
          prefixCls="withdraw-tir"
          showOdds={true}
        />
      </HorseRaceBetButtonCell>
    );
    const selectBetBtn = wrapper.prop('selectBetBtn');
    const click = jest.fn(selectBetBtn);
    wrapper
      .find('HorseRaceBetButtonCell')
      .find('HorseRaceBetButton')
      .simulate('click');
    expect(click()).toBe('selectBetBtn');
  });
  it('HorseRaceBetButtonCell', () => {
    const selectBetBtn = () => 'selectBetBtn';
    const click = jest.fn(selectBetBtn);
    const wrapper = render(
      <HorseRaceBetButtonCell prefixCls="default" selectBetBtn={click}>
        <HorseRaceBetButtonCell />
      </HorseRaceBetButtonCell>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
