import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import { BetInfo, BetInput, BetModule } from './index';
import Keyboard from '../keyboard';

describe('BetModule', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(
      <BetModule>
        <BetInfo />
        <BetInput />
        <Keyboard />
      </BetModule>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('handleCloseKeyboard', () => {
    expect.assertions(1);
    const wrapper = mount(
      <BetModule maskClosable={true}>
        <BetInfo />
        <BetInput />
        <Keyboard />
      </BetModule>
    );
    const handleKeyboardChange = wrapper.prop('handleKeyboardChange');
    const click = jest.fn(handleKeyboardChange);

    wrapper.simulate('click');
    expect(click()).toBe('handleKeyboardChange');
  });

  it('shouldComponentUpdate --isShow', () => {
    expect.assertions(1);
    const wrapper = mount(<BetModule isShow={false} />);
    wrapper.setProps({
      isShow: true,
    });
    expect(true).toBe(wrapper.state('isShowBetModule'));
  });

  it('handelFocusInput', () => {
    expect.assertions(1);
    const wrapper = mount(
      <BetModule isShow={true}>
        <BetInfo />
        <BetInput />
        <Keyboard />
      </BetModule>
    );
    const focusInput = wrapper.prop('focusInput');
    const click = jest.fn(focusInput);

    wrapper
      .find('BetModule')
      .find('BetInput')
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .simulate('click');
    expect(click()).toBe('focusInput');
  });
  it('handleBet', () => {
    expect.assertions(2);
    const wrapper = mount(
      <BetModule allAmount="1000" fillAmount="100" isShow={true}>
        <BetInput />
      </BetModule>
    );
    const handleBet = wrapper.prop('handleBet');
    const betClick = jest.fn(handleBet);
    const handleCloseBetModule = wrapper.prop('handleCloseBetModule');
    const closeBetModule = jest.fn(handleCloseBetModule);
    wrapper
      .find('BetModule')
      .find('BetInput')
      .children('div')
      .at(0)
      .find('Button')
      .at(1)
      .simulate('click');
    expect(betClick()).toBe('handleBet');
    expect(closeBetModule()).toBe('handleCloseBetModule');
  });
  it('handleCloseBetModule', () => {
    expect.assertions(1);
    const wrapper = mount(
      <BetModule isShow={true}>
        <BetInfo />
        <BetInput />
        <Keyboard />
      </BetModule>
    );
    const handleCloseBetModule = wrapper.prop('handleCloseBetModule');
    const click = jest.fn(handleCloseBetModule);

    wrapper
      .find('BetModule')
      .find('BetInfo')
      .children('div')
      .at(0)
      .children('div')
      .at(1)
      .simulate('click');
    expect(click()).toBe('handleCloseBetModule');
  });

  it('handleFillIn', () => {
    expect.assertions(1);
    const wrapper = mount(
      <BetModule allAmount="1000" fillAmount="100" isShow={true}>
        <BetInput />
      </BetModule>
    );
    const handleCloseBetModule = wrapper.prop('handleCloseBetModule');
    const click = jest.fn(handleCloseBetModule);

    wrapper
      .find('BetModule')
      .find('BetInput')
      .children('div')
      .at(0)
      .find('Button')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handleCloseBetModule');
  });
  it('handleAllIn', () => {
    expect.assertions(1);
    const wrapper = mount(
      <BetModule allAmount="100" fillAmount="1000" isShow={true}>
        <BetInput />
      </BetModule>
    );
    const handleCloseBetModule = wrapper.prop('handleCloseBetModule');
    const click = jest.fn(handleCloseBetModule);

    wrapper
      .find('BetModule')
      .find('BetInput')
      .children('div')
      .at(0)
      .find('Button')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handleCloseBetModule');
  });
  it('handleAllIn .', () => {
    expect.assertions(1);
    const wrapper = mount(
      <BetModule allAmount="100.45" fillAmount="1000" isShow={true}>
        <BetInput />
      </BetModule>
    );
    const handleCloseBetModule = wrapper.prop('handleCloseBetModule');
    const click = jest.fn(handleCloseBetModule);

    wrapper
      .find('BetModule')
      .find('BetInput')
      .children('div')
      .at(0)
      .find('Button')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handleCloseBetModule');
  });
});

