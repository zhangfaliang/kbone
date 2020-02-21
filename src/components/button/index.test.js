import Button from '.';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Button组件', async () => {
  it('basic use', () => {
    expect.assertions(1);
    const wrapper = render(<Button prefixCls={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('withPropsDefaultActive', () => {
    expect.assertions(1);
    const wrapper = render(<Button defaultActive={!!1} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('withPropsDisabled', () => {
    expect.assertions(1);
    const wrapper = render(<Button disabled={!!1} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('withPropsActive', () => {
    expect.assertions(1);
    const wrapper = render(<Button active={!!1} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('withPropsPrefixCls', () => {
    const wrapper = render(<Button prefixCls="prefixCls" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('withPropsPrefixClsNull', () => {
    expect.assertions(1);
    const wrapper = render(<Button prefixCls={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('withPropsBtnText', () => {
    expect.assertions(1);
    const wrapper = render(<Button btnText="btnText" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('withPropsClickCheckBtn', () => {
    expect.assertions(1);
    const clickCheckBtn = () => 'clickCheckBtn';
    const wrapper = render(<Button clickCheckBtn={clickCheckBtn} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('checkShouldComponentUpdate', () => {
    expect.assertions(1);
    const button = mount(<Button />);
    button.setProps({
      active: !!1,
    });
    expect(button.state('activeFlag')).toBe(button.prop('active'));
  });

  it('clickDefaultCheckBtnButton', () => {
    expect.assertions(1);
    const button = mount(<Button />);
    const clickCheckBtn = button.prop('clickCheckBtn');
    const click = jest.fn(clickCheckBtn);

    button.simulate('click');
    expect(click()).toBe('click');
  });

  it('clickCustomCheckBtnButton', () => {
    expect.assertions(1);
    const clickCheckBtn = () => 'clickCheckBtn';
    const click = jest.fn(clickCheckBtn);
    const button = mount(<Button clickCheckBtn={click} />);
    button.simulate('click');
    expect(click).toHaveReturnedWith('clickCheckBtn');
  });

  it('withPropsDisabledAndClickButton', () => {
    expect.assertions(2);
    const clickCheckBtn = () => 'clickCheckBtn';
    const click = jest.fn(clickCheckBtn);
    const button = mount(<Button clickCheckBtn={click} disabled={!!1} />);
    button.simulate('click');
    expect(click).not.toHaveReturned();
    expect(click).not.toHaveReturnedWith('clickCheckBtn');
  });
});
