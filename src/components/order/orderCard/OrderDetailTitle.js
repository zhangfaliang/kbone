import React from 'react';
import { LeftTitle, Label, LabelRight } from '@/components/label';
import ResultImg from './ResultImg';
import Radius from './radius';
const OrderDetailTitle = ({
  prefixCls = 'bet-detail',
  handelTitleClick = orderInfo => {
    console.log(orderInfo);
  },
  leftNode = '',
  showIcon = true,
  showTBBorder = true,
  orderInfo = {},
  resultImgSrc = '',
  disabled = false,
  radiusModule = false,
  bkgdColorCls = false,
}) => {
  const handelClickTitleText = () => {
    handelTitleClick(orderInfo);
  };
  return (
    <>
      <Label
        prefixCls={prefixCls}
        disabled={disabled}
        showTBBorder={showTBBorder}
        bkgdColorCls={bkgdColorCls}
        clickTitleText={handelClickTitleText}
      >
        <ResultImg resultImgSrc={resultImgSrc} prefixCls={prefixCls} />
        <LeftTitle prefixCls={prefixCls} gameTypeImgShow={false} leftText={leftNode} />
        <LabelRight prefixCls={prefixCls} showIcon={showIcon} iconType="mycopy" />
      </Label>
      {radiusModule && <Radius prefixCls={prefixCls} />}
    </>
  );
};
OrderDetailTitle.COMPONENT_NAME = 'ORDERDETAILTITLE';
export default OrderDetailTitle;
