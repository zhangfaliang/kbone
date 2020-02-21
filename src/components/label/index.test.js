import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import { Label, LabelCenter, LabelRight, LeftTitle } from './index';

describe('lable-component', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<Label />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('baseprefixClsNull', () => {
    expect.assertions(1);
    const wrapper = render(<Label prefixCls={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('baseShowTBBorderLable', () => {
    expect.assertions(1);
    const wrapper = mount(<Label showTBBorder={true} />);
    const clsFalg = wrapper
      .children('div')
      .at(0)
      .hasClass('showTBBorder');
    expect(clsFalg).toEqual(true);
  });
  it('renderLableChildran', () => {
    expect.assertions(1);
    const wrapper = render(
      <Label showTBBorder={true}>
        <LeftTitle />
        <LabelCenter />
        <LabelRight />
      </Label>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('clickLeftTitleText', () => {
    expect.assertions(1);

    const wrapper = mount(<Label />);
    const clickLeftTitleText = wrapper.prop('clickLeftTitleText');
    const click = jest.fn(clickLeftTitleText);
    wrapper.simulate('click');
    expect(click()).toBe('clickLeftTitleText');
  });
  it('defaultClickTitleText', () => {
    expect.assertions(1);

    const wrapper = mount(<Label />);
    const clickTitleText = wrapper.prop('clickTitleText');
    const click = jest.fn(clickTitleText);
    wrapper.simulate('click');
    expect(click()).toBe('clickTitleText');
  });

  it('defaultHandleRightIcon', () => {
    expect.assertions(1);

    const wrapper = mount(<Label />);
    const handleRightIcon = wrapper.prop('handleRightIcon');
    const click = jest.fn(handleRightIcon);
    wrapper.simulate('click');
    expect(click()).toBe('handleRightIcon');
  });
  it('baseRight', () => {
    expect.assertions(1);
    const wrapper = render(<LabelRight prefixCls={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('defaultHandleRightIconDisabled', () => {
    expect.assertions(1);
    const wrapper = mount(
      <LabelRight showIcon={true} disabled={false} defaultActiverightIcon={true} />
    );
    const clsFlag = wrapper
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .hasClass('activeIcon');
    expect(true).toBe(clsFlag);
  });

  it('rightText', () => {
    expect.assertions(1);
    const wrapper = mount(<LabelRight rightText="shiny" />);
    const text = wrapper
      .children('div')
      .at(0)
      .children('span')
      .at(0)
      .text();
    expect('shiny').toBe(text);
  });
  it('arrayText', () => {
    expect.assertions(1);
    const wrapper = mount(<LabelRight arrayText={['1', '2', '3']} />);
    const text = wrapper
      .children('div')
      .at(0)
      .children('span')
      .at(0)
      .text();
    expect('1').toBe(text);
  });
  it('changeStateRightText', () => {
    expect.assertions(1);
    const wrapper = mount(<LabelRight />);
    wrapper.setProps({
      activerightIcon: true,
    });
    expect(wrapper.state('activerightIcon')).toBe(wrapper.prop('activerightIcon'));
  });
  it('degaultHandleightIcon', () => {
    expect.assertions(1);
    const chandleClickIcon = () => 'chandleClickIcon';
    const wrapper = mount(<LabelRight disabled={false} showIcon={true} />);
    const handleRightIcon = wrapper.prop('handleRightIcon');
    const click = jest.fn(handleRightIcon);
    expect(click()).toBe('chandleClickIcon');
  });

  it('handleightIcon', () => {
    expect.assertions(1);
    const chandleClickIcon = () => 'chandleClickIcon';
    const click = jest.fn(chandleClickIcon);
    const wrapper = mount(<LabelRight handleRightIcon={click} disabled={false} showIcon={true} />);
    wrapper
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .simulate('click');
    expect(click).toHaveReturnedWith('chandleClickIcon');
  });

  it('disabledHandleightIcon', () => {
    const chandleClickIcon = () => 'chandleClickIcon';
    const wrapper = mount(<LabelRight disabled={true} showIcon={true} />);
    const rightIcon = wrapper
      .children('div')
      .at(0)
      .children('div')
      .at(0);
    rightIcon.simulate('click');
    expect(wrapper.prop('handleRightIcon')()).toBe('chandleClickIcon');
  });
  it('baseLeftTitleText', () => {
    expect.assertions(1);
    const wrapper = render(<LeftTitle prefixCls={null} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('defaultClickLeftTitleText', () => {
    expect.assertions(1);
    const wrapper = mount(<LeftTitle />);
    const clickLeftTitleText = jest.fn(wrapper.prop('clickLeftTitleText'));
    expect(clickLeftTitleText()).toBe(undefined);
  });

  it('ClickLeftTitleText', () => {
    expect.assertions(1);
    const clickLeftTitleText = () => 'clickLeftTitleText';
    const clickLeftTitleTextFn = jest.fn(clickLeftTitleText);
    const wrapper = mount(<LeftTitle clickLeftTitleText={clickLeftTitleTextFn} />);
    wrapper.simulate('click');
    expect(clickLeftTitleTextFn).toReturnWith('clickLeftTitleText');
  });
});
