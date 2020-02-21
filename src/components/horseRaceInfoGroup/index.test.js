import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import HorseRaceInfoGroup from './HorseRaceInfoGroup';
import Title from './title';
import HorseRaceInfoGroupTitle from './title';
import HorseRaceInfoCell from '../../components/horseRaceInfoCell';
import { NoRunners, FinishLabel, Ranking } from '../horseRaceDetailFinishLabel';
import HorseRaceBetButton from '../horseRaceBetButton';
import {
  SingleHorseInfo,
  ForeCastOrTriCast,
  SPInfo,
  HorseImg,
  HorseName,
  HorseNum,
} from '../../components/horseRaceInfo';
import HorseRaceBetButtonCell from '../horseRaceBetButtonCell';

describe('HorseRaceInfoGroup', async () => {
  it('HorseRaceInfoGroup', () => {
    const wrapper = render(
      <HorseRaceInfoGroup>
        <HorseRaceInfoGroupTitle showEmpty />
        <HorseRaceInfoCell>
          <SingleHorseInfo />
          <ForeCastOrTriCast />
          <SPInfo />
          <HorseRaceBetButtonCell>
            <HorseRaceBetButton showBetText isHide={false} historySp={[1, 3]} />
          </HorseRaceBetButtonCell>
          <FinishLabel>
            <HorseImg />
            <HorseName />
            <HorseNum />
            <Ranking />
          </FinishLabel>
        </HorseRaceInfoCell>
        <NoRunners noRunners={[1, 2, 3]} />
      </HorseRaceInfoGroup>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('Title', () => {
    const wrapper = render(<Title />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('HorseRaceInfoGroup', () => {
    const wrapper = mount(
      <HorseRaceInfoGroup>
        <HorseRaceInfoGroupTitle showEmpty />
        <HorseRaceInfoCell>
          <SingleHorseInfo />
          <ForeCastOrTriCast />
          <SPInfo />
          <HorseRaceBetButtonCell>
            <HorseRaceBetButton showBetText isHide={false} historySp={[1, 3]} />
          </HorseRaceBetButtonCell>
          <FinishLabel>
            <HorseImg />
            <HorseName />
            <HorseNum />
            <Ranking />
          </FinishLabel>
        </HorseRaceInfoCell>
        <NoRunners noRunners={[1, 2, 3]} />
      </HorseRaceInfoGroup>
    );
    const selectBetBtn = wrapper.prop('selectBetBtn');
    const click = jest.fn(selectBetBtn);
    const app = wrapper
      .find('HorseRaceInfoCell')
      .find('HorseRaceBetButtonCell')
      .find('HorseRaceBetButton')
      .simulate('click');
    expect(click()).toBe(undefined);
  });
});
