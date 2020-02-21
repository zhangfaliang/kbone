import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import RacingTable from './index';

describe('racingTable', async () => {
  let data = { title: 222, list: [], dataList: [] };
  it('racingTable', () => {
    expect.assertions(1);
    const wrapper = render(
      <RacingTable data={data} keys={{ title: 'location', information: 'list' }} item={() => {}} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
