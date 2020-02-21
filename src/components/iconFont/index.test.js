import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import IconFont from './index';

describe('IconFont', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<IconFont prefixCls={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
