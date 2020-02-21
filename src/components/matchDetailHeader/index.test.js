import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import MatchDetailHeater from './index';

describe('MatchDetailHeater', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<MatchDetailHeater />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('centerText', () => {
    expect.assertions(1);
    const wrapper = render(<MatchDetailHeater centerText="sdfjsd" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('shouldComponentUpdate activeRightIconName', () => {
    expect.assertions(1);
    const wrapper = mount(<MatchDetailHeater activeRightIconName={false} />);
    wrapper.setProps({
      activeRightIconName: true,
    });
    expect(wrapper.state('activeRightIconName')).toBe(true);
  });
  it('handleRightIcn-vs', () => {
    expect.assertions(1);
    const wrapper = mount(<MatchDetailHeater showVSIcon={true} />);
    const handelVSIcon = wrapper.prop('handelVSIcon');
    const click = jest.fn(handelVSIcon);
    wrapper
      .find('MatchDetailHeater')
      .children('div')
      .at(0)
      .children('div')
      .at(1)
      .children('span')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handelVSIcon');
  });
  it('handleRightIcn-HappeningIcon', () => {
    expect.assertions(1);
    const wrapper = mount(<MatchDetailHeater showVSIcon={true} showHappeningIcon={true} />);
    const handelHappeningIcon = wrapper.prop('handelHappeningIcon');
    const click = jest.fn(handelHappeningIcon);
    wrapper
      .find('MatchDetailHeater')
      .children('div')
      .at(0)
      .children('div')
      .at(1)
      .children('span')
      .at(1)
      .simulate('click');
    expect(click()).toBe('handelHappeningIcon');
  });
  it('handelBackIcon', () => {
    expect.assertions(1);
    const wrapper = mount(<MatchDetailHeater showVSIcon={true} showHappeningIcon={true} />);
    const handelBackIcon = wrapper.prop('handelBackIcon');
    const click = jest.fn(handelBackIcon);
    wrapper
      .find('MatchDetailHeater')
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .children('span')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handelBackIcon');
  });
});
