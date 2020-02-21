import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import ForeCastOrTriCast from './ForeCastOrTriCast';
import HistoricalRecord from './HistoricalRecord';
import HorseImg from './HorseImg';
import HorseName from './HorseName';
import HorseNum from './HorseNum';
import HorseTrackNum from './HorseTrackNum';
import SingleHorseInfo from './SingleHorseInfo';
import SingleSpInfo from './SingleSpInfo';

describe('测试 horseRaceInfo', async () => {
  it('ForeCastOrTriCast', () => {
    const wrapper = render(<ForeCastOrTriCast horseCode="wer" shortName="wer" prefixCls=" " />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('HistoricalRecord', () => {
    const wrapper = render(<HistoricalRecord />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('HorseImg', () => {
    const wrapper = render(<HorseImg />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('HorseImg', () => {
    const wrapper = mount(<HorseImg imgUrl="234" />);
    wrapper.setProps({
      imgUrl: '23',
    });
    wrapper.setState({
      imgUrl: '23',
    });
    expect('23').toBe(wrapper.prop('imgUrl'));
  });
  it('HorseImg', () => {
    const wrapper = mount(<HorseImg imgUrl="23" />);
    wrapper.setProps({
      imgUrl: '23',
    });
    expect('23').toBe(wrapper.prop('imgUrl'));
  });
  it('HorseName', () => {
    const wrapper = render(<HorseName />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('HorseNum', () => {
    const wrapper = render(<HorseNum />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('HorseTrackNum', () => {
    const wrapper = render(<HorseTrackNum horseTrack="wer" prefixCls="single1" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('SingleHorseInfo', () => {
    const wrapper = render(<SingleHorseInfo />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('SingleSpInfo', () => {
    const wrapper = render(<SingleSpInfo />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
