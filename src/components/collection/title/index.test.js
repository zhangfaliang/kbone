import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import Title from './index';
import moment from 'moment';

jest.useFakeTimers();
describe('CountDown', async () => {
  it('Button ', () => {
    expect.assertions(1);
    const wrapper = render(<Title />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