describe('BetInput', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<BetInput />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('handleFillIn', () => {
    expect.assertions(1);
    const wrapper = mount(<BetInput allAmount="1000" fillAmount="100" />);
    const handleFillIn = wrapper.prop('handleFillIn');
    const click = jest.fn(handleFillIn);
    wrapper.simulate('click');
    wrapper
      .children('div')
      .at(0)
      .children('div')
      .at(1)
      .simulate('click');
    wrapper
      .children('div')
      .at(0)
      .children('div')
      .at(1)
      .find('Button')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handleFillIn');
  });

  it('handleAllIn', () => {
    expect.assertions(1);
    const wrapper = mount(<BetInput allAmount="10" fillAmount="100" />);
    const handleAllIn = wrapper.prop('handleAllIn');
    const click = jest.fn(handleAllIn);

    wrapper
      .children('div')
      .at(0)
      .find('Button')
      .at(0)
      .simulate('click');
    expect(click()).toBe('handleAllIn');
  });

  it('betInfo', () => {
    expect.assertions(1);
    const wrapper = mount(<BetInput allAmount="10" fillAmount="100" />);
    const handleBet = wrapper.prop('handleBet');
    const click = jest.fn(handleBet);

    wrapper
      .children('div')
      .at(0)
      .find('Button')
      .at(1)
      .simulate('click');
    expect(click()).toBe('handleBet');
  });

  it('handleInputChange', () => {
    expect.assertions(1);
    const wrapper = mount(<BetInput allAmount="10" fillAmount="100" />);
    const handleInputChange = wrapper.prop('handleInputChange');
    const click = jest.fn(handleInputChange);
    expect(click()).toBe('handleInputChange');
  });
  it('handleFocusInput', () => {
    expect.assertions(1);
    const wrapper = mount(<BetInput allAmount="100" fillAmount="10000" />);
    const focusInput = wrapper.prop('focusInput');
    const click = jest.fn(focusInput);
    wrapper
      .find('BetInput')
      .children('div')
      .at(0)
      .children('div')
      .at(0)
      .simulate('click');
    expect(click()).toBe('focusInput');
  });
});

describe('BetInfo', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<BetInfo />);
    expect(toString(wrapper)).toMatchSnapshot();
  });

  it('handeldeleteclick', () => {
    expect.assertions(1);
    const wrapper = mount(<BetInfo />);
    wrapper.find('BetInfo').simulate('click');
    const handleDelete = wrapper.prop('handleDelete');
    const click = jest.fn(handleDelete);
    wrapper
      .find('BetInfo')
      .children('div')
      .at(0)
      .children('div')
      .at(1)
      .simulate('click');
    expect(click()).toBe('handleDelete');
  });
  it('shouldComponentUpdate sp', () => {
    expect.assertions(2);
    const wrapper = mount(
      <BetInfo matchId="567" playId="4564" defaultChangeSp={false} defaultChangeHandicap={false} />
    );
    wrapper.setProps({
      sp: 1.56,
      handicap: 8,
      matchId: 'werwe',
      playId: 'werwer',
      optionId: 'werwerwer',
    });
    const isChangeSp = wrapper.state('isChangeSp');
    const isChangeHandicap = wrapper.state('isChangeHandicap');
    expect(false).toBe(isChangeSp);
    expect(false).toBe(isChangeHandicap);
  });
  it('shouldComponentUpdate sp', () => {
    expect.assertions(2);
    const wrapper = mount(<BetInfo sp={1.3} handicap={4} />);
    wrapper.setProps({
      sp: 1.56,
      handicap: 8,
    });
    const isChangeSp = wrapper.state('isChangeSp');
    const isChangeHandicap = wrapper.state('isChangeHandicap');
    expect(true).toBe(isChangeSp);
    expect(true).toBe(isChangeHandicap);
  });
});
