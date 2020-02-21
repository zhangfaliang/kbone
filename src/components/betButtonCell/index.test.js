import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import BetButtonCell from './index';
import BetButton from '../betButton';
import Line from '../line';
const delay = (timeout, cb) => setTimeout(cb, timeout);
describe('BetButtonCell', () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(
      <BetButtonCell>
        <BetButton />
        <Line />
      </BetButtonCell>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('defaultClickBetBtn', () => {
    expect.assertions(1);
    const wrapper = mount(
      <BetButtonCell>
        <BetButton />
      </BetButtonCell>
    );
    const clickBetBtn = wrapper.prop('clickBetBtn');
    const click = jest.fn(clickBetBtn);
    wrapper
      .find('BetButtonCell')
      .find('BetButton')
      .simulate('click');
    expect(click()).toBe('clickBetBtn');
  });
  it('changeSp', () => {
    expect.assertions(1);

    const wrapper = mount(
      <BetButtonCell>
        <BetButton sp={delay(200, () => 1.6)} />
      </BetButtonCell>
    );
    const changeSp = wrapper.prop('changeSp');
    const click = jest.fn(changeSp);
    expect(click()).toBe('changeSp');
  });
  it('changeHandicap', () => {
    expect.assertions(1);
    const wrapper = mount(
      <BetButtonCell>
        <BetButton handicap={delay(200, () => 6.5)} />
      </BetButtonCell>
    );
    const changeHandicap = wrapper.prop('changeHandicap');
    const click = jest.fn(changeHandicap);
    expect(click()).toBe('changeHandicap');
  });
});
