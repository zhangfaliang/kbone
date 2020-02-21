import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import { ChoosePlay, GamePlayModule, GameTypeList, LiveNum, MatchListTitle } from './index';
import { LeftTitle, LabelRight } from '../label';
describe('MatchListTitle', async () => {
  it('base', () => {
    expect.assertions(1);
    const wraapper = render(
      <MatchListTitle>
        <LiveNum />
        <ChoosePlay />
        <LeftTitle />
        <GamePlayModule />
        <LabelRight />
      </MatchListTitle>
    );
    expect(toJson(wraapper)).toMatchSnapshot();
  });
  it('prefixCls', () => {
    expect.assertions(1);
    const wraapper = render(<MatchListTitle prefixCls={null} />);
    expect(toJson(wraapper)).toMatchSnapshot();
  });

  it('handleChoose', () => {
    expect.assertions(1);
    const wraapper = mount(
      <MatchListTitle>
        <LiveNum />
        <ChoosePlay />
        <LeftTitle />
        <GamePlayModule />
        <LabelRight />
      </MatchListTitle>
    );
    const handleChoose = wraapper.prop('handleChoose');
    const click = jest.fn(handleChoose);
    wraapper
      .find('MatchListTitle')
      .children('div')
      .at(0)
      .find('ChoosePlay')
      .simulate('click');
    expect(click()).toBe('handleChoose');
  });

  it('handleChoose', () => {
    expect.assertions(1);
    const wraapper = mount(
      <MatchListTitle>
        <LiveNum />
        <ChoosePlay />
        <LeftTitle />
        <GamePlayModule />
        <LabelRight />
      </MatchListTitle>
    );
    const handleLive = wraapper.prop('handleLive');
    const click = jest.fn(handleLive);
    wraapper
      .find('MatchListTitle')
      .children('div')
      .at(0)
      .find('LiveNum')
      .simulate('click');
    expect(click()).toBe('handleLive');
  });
  it('handleItem', () => {
    expect.assertions(1);
    const wraapper = mount(
      <MatchListTitle>
        <GamePlayModule isOpen={true}>
          <GameTypeList
            gamePlays={[
              'Match Result',
              'Total Goals Asian',
              'Handicap',
              'Asian Handicap',
              'Double Chance',
              'Both Team to score',
            ]}
          />
        </GamePlayModule>
      </MatchListTitle>
    );
    const handleItem = wraapper.prop('handleItem');
    const click = jest.fn(handleItem);
    s;
    expect(click()).toBe('handleItem');
  });
  it('clickLeftTitleText', () => {
    expect.assertions(1);
    const wraapper = mount(
      <MatchListTitle>
        <LeftTitle leftText="wer46456456we" />
      </MatchListTitle>
    );
    const clickLeftTitleText = wraapper.prop('clickLeftTitleText');
    const click = jest.fn(clickLeftTitleText);
    wraapper
      .find('MatchListTitle')
      .children('div')
      .at(0)
      .find('LeftTitle')
      .children('div')
      .at(0)
      .simulate('click');

    expect(click()).toBe('clickLeftTitleText');
  });
});
describe('GamePlayModule', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<GamePlayModule />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(
      <GamePlayModule>
        <ChoosePlay />
      </GamePlayModule>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('prefixCls', () => {
    expect.assertions(1);
    const wrapper = render(<GamePlayModule prefixCls={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('shouldComponentUpdate', () => {
    expect.assertions(1);
    const wrapper = mount(<GamePlayModule prefixCls={null} isOpen={false} />);
    wrapper.setProps({
      isOpen: true,
    });
    expect(wrapper.state('isOpen')).toMatchSnapshot(true);
  });

  it('handleLayer', () => {
    expect.assertions(1);
    const wrapper = mount(
      <GamePlayModule prefixCls={null} isOpen={true}>
        <GameTypeList
          gamePlays={[
            'Match Result',
            'Total Goals Asian',
            'Handicap',
            'Asian Handicap',
            'Double Chance',
            'Both Team to score',
          ]}
        />
      </GamePlayModule>
    );
    const handleLayer = wrapper.prop('handleLayer');
    const click = jest.fn(handleLayer);
    wrapper
      .children('div')
      .at(0)
      .find('GameTypeList')
      .children('div')
      .at(0)
      .children('span')
      .at(0)
      .simulate('click');

    expect(click()).toBe('handleLayer');
  });
  it('handleItem', () => {
    expect.assertions(1);
    const wrapper = mount(<GamePlayModule prefixCls={null} isOpen={false} />);
    const handleItem = wrapper.prop('handleItem');
    const click = jest.fn(handleItem);
    wrapper.simulate('click');

    expect(click()).toBe('handleItem');
  });
});
describe('GameTypeList', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<GameTypeList />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('prefixCls null', () => {
    expect.assertions(1);
    const wrapper = render(<GameTypeList prefixCls={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('handleItem', () => {
    expect.assertions(1);
    const wrapper = mount(
      <GameTypeList
        gamePlays={[
          'Match Result',
          'Total Goals Asian',
          'Handicap',
          'Asian Handicap',
          'Double Chance',
          'Both Team to score',
        ]}
      />
    );
    const handleItem = wrapper.prop('handleItem');
    const click = jest.fn(handleItem);
    wrapper
      .children('div')
      .at(0)
      .children('span')
      .at(0)
      .simulate('click');
    expect(click()).toBe(undefined);
  });
});
describe('ChoosePlay', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<ChoosePlay />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('prefixCls', () => {
    expect.assertions(1);
    const wrapper = render(<ChoosePlay prefixCls={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('shouldComponentUpdate active', () => {
    expect.assertions(1);
    const wrapper = mount(<ChoosePlay active={false} prefixCls={null} />);
    wrapper.setProps({
      active: true,
    });
    expect(wrapper.state('activeFlag')).toBe(true);
  });
  it('handleChoose', () => {
    expect.assertions(1);
    const wrapper = mount(<ChoosePlay active={false} prefixCls={null} />);
    const handleChoose = wrapper.prop('handleChoose');
    const click = jest.fn(handleChoose);
    wrapper.simulate('click');
    expect(click()).toBe('handleChoose');
  });
});
describe('LiveNum', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<LiveNum />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('prefixCls null', () => {
    expect.assertions(1);
    const wrapper = render(<LiveNum prefixCls={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('handleLive ', () => {
    expect.assertions(1);
    const wrapper = mount(<LiveNum />);
    const handleLive = wrapper.prop('handleLive');
    const click = jest.fn(handleLive);
    wrapper.simulate('click');
    expect(click()).toBe(undefined);
  });
});
