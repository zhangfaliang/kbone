import toJson from 'enzyme-to-json';
import { mount, render } from 'enzyme';
import BetMatchInfo from './index';

describe('BetMatchInfo', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<BetMatchInfo />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
