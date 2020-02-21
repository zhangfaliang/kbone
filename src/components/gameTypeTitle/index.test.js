import GameTypeTitle from '.';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
const baseketball = require('../../assets/game/index/basketball.png');
const baseketballActive = require('../../assets/game/index/basketballActive.png');
const soccer = require('../../assets/game/index/Soccer.png');
const soccerActive = require('../../assets/game/index/SoccerActive.png');

describe('Button组件', async () => {
  it('basic use', () => {
    expect.assertions(1);
    const wrapper = render(<GameTypeTitle prefixCls={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('checkShouldComponentUpdate', () => {
    expect.assertions(1);
    const gameTypeTitle = mount(<GameTypeTitle />);
    gameTypeTitle.setProps({
      activeKey: 'Basketball',
    });
    expect(gameTypeTitle.state('activeKey')).toBe(gameTypeTitle.prop('activeKey'));
  });

  it('clickDefaultCheckBtnGameTypeTitle', () => {
    expect.assertions(1);
    const gameTypeTitle = mount(<GameTypeTitle />);
    const handleGameType = gameTypeTitle.prop('handleGameType');
    const click = jest.fn(handleGameType);
    expect(click()).toBe('click');
  });

  it('clickCustomCheckBtnGameTypeTitle', () => {
    expect.assertions(1);
    const clickCheckBtn = () => 'clickCheckBtn';
    const click = jest.fn(clickCheckBtn);
    const gameTypeTitle = mount(<GameTypeTitle handleGameType={click} />);
    gameTypeTitle
      .find('GameTypeTitle')
      .at(0)
      .find('.items')
      .at(0)
      .simulate('click');
    expect(click).toHaveReturnedWith('clickCheckBtn');
  });
});
