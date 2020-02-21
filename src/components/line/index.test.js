import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import Line from './index';

describe('Line', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<Line />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('prefixClsNull', () => {
    expect.assertions(1);
    const wrapper = render(<Line prefixCls={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
