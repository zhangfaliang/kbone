import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';

import BetMatchInfo from '../betMatchInfo';
import BetButtonCell from '../betButtonCell';
import ProgressText from './ProgressText';
import BetMatchCell from './BetMatchCell';
import BetButton from '../betButton';
import Line from '../line';
describe('betMatchCell', async () => {
  it(' toJson ProgressText', () => {
    const wrapper = render(
      <BetMatchCell
        matchTime={'werwer'}
        prefixCls={'push-inplay'}
        clickBetBtn={() => {
          console.log('test12');
        }}
      >
        <BetMatchInfo
          homeName={'678'}
          homeScore={34}
          awayName={'34'}
          awayScore={34}
          isLive={true}
          isShowScore={true}
          liveText="LIVE"
          time={'werwerwer'}
          clickBetMatchInfo={() => {
            this.goToMatchDetail({ sportType, matchId });
          }}
        />

        <ProgressText text={'ewrwe'} stringInTime={'werwer'} />
      </BetMatchCell>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it(' toJson  BetButtonCell ', () => {
    const wrapper = render(
      <BetMatchCell
        matchTime={'werwer'}
        prefixCls={'push-inplay'}
        clickBetBtn={() => {
          console.log('test12');
        }}
      >
        <BetMatchInfo
          homeName={'678'}
          homeScore={34}
          awayName={'34'}
          awayScore={34}
          isLive={true}
          isShowScore={true}
          liveText="LIVE"
          time={'werwerwer'}
          clickBetMatchInfo={() => {
            this.goToMatchDetail({ sportType, matchId });
          }}
        />

        <BetButtonCell
          prefixCls={'push-inplay'}
          homeName={'wer'}
          awayName={'werwer'}
          playtypeName={'werwer'}
          playtypeCode={'werwer'}
          matchId={'werwrwer'}
          sportType={'ewrwer'}
          handicapType={true}
          leagueName={'werwer'}
          matchName={'ewrwer'}
          matchType={'werwer'}
          sportName={'wer'}
          period={1}
          passType={'werewr'}
        >
          <BetButton betHandicap={'-1'} isSelected={true} optionName={'32423'} isDetail={false} />
          <Line />
        </BetButtonCell>
      </BetMatchCell>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it(' toJson ProgressText click', () => {
    const wrapper = mount(
      <BetMatchCell
        matchTime={'werwer'}
        prefixCls={'push-inplay'}
        clickBetBtn={() => {
          console.log('test12');
        }}
      >
        <BetMatchInfo
          homeName={'678'}
          homeScore={34}
          awayName={'34'}
          awayScore={34}
          isLive={true}
          isShowScore={true}
          liveText="LIVE"
          time={'werwerwer'}
          clickBetMatchInfo={() => {
            this.goToMatchDetail({ sportType, matchId });
          }}
        />

        <ProgressText text={'ewrwe'} stringInTime={'werwer'} />
      </BetMatchCell>
    );
    wrapper.find('ProgressText').simulate('click');
  });

  it(' toJson  BetButtonCell click ', () => {
    const wrapper = mount(
      <BetMatchCell>
        <BetMatchInfo />

        <BetButtonCell>
          <BetButton />
          <Line />
        </BetButtonCell>
      </BetMatchCell>
    );
    wrapper
      .find('BetButtonCell')
      .find('BetButton')
      .simulate('click');
  });
});
