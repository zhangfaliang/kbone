import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Category } from '.';
import { dataSets, badDataSets } from '../../fakeData/category';

describe('Category', () => {
  it('empty', () => {
    const wrapper = render(<Category />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('with normal dataSets', () => {
    const wrapper = render(<Category dataSets={dataSets} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('badDataSets', () => {
    expect(() => {
      render(<Category dataSets={badDataSets} />);
    }).toThrow();
  });
});
