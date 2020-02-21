import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import FinishLabel from './FinishLabel';
import NoRunners from './NoRunners';
import Ranking from './Ranking';

describe('测试 horseRaceDetailFinishLabel', async () => {
  it('FinishLabel', () => {
    expect.assertions(1);
    const wrapper = render(
      <FinishLabel rankingText="werr" picUrl="werwer" rankNum="1" favText="wer" noEntry="werwe" />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  }),
    it('NoRunners', () => {
      expect.assertions(1);
      const wrapper = render(<NoRunners />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  it('Ranking', () => {
    expect.assertions(1);
    const wrapper = render(<Ranking />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
