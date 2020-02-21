import toJson from 'enzyme-to-json';
import { render, mount } from 'enzyme';
import { LeftTitle, Label, LabelRight, LabelCenter, LeftInPlay, HorseLabel } from '../label';
import ResultImg from '../order/orderCard/ResultImg';
import { BetMatchCell } from '../betMatchCell';
import BeforeMatchCellGroup from '../beforeMatchCellGroup';
import BetMatchInfo from '../betMatchInfo';
import BetMatchGroup from './index';
import BetButtonCell from '../betButtonCell';
import BetButton from '../betButton';
import Line from '../line';
import Button from '../button';
import { ProgressText } from '../betMatchCell';

describe('betMatchGroup test', async () => {
  it('toJson', () => {
    const wrapper = render(
      <BetMatchGroup>
        <Label>
          <LeftTitle />
          <LabelRight activerightIcon activerightIcon />
          <ResultImg resultImgSrc />
        </Label>

        <BetMatchCell>
          <BetMatchInfo />

          <BetButtonCell>
            <BetButton />
            <Line />
          </BetButtonCell>
        </BetMatchCell>
      </BetMatchGroup>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('HorseLabel', () => {
    const wrapper = render(
      <HorseLabel
        matchTime="2020-03-06 18:30:00'"
        isCountDown
        labels={[{ labelText: '23', isCountDown: true, isBtn: true }]}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('toJson BeforeMatchCellGroup', () => {
    const wrapper = render(
      <BetMatchGroup>
        <Label showTBBorder={true}>
          <LeftTitle />
        </Label>

        <BeforeMatchCellGroup>
          <Label prefixCls="push-before" showTBBorder={false}>
            <LeftTitle gameTypeImgShow={false} prefixCls="push-before" />
            <LabelRight prefixCls="push-before" />
          </Label>

          <BetMatchCell>
            <BetMatchInfo />

            <BetButtonCell>
              <BetButton />
            </BetButtonCell>
          </BetMatchCell>
        </BeforeMatchCellGroup>
      </BetMatchGroup>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it(' BeforeMatchCellGroup', () => {
    const wrapper = mount(
      <BetMatchGroup>
        <Label showTBBorder={true}>
          <LeftTitle />
          <LeftTitle />
          <LabelCenter />
          <LabelRight arrayText={['1', '3']} showIcon rightText />
          <LeftInPlay />
        </Label>

        <BeforeMatchCellGroup>
          <Label prefixCls="push-before" showTBBorder={false}>
            <LeftTitle gameTypeImgShow={false} prefixCls="push-before" />
            <LabelRight prefixCls="push-before" />
          </Label>

          <BetMatchCell>
            <BetMatchInfo />

            <BetButtonCell>
              <BetButton />
            </BetButtonCell>
          </BetMatchCell>
        </BeforeMatchCellGroup>
        <Button />
      </BetMatchGroup>
    );
    wrapper
      .find('BeforeMatchCellGroup')
      .find('BetMatchCell')
      .find('BetButtonCell')
      .find('BetButton')
      .simulate('click');
    wrapper.find('Button').simulate('click');
  });

  it(' BeforeMatchCellGroup LeftTitle', () => {
    const wrapper = mount(
      <BetMatchGroup>
        <Label showTBBorder={true}>
          <LeftTitle />
          <LabelCenter />
          <LabelRight arrayText={['1', '3']} showIcon rightText />
          <LeftInPlay />
        </Label>

        <BeforeMatchCellGroup>
          <Label prefixCls="push-before" showTBBorder={false}>
            <LeftTitle gameTypeImgShow={false} prefixCls="push-before" />
            <LabelRight prefixCls="push-before" />
          </Label>

          <BetMatchCell>
            <BetMatchInfo />
            <BetButtonCell>
              <BetButton />
            </BetButtonCell>
            <ProgressText text={'ewrwe'} stringInTime={'werwer'} />
          </BetMatchCell>
        </BeforeMatchCellGroup>
        <Button />
      </BetMatchGroup>
    );
    wrapper
      .find('BeforeMatchCellGroup')
      .find('BetMatchCell')
      .find('ProgressText')
      .simulate('click');
    wrapper
      .find('BeforeMatchCellGroup')
      .find('Label')
      .find('LeftTitle')
      .simulate('click');
    wrapper.find('Button').simulate('click');

    const clickLeftTitleText = wrapper
      .find('BeforeMatchCellGroup')
      .find('Label')
      .find('LeftTitle')
      .prop('clickLeftTitleText');
    const click = jest.fn(clickLeftTitleText);
    expect(click()).toBe('clickLeftTitleText');
  });

  it(' BeforeMatchCellGroup LabelRight', () => {
    const wrapper = mount(
      <BetMatchGroup>
        <Label showTBBorder={true}>
          <LeftTitle />
          <LabelCenter />
          <LabelRight arrayText={['1', '3']} showIcon rightText />
          <LeftInPlay />
        </Label>

        <BeforeMatchCellGroup>
          <Label prefixCls="push-before" showTBBorder={false}>
            <LeftTitle gameTypeImgShow={false} prefixCls="push-before" />
            <LabelRight showIcon disabled={false} prefixCls="push-before" />
            <LeftInPlay liveText />
          </Label>

          <BetMatchCell>
            <BetMatchInfo />
            <BetButtonCell>
              <BetButton disabled isDetail={false} optionName="fs" handicap />
            </BetButtonCell>
          </BetMatchCell>
        </BeforeMatchCellGroup>
        <Button />
      </BetMatchGroup>
    );
    wrapper
      .find('BeforeMatchCellGroup')
      .find('Label')
      .find('LeftInPlay')
      .simulate('click');

    wrapper.find('Button').simulate('click');
    wrapper
      .find('BeforeMatchCellGroup')
      .find('Label')
      .find('LabelRight')
      .find('div')
      .at(1)
      .simulate('click');
    wrapper.find('Button').simulate('click');
    const handleRightIcon = wrapper
      .find('BeforeMatchCellGroup')
      .find('Label')
      .find('LabelRight')
      .prop('handleRightIcon');
    const click = jest.fn(handleRightIcon);
    expect(click()).toBe('handleRightIcon');
  });

  it(' BeforeMatchCellGroup', () => {
    const wrapper = mount(
      <BetMatchGroup>
        <Label showTBBorder={true}>
          <LeftTitle />
          <LeftTitle />
          <LabelCenter />
          <LabelRight arrayText={['1', '3']} showIcon rightText />
          <LeftInPlay />
        </Label>

        <BeforeMatchCellGroup>
          <Label prefixCls="push-before" showTBBorder={false}>
            <LeftTitle gameTypeImgShow={false} prefixCls="push-before" />
            <LabelRight prefixCls="push-before" />
          </Label>

          <BetMatchCell>
            <BetMatchInfo />
            <BetButtonCell>
              <BetButton disabled isDetail optionName="fs" handicap />
            </BetButtonCell>
          </BetMatchCell>
        </BeforeMatchCellGroup>
        <Button />
      </BetMatchGroup>
    );
    wrapper
      .find('BeforeMatchCellGroup')
      .find('BetMatchCell')
      .find('BetButtonCell')
      .find('BetButton')
      .simulate('click');
    wrapper.find('Button').simulate('click');
  });
});
