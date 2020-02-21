import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import { Accordion, MatchDetailPanel, Panel } from './index';

describe('Accordion', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<Accordion accordion={true} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('base-accordion', () => {
    expect.assertions(1);
    const wrapper = render(<Accordion accordion={true} activeKeyId="" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('basePanel', () => {
    expect.assertions(1);
    const wrapper = render(
      <Accordion accordion={true}>
        <Panel />
      </Accordion>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('baseMatchDetailPanel', () => {
    expect.assertions(1);
    const wrapper = render(
      <Accordion>
        <MatchDetailPanel />
      </Accordion>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('defaulthandlePanel', () => {
    expect.assertions(1);
    const wrapper = mount(
      <Accordion accordion={true}>
        <Panel />
      </Accordion>
    );
    const handlePanel = wrapper.prop('handlePanel');
    const click = jest.fn(handlePanel);
    wrapper
      .find('Accordion')
      .find('Panel')
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handlePanel');
  });
  it('defaulthandlePanel-accordion', () => {
    expect.assertions(1);
    const wrapper = mount(
      <Accordion accordion={false}>
        <Panel />
      </Accordion>
    );
    const handlePanel = wrapper.prop('handlePanel');
    const click = jest.fn(handlePanel);
    wrapper
      .find('Accordion')
      .find('Panel')
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handlePanel');
  });
  it('defaulthandleStickIcon', () => {
    expect.assertions(1);
    const wrapper = mount(
      <Accordion accordion={true}>
        <MatchDetailPanel />
      </Accordion>
    );
    const handleStickIcon = wrapper.prop('handleStickIcon');
    const click = jest.fn(handleStickIcon);
    wrapper
      .find('Accordion')
      .find('MatchDetailPanel')
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .children('div')
      .at(1)
      .children('span')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handleStickIcon');
  });
  it('defaulthandleHelpIcon', () => {
    expect.assertions(1);
    const wrapper = mount(
      <Accordion accordion={true}>
        <MatchDetailPanel />
      </Accordion>
    );
    const handleHelpIcon = wrapper.prop('handleHelpIcon');
    const click = jest.fn(handleHelpIcon);
    wrapper
      .find('Accordion')
      .find('MatchDetailPanel')
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .children('span')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handleHelpIcon');
  });
});

describe('MatchDetailPanel', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<MatchDetailPanel />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('shouldComponentUpdate', () => {
    expect(3);
    const wrapper = mount(<MatchDetailPanel accordion={true} />);
    wrapper.setProps({
      activeKeyId: 'ff',
      activeStickKeyId: 'kk',
    });
    const showPanel = wrapper.state('showPanel');
    const isStick = wrapper.state('isStick');
    expect(false).toEqual(showPanel);
    expect(false).toEqual(isStick);
  });

  it('accordion-true', () => {
    expect.assertions(1);
    const wrapper = render(<MatchDetailPanel accordion={true} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('defaultHandlePanel', () => {
    expect.assertions(1);
    const wrapper = mount(<MatchDetailPanel accordion={true} />);
    const handlePanel = wrapper.prop('handlePanel');
    const click = jest.fn(handlePanel);
    wrapper
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handlePanel');
  });
  it('defaultHandlePanelshowPanel-true', () => {
    expect.assertions(1);
    const wrapper = mount(<MatchDetailPanel accordion={true} />);
    wrapper.setState({
      showPanel: false,
    });
    const handlePanel = wrapper.prop('handlePanel');

    const click = jest.fn(handlePanel);
    wrapper
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handlePanel');
  });
  it('defaultHandleStickIcon', () => {
    expect.assertions(1);
    const wrapper = mount(<MatchDetailPanel accordion={true} />);
    const handleStickIcon = wrapper.prop('handleStickIcon');
    const click = jest.fn(handleStickIcon);
    wrapper
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .children('div')
      .at(1)
      .children('span')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handleStickIcon');
  });
  it('defaultHandleHelpIcon', () => {
    expect.assertions(1);
    const wrapper = mount(<MatchDetailPanel accordion={true} />);
    const handleHelpIcon = wrapper.prop('handleHelpIcon');
    const click = jest.fn(handleHelpIcon);
    wrapper
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .children('span')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handleHelpIcon');
  });
});

describe('Panel', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<Panel />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('prefixClsNUll', () => {
    expect.assertions(1);
    const wrapper = render(<Panel prefixCls={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('prefixClsNUll', () => {
    expect.assertions(1);
    const wrapper = render(<Panel accordion={true} activeKeyId="ff" keyId="ff" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('defaultHandlePanel', () => {
    expect.assertions(1);
    const wrapper = mount(<Panel />);
    const handlePanel = wrapper.prop('handlePanel');
    const click = jest.fn(handlePanel);
    expect(click()).toBe('handlePanel');
  });
  it('handlePanel', () => {
    expect.assertions(1);
    const handlePanel = () => 'handlePanel';
    const click = jest.fn(handlePanel);
    const wrapper = mount(<Panel handlePanel={click} />);
    wrapper
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handlePanel');
  });
  it('defaultHandlePanelShowPanel-false', () => {
    expect.assertions(1);
    const wrapper = mount(<Panel accordion={true} />);
    const handlePanel = wrapper.prop('handlePanel');
    const click = jest.fn(handlePanel);
    wrapper
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handlePanel');
  });
  it('showPanel', () => {
    expect.assertions(1);
    const wrapper = mount(<Panel accordion={true} />);
    wrapper.setProps({
      activeKeyId: 'foodball',
    });
    const showPanel = wrapper.state('showPanel');
    expect(false).toEqual(showPanel);
  });
});
