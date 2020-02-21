import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import HorseRaceInfoCell from './index';
import {
  SingleHorseInfo,
  ForeCastOrTriCast,
  SPInfo,
  HorseImg,
  HorseName,
  HorseNum,
} from '../horseRaceInfo';
import HorseRaceBetButtonCell from '../horseRaceBetButtonCell';
import { FinishLabel, Ranking } from '../horseRaceDetailFinishLabel';
import HorseRaceBetButton from '../horseRaceBetButton';

describe('horseRaceInfoCell', async () => {
  it('HorseRaceInfoCell', () => {
    const wrapper = render(<HorseRaceInfoCell />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('HorseRaceInfoCell', () => {
    const wrapper = render(
      <HorseRaceInfoCell>
        <SingleHorseInfo />
        <ForeCastOrTriCast />
        <SPInfo />
        <HorseRaceBetButtonCell>
          <HorseRaceBetButton />
        </HorseRaceBetButtonCell>
        <FinishLabel>
          <HorseImg />
          <HorseName />
          <HorseNum />
          <Ranking />
        </FinishLabel>
      </HorseRaceInfoCell>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('HorseRaceInfoCell onClickBack', () => {
    const wrapper = mount(
      <HorseRaceInfoCell>
        <SingleHorseInfo />
        <ForeCastOrTriCast />
        <SPInfo />
        <HorseRaceBetButtonCell>
          <HorseRaceBetButton />
        </HorseRaceBetButtonCell>
        <FinishLabel />
      </HorseRaceInfoCell>
    );

    const selectBetBtn = wrapper.prop('onClickBack');
    const click = jest.fn(selectBetBtn);
    wrapper
      .find('HorseRaceBetButtonCell')
      .find('HorseRaceBetButton')
      .simulate('click');
    expect(click()).toBe(undefined);
  });

  it('HorseRaceInfoCell onClickBack', () => {
    const wrapper = mount(
      <HorseRaceInfoCell>
        <SingleHorseInfo />
        <ForeCastOrTriCast />
        <SPInfo />
        <HorseRaceBetButtonCell>
          <HorseRaceBetButton showBetText isHide={false} historySp={[1, 3]} />
        </HorseRaceBetButtonCell>
        <FinishLabel />
      </HorseRaceInfoCell>
    );

    const selectBetBtn = wrapper
      .find('HorseRaceBetButtonCell')
      .find('HorseRaceBetButton')
      .prop('selectBetBtn');
    const click = jest.fn(selectBetBtn);
    wrapper
      .find('HorseRaceBetButtonCell')
      .find('HorseRaceBetButton')
      .simulate('click');
    expect(click()).toBe(undefined);
  });

  it('HorseRaceInfoCell onClickBack', () => {
    const wrapper = mount(
      <HorseRaceInfoCell>
        <SingleHorseInfo />
        <ForeCastOrTriCast />
        <SPInfo />
        <HorseRaceBetButtonCell>
          <HorseRaceBetButton showBetText isHide={false} historySp={[1, 3]} />
        </HorseRaceBetButtonCell>
        <FinishLabel />
      </HorseRaceInfoCell>
    );

    const selectBetBtn = wrapper
      .find('HorseRaceBetButtonCell')
      .find('HorseRaceBetButton')
      .prop('selectBetBtn');
    const click = jest.fn(selectBetBtn);
    wrapper
      .find('HorseRaceBetButtonCell')
      .find('HorseRaceBetButton')
      .simulate('click');
    expect(click()).toBe(undefined);
  });
});
