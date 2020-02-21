import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import Button from './index';
import moment from 'moment';

jest.useFakeTimers();
describe('CountDown', async () => {
  it('Button ', () => {
    expect.assertions(1);
    const wrapper = render(<Button />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('点击事件 click', () => {
    const wrapper = mount(<Button />);
    wrapper.find('div.default-button').simulate('click');
  });
});
