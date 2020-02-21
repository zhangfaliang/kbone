import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import MatchCell from './index';
import moment from 'moment';

jest.useFakeTimers();
describe('CountDown', async () => {
  it('Button ', () => {
    expect.assertions(1);
    const wrapper = render(<MatchCell />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('leftcls  ture', () => {
    const wrapper = mount(<MatchCell leftcls={true} live={true} />);
    wrapper.find('div.left-name');
  });
});
