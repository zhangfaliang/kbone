import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import OtherMatch from './index';
import { Label } from '../label';
describe('OtherMatch', async () => {
  it('base', () => {
    const warpper = render(<OtherMatch />);
    expect(toJson(warpper)).toMatchSnapshot();
  });
  it('basePrefixNull', () => {
    const warpper = render(<OtherMatch prefixCls={null} />);
    expect(toJson(warpper)).toMatchSnapshot();
  });
  it('clickLeftTitleText', () => {
    expect.assertions(2);
    const warpper = mount(<OtherMatch />);
    const clickLeftTitleText = warpper.prop('clickLeftTitleText');
    const clickTitleText = warpper.prop('clickTitleText');
    const clickLeftTitleTextFn = jest.fn(clickLeftTitleText);
    expect(clickLeftTitleTextFn()).toBe('clickLeftTitleText');
    const clickTitleTextFn = jest.fn(clickTitleText);
    expect(clickTitleTextFn()).toBe('clickTitleText');
  });

  it('clickLeftTitleText1', () => {
    expect.assertions(1);
    const warpper = render(
      <OtherMatch>
        <Label />
        <Label />
      </OtherMatch>
    );

    expect(toJson(warpper)).toMatchSnapshot();
  });
});
