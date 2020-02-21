import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import Carousel from './index';
// import moment from 'moment';
// import { getTimeFromCTSDateString } from '@/utils/getTimeFromCTSDateString';

describe('Horizontal', () => {
  const data = {
    item: () => <div>1213212</div>,
    data: [{ k: 1 }, { k: 2 }],
    id: '12311',
    numSrcoll: 0,
  };
  it('赛马场列表容器', () => {
    expect.assertions(1);
    const wrapper = render(<Carousel {...data} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('ontouch', () => {
    // expect.assertions(1);
    const wrapper = mount(<Carousel {...data} {...{ numSrcoll: 2 }} />);
    wrapper.setProps({
      numSrcoll: 3,
    });
    // expect(toJson(wrapper)).toMatchSnapshot();
  });
});
