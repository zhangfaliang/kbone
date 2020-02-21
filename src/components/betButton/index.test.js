import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import BetButton from './index';

describe('BetButton', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<BetButton />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('prefixCls null', () => {
    expect.assertions(1);
    const wrapper = render(<BetButton prefixCls={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('handleClick', () => {
    expect.assertions(1);
    const button = mount(<BetButton />);
    const clickCheckBtn = button.prop('clickBetBtn');
    const click = jest.fn(clickCheckBtn);
    button.simulate('click');
    expect(click()).toBe('clickBetBtn');
  });

  it('changeSp', () => {
    expect.assertions(2);
    const button = mount(<BetButton />);
    button.setProps({
      sp: 1.5,
    });
    const spUpFlag = button
      .children('div')
      .at(0)
      .children('span')
      .at(0)
      .hasClass('flickerSp');
    expect(1.5).toBe(button.prop('sp'));
    button.setProps({
      sp: 1.1,
    });
    const downFlag = button
      .children('div')
      .at(0)
      .children('span')
      .at(0)
      .hasClass('up');
    expect(1.1).toBe(button.prop('sp'));
  });

  it('changeHandicap', () => {
    expect.assertions(1);
    const button = mount(<BetButton />);
    button.setProps({
      handicap: 5.9,
    });
    expect(5.9).toBe(button.prop('handicap'));
  });

  it('disabledBtn', () => {
    expect.assertions(1);
    const button = render(<BetButton disabled={true} />);
    expect(toJson(button)).toMatchSnapshot();
  });

  it('hanclick-disabledBtn', () => {
    expect.assertions(2);
    const clickCheckBtn = () => 'clickBetBtn';
    const click = jest.fn(clickCheckBtn);
    const button = mount(<BetButton clickCheckBtn={click} disabled={!!1} />);
    button.simulate('click');
    expect(click).not.toHaveReturned();
    expect(click).not.toHaveReturnedWith('clickBetBtn');
  });
});
