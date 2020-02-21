import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import Recommend from './index';

describe('recommend', async () => {
  let data = { title: 222, list: [], dataList: [] };
  it('Recommend', () => {
    expect.assertions(1);
    const wrapper = render(
      <Recommend
        data={data}
        keys={{ title: 'location', information: 'list' }}
        item={() => {}}
        src="11111"
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
