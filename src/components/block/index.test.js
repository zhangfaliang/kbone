import toJson from 'enzyme-to-json';
import { render } from 'enzyme';
import Block from './index';

describe('Block', async () => {
  it('base', () => {
    expect.assertions(1);
    const wrapper = render(<Block />);
    expect(toJson).toMatchSnapshot();
  });
});
