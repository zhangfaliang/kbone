import { OrderCard, OrderLabelCard, OrderFilter } from '.';
import { render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

const Panel = OrderFilter.Panel;
const Card = OrderLabelCard.Card;
const Item = OrderCard.Item;

describe('order组件', async () => {
  it('OrderLabelCard', () => {
    const wrapper = render(
      <OrderLabelCard label={'Royal Pari FC 2.8'}>
        <Card>
          <Item extra={122} size="small">
            order:222
          </Item>
          <Item extra={122} size="small">
            order:222
          </Item>
          <Item size="small">order:222</Item>
        </Card>
        <Card>
          <Item extra={122} size="small">
            order:222
          </Item>
        </Card>
      </OrderLabelCard>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('OrderCard', () => {
    const wrapper = render(
      <OrderCard label="Order information">
        <Item extra={'match'}>Royal Pari FC VS Nacional Potosi</Item>
        <Item extra={'Match Result'}>Market</Item>
      </OrderCard>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('OrderFilterRender', () => {
    const wrapper = render(
      <OrderFilter defaultActiveKey={['0', '2']}>
        <Panel body={[{ name: 'Last 24 Hrs' }, { name: 'Last 48 Hrs' }, { name: 'Last 6 Mths' }]} />
        <Panel body={[{ name: 'All' }, { name: 'Settled' }, { name: 'Unsettled' }]} />
      </OrderFilter>
    );
    expect(toJson(wrapper));
  });

  it('click', () => {
    const wrapper = mount(
      <OrderFilter defaultActiveKey={['0', '2']}>
        <Panel body={[{ name: 'Last 24 Hrs' }, { name: 'Last 48 Hrs' }, { name: 'Last 6 Mths' }]} />
        <Panel body={[{ name: 'All' }, { name: 'Settled' }, { name: 'Unsettled' }]} />
      </OrderFilter>
    );
    wrapper
      .find('#orderFilterTap')
      .at(0)
      .find('span')
      .simulate('click');
    wrapper
      .find('#orderFilterTap')
      .at(1)
      .find('span')
      .simulate('click');
    expect(
      wrapper
        .find('#orderFilterTap')
        .at(0)
        .find('span')
        .hasClass('hight')
    ).toEqual(true);
  });

  it('onChange', () => {
    const wrapper = mount(
      <OrderFilter defaultActiveKey={['0', '2']}>
        <Panel body={[{ name: 'Last 24 Hrs' }, { name: 'Last 48 Hrs' }, { name: 'Last 6 Mths' }]} />
        <Panel body={[{ name: 'All' }, { name: 'Settled' }, { name: 'Unsettled' }]} />
      </OrderFilter>
    );
    wrapper
      .find('#orderFilterTap')
      .at(0)
      .find('span')
      .simulate('click');
    wrapper
      .find('OrderFilter')
      .at(0)
      .find('.body')
      .find('.orderFilterActiveTap')
      .at(0)
      .simulate('click');
    expect(
      wrapper
        .find('OrderFilter')
        .at(0)
        .find('.body')
        .find('.orderFilterActiveTap')
        .at(0)
        .text()
    ).toEqual('Last 24 Hrs');
  });
});
