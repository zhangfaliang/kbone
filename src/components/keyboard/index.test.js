import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import Keyboard from './index';

describe('Keyboard', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<Keyboard defaultValue="" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('value-x', () => {
    expect.assertions(1);
    const wrapper = render(<Keyboard value="x" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('defaulthandleChange', () => {
    expect.assertions(1);
    const wrapper = mount(<Keyboard />);
    wrapper.setProps({ value: '7' });
    wrapper.setState({ value: '6' });

    expect('7').toBe(wrapper.prop('value'));
  });
  it('setValue0', () => {
    expect.assertions(1);
    const wrapper = mount(<Keyboard />);
    wrapper.setState({ value: '' });
    expect('').toBe(wrapper.state('value'));
  });
  it('defaulthandleChange0', () => {
    expect.assertions(1);
    const wrapper = mount(<Keyboard value="x" />);
    wrapper.setProps({ value: 'x' });
    wrapper.setState({ value: 'x' });

    expect('x').toBe(wrapper.prop('value'));
  });
  it('defaulthandleChange ', () => {
    expect.assertions(1);
    const wrapper = mount(<Keyboard />);
    wrapper.setProps({ value: '' });
    expect('').toBe(wrapper.prop('value'));
  });
  it('defaulthandleChange delete', () => {
    expect.assertions(1);
    const wrapper = mount(<Keyboard defaultValue="345" />);
    wrapper.setProps({ value: 'x' });
    wrapper
      .children('div')
      .at(0)
      .children('a')
      .at(11)
      .simulate('click');
    expect('x').toBe(wrapper.prop('value'));
  });
  it('defaulthandleChange value 0', () => {
    expect.assertions(1);
    const wrapper = mount(<Keyboard defaultValue="0" />);
    wrapper.setProps({ value: '0' });
    wrapper
      .children('div')
      .at(0)
      .children('a')
      .at(10)
      .simulate('click');
    expect('0').toBe(wrapper.prop('value'));
  });
  it('defaulthandleChange value 0', () => {
    expect.assertions(1);
    const wrapper = mount(<Keyboard defaultValue="1" />);
    wrapper.setProps({ value: '1' });
    wrapper
      .children('div')
      .at(0)
      .children('a')
      .at(2)
      .simulate('click');
    expect('1').toBe(wrapper.prop('value'));
  });
  it('defaulthandleClick', () => {
    expect.assertions(1);
    const handleChange = () => 'handleChange';
    const click = jest.fn(handleChange);
    const wrapper = mount(<Keyboard handleChange={click} />);
    wrapper.simulate('click');
    expect(click()).toBe('handleChange');
  });
  it('defaulthandleClickA', () => {
    expect.assertions(1);
    const handleChange = () => 'handleChange';
    const click = jest.fn(handleChange);
    const wrapper = mount(<Keyboard handleChange={click} />);
    wrapper
      .children('div')
      .at(0)
      .children('a')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handleChange');
  });
});
