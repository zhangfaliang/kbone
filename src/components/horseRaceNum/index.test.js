import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import HorseRaceNum from './index';

describe('HorseRaceNum', async () => {
  expect.assertions(1);
  it('base', () => {
    const wrapper = render(
      <HorseRaceNum raceList={[1, 2, 3, 4]} activeKey={8} prefixCls="default" />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('onClickRaceNum', () => {
    expect.assertions(1);
    const wrapper = mount(
      <HorseRaceNum raceList={[1, 2, 3, 4]} activeKey={1} prefixCls="default" />
    );
    const onClickRaceNum = wrapper.prop('onClickRaceNum');
    const click = jest.fn(onClickRaceNum);
    wrapper.simulate('click');
    expect(click()).toBe('onClickRaceNum');
  });
  it('set activeKey', () => {
    expect.assertions(1);
    const wrapper = mount(
      <HorseRaceNum raceList={[1, 2, 3, 4]} activeKey={1} prefixCls="default" />
    );
    wrapper.setProps({ activeKey: 8 });
    expect(8).toBe(wrapper.prop('activeKey'));
  });
  it('set activeKey 5', () => {
    expect.assertions(1);
    const wrapper = mount(
      <HorseRaceNum
        raceList={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
        activeKey={1}
        prefixCls="default"
      />
    );
    wrapper.setProps({ activeKey: 11 });
    expect(11).toBe(wrapper.prop('activeKey'));
  });
  it('set null', () => {
    expect.assertions(1);
    const wrapper = mount(
      <HorseRaceNum raceList={[1, 2, 3, 4]} activeKey={1} prefixCls="default" />
    );
    wrapper.setProps({ activeKey: '' });
    expect('').toBe(wrapper.prop('activeKey'));
  });
  it('onClickRaceNum', () => {
    expect.assertions(1);
    const onClickRaceNum = () => 'onClickRaceNum';
    const click = jest.fn(onClickRaceNum);
    const wrapper = mount(
      <HorseRaceNum
        onClickRaceNum={click}
        raceList={[1, 2, 3, 4]}
        activeKey={1}
        prefixCls="default"
      />
    );

    wrapper
      .children('div')
      .at(0)
      .children('span')
      .at(0)
      .simulate('click');
    expect(click()).toBe('onClickRaceNum');
  });
});
