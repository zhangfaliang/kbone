import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import HorseRaceBetButton from './index';

describe('horseRaceBetButton', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<HorseRaceBetButton prefixCls="middle" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('prefixCls null', () => {
    expect.assertions(1);
    const wrapper = render(<HorseRaceBetButton prefixCls={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('prefixCls default', () => {
    expect.assertions(1);
    const wrapper = render(<HorseRaceBetButton prefixCls="default" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('prefixCls sp', () => {
    expect.assertions(1);
    const wrapper = render(<HorseRaceBetButton prefixCls="sp" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('prefixCls withdraw-fore-any', () => {
    expect.assertions(1);
    const wrapper = render(<HorseRaceBetButton prefixCls="withdraw-fore-any" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('prefixCls withdraw-fore', () => {
    expect.assertions(1);
    const wrapper = render(<HorseRaceBetButton prefixCls="withdraw-fore" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('prefixCls withdraw-tir-any', () => {
    expect.assertions(1);
    const wrapper = render(<HorseRaceBetButton prefixCls="withdraw-tir-any" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('prefixCls withdraw-tir', () => {
    expect.assertions(1);
    const wrapper = render(<HorseRaceBetButton prefixCls="withdraw-tir" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('正常处理', () => {
    expect.assertions(1);
    const wrapper = render(
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
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('isErrorSelect', () => {
    expect.assertions(1);
    const wrapper = render(
      <HorseRaceBetButton
        optionName="sp"
        className="test"
        optionId="2.3"
        handicap="4"
        odds="6.7"
        isErrorSelect={true}
        historySp={[]}
        bettingSlipId="65"
        playtypeName="456"
        title="456"
        betLimit="5000"
        playtypeCode="sdf"
        prefixCls="withdraw-tir"
        showOdds={true}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('isHide', () => {
    expect.assertions(1);
    const wrapper = render(
      <HorseRaceBetButton
        optionName="sp"
        className="test"
        optionId="2.3"
        handicap="4"
        odds="6.7"
        isHide={true}
        historySp={[]}
        bettingSlipId="65"
        playtypeName="456"
        title="456"
        betLimit="5000"
        playtypeCode="sdf"
        prefixCls="withdraw-tir"
        showOdds={true}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('disabled', () => {
    expect.assertions(1);
    const wrapper = render(
      <HorseRaceBetButton
        optionName="sp"
        className="test"
        optionId="2.3"
        handicap="4"
        odds="6.7"
        disabled={true}
        historySp={[1, 3, 4]}
        bettingSlipId="65"
        playtypeName="456"
        title="456"
        betLimit="5000"
        playtypeCode="sdf"
        prefixCls="withdraw-tir"
        showOdds={false}
        showBetText={true}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('handleClick', () => {
    expect.assertions(1);
    const button = mount(
      <HorseRaceBetButton
        optionName="sp"
        className="test"
        optionId="2.3"
        handicap="4"
        odds="6.7"
        disabled={false}
        historySp={[]}
        bettingSlipId="65"
        playtypeName="456"
        title="456"
        betLimit="5000"
        playtypeCode="sdf"
        prefixCls="withdraw-tir"
        showOdds={true}
      />
    );
    const selectBetBtn = button.prop('selectBetBtn');
    const click = jest.fn(selectBetBtn);
    button.simulate('click');
    expect(click()).toBe('selectBetBtn');
  });

  it('isActive', () => {
    expect.assertions(1);
    const button = mount(
      <HorseRaceBetButton
        optionName="sp"
        className="test"
        optionId="2.3"
        handicap="4"
        odds="6.7"
        disabled={false}
        historySp={[]}
        bettingSlipId="65"
        playtypeName="456"
        title="456"
        betLimit="5000"
        playtypeCode="sdf"
        prefixCls="withdraw-tir"
        showOdds={true}
      />
    );
    button.setProps({
      isActive: true,
    });
    expect(true).toBe(button.prop('isActive'));
  });
});
