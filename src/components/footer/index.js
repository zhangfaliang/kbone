import React, { Component } from 'react';
import moment from 'moment';
import Router from 'umi/router';
import withRouter from 'umi/withRouter';
import { get, isEmpty } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { connect } from 'dva';
// import Modal from '@/components/modal';
import { formatMessage, setLocale, getLocale } from 'umi/locale';
import isPwa from '@/utils/pwaAddScreen';
import Link from 'umi/link';
import { formatMoney } from '@/utils/commonFn';
// import BackTop from '../backTop';
import AddToScreen from '../addToScreen';
import styles from './index.less';
import {
  selectBetModuleOpenFlg,
  selectOptionBtnInfo,
  selectBetFeedModalData,
  selectIsLogin,
  selectBetPendingLoading,
  makeSelectFooterDataSource,
  makeIsSelectOptionClose,
  selectMinBetAmount,
  selectLoadingEffects,
  selectAppConfigBetUnit,
} from '../../selector';
import { makeBetInputKeyboard } from '../../selector/betInputKeyboard';
import { makeAllAmount, makeUserInfo, selectCurrencySymbol } from '../../selector/userInfo';
import { submitBet } from '../../actions';
import { FeedbackModal } from '../feedbackModal';
import { Loading } from '../loading';
import Modal from '@/components/modal';

// 赛马快速投注
import QuickBetPanel from '../quickBet';
import BetSlip from '../betSlip';

import {
  selectIsOpenQuickBet,
  selectIsOpenQuickBetKeyboard,
  selectHorseBetAmount,
  selectHorseSpareAmount,
  selectHorseIsOpenBetSlipPanel,
  selectHorseBetCountVisibled,
  selectHorseAddBetSlipVisibled,
  selectHorseBetSlipIsEdit,
} from '../../selector/horse';
import {
  selectBetSlips,
  selectBetSlipsAmount,
  selectBetSlipsDisabledBet,
  selectAddBetSlipsBtnDisabled,
  selectAddBetSlipsBtnText,
  selectBetSlipsDataSource,
  transformBetInfo,
  selectBetSlipIsAcceptChange,
  selectBetSlipModalVisible,
  selectBetSlipModalResult,
  selectBetSlipsBetRenturnAmount,
  selectProcessBetSlipsLoading,
  selectMakeEffectPassModalInfo,
  selectBetSlipIsChangeOdds,
} from '../../selector/betSlip';
import {
  selectPassSlipsAmount,
  selectPendingWS,
  selectProcessPassLoading,
  selectBetSlipsPassDataSource,
  selectPassPreBetLimit,
  selectPassDisabledBet,
} from '../../selector/passList';
import { selectAppConfig, makeUserConfig } from '../../selector';
import { chooseLoginType } from '@/utils/forcedLogin';
import { Form, Button, RadioGroup } from '@/components/form';
const Radio = RadioGroup.Radio;

const { QuickBetInfo, InputPanel, KeyboardPanel } = QuickBetPanel;
const { BetSlipPanel, BetAction, BetSlipModal } = BetSlip;

const mapDispatchToProps = dispatch => ({
  closeBetModule: () => dispatch({ type: 'global/clearSelectOptionBtnInfo' }),
  setBetInputKeyboardInfo: resetBetInputKeyboardInfo =>
    dispatch({ type: 'global/setBetInputKeyboardInfo', resetBetInputKeyboardInfo }),
  clearInputKeyboardInfo: () => dispatch({ type: 'global/clearInputKeyboardInfo' }),
  inputKeyboard: value => dispatch({ type: 'global/inputKeyboard', value }),
  submitBet: () => dispatch(submitBet()),
  onSetBetInputKeyboardInfoAllInDisabled: allInDisabled =>
    dispatch({ type: 'global/setBetInputKeyboardInfoAllInDisabled', allInDisabled }),
  onSetBetInputKeyboardInfoFillInDisabled: fillInDisabled =>
    dispatch({ type: 'global/setBetInputKeyboardInfoFillInDisabled', fillInDisabled }),
  onChangeQuickBetKeyboard: visabled =>
    dispatch({ type: 'horse/changeQuickBetKeyboard', isOpenQuickBetKeyboard: visabled }),
  onSetHorseBetAmount: betAmount => dispatch({ type: 'horse/setBetAmount', betAmount }),
  onCloseHorseQuickBet: () => dispatch({ type: 'horse/closeQuickBet' }),
  onOpenBetSlipPanel: () => dispatch({ type: 'horse/openBetSlipPanel' }),
  onCloseBetSlipPanel: () => dispatch({ type: 'horse/closeBetSlipPanel' }),
  onSetbetSlipDataSource: (key, value, type = null) =>
    dispatch({ type: 'betSlip/updateState', payload: { key, value, type } }),
  addForeCastOrTriCastSlips: () => dispatch({ type: 'horse/addForeCastOrTriCastSlips' }),
  addSingleSlips: () => dispatch({ type: 'horse/addSingleSlips' }),
  getBetSlipListEffect: () => dispatch({ type: 'betSlip/getBetSlipList' }),
  onSubOrderBettingSlipRemoveAll: () => dispatch({ type: 'betSlip/subOrderBettingSlipRemoveAll' }),
  onSubOrderBettingSlipRemoveBatch: payload =>
    dispatch({ type: 'betSlip/subOrderBettingSlipRemoveBatch', payload }),
  onChangeBetSlipEdit: betSlipIsEdit => dispatch({ type: 'horse/onChangeIsEdit', betSlipIsEdit }),
  onAcceptChange: from => dispatch({ type: 'betSlip/onAcceptChange', from }),
  onBetSlipBet: () => dispatch({ type: 'betSlip/betSlipBet' }),
  onSetAcceptChange: isAcceptChange =>
    dispatch({ type: 'betSlip/setAcceptChange', isAcceptChange }),
  onBetSlipModalClose: () => dispatch({ type: 'betSlip/closeModalVisible' }),
  onSetIsRememberAmount: isRememberAmount =>
    dispatch({ type: 'betSlip/setIsRememberAmount', isRememberAmount }),
  setIsFb: isFb => dispatch({ type: 'betSlip/setIsFb', isFb }),
  onCloseAddBetSlipVisibled: () => dispatch({ type: 'horse/closeAddBetSlipVisibled' }),
  onSetIsChangeOdds: isChangeOdds => dispatch({ type: 'betSlip/setIsChangeOdds', isChangeOdds }),
});
const mapStateToProps = createStructuredSelector({
  betModuleOpenFlag: selectBetModuleOpenFlg,
  selectOptionBtnInfo: selectOptionBtnInfo,
  betInputKeyboard: makeBetInputKeyboard(),
  userAmount: makeAllAmount,
  betFeedModalData: selectBetFeedModalData,
  isLogin: selectIsLogin,
  isBetPendingLoading: selectBetPendingLoading,
  currencySymbol: selectCurrencySymbol,
  footerDataSource: makeSelectFooterDataSource,
  isSelectOptionClose: makeIsSelectOptionClose,
  isOpenQuickBet: selectIsOpenQuickBet,
  isOpenQuickBetKeyboard: selectIsOpenQuickBetKeyboard,
  horseBetAmount: selectHorseBetAmount,
  horseSpareAmount: selectHorseSpareAmount,
  isOpenBetSlipPanel: selectHorseIsOpenBetSlipPanel,
  betSlips: selectBetSlips,
  betSlipsAoumt: selectBetSlipsAmount,
  betSlipsDisabledBet: selectBetSlipsDisabledBet,
  userInfo: makeUserInfo,
  addBetSlipsBtnDisabled: selectAddBetSlipsBtnDisabled,
  betCountVisibled: selectHorseBetCountVisibled,
  addBetSlipVisibled: selectHorseAddBetSlipVisibled,
  addBetSlipsBtnText: selectAddBetSlipsBtnText,
  betSlipsDataSource: selectBetSlipsDataSource,
  betSlipIsEdit: selectHorseBetSlipIsEdit,
  isAcceptChange: selectBetSlipIsAcceptChange,
  betSlipModalVisible: selectBetSlipModalVisible,
  betSlipResult: selectBetSlipModalResult,
  minBetAmount: selectMinBetAmount,
  loaddingEffect: selectLoadingEffects,
  betSlipsBetRenturnAmount: selectBetSlipsBetRenturnAmount,
  passSlipsAmount: selectPassSlipsAmount,
  pendingWS: selectPendingWS(),
  processPassLoading: selectProcessPassLoading,
  passListDataSource: selectBetSlipsPassDataSource,
  prePassBetLimit: selectPassPreBetLimit,
  passDisabledBet: selectPassDisabledBet(),
  processBetSlips: selectProcessBetSlipsLoading,
  appConfig: selectAppConfig,
  betUnit: selectAppConfigBetUnit,
  userConfig: makeUserConfig,
  effectPassModalInfo: selectMakeEffectPassModalInfo,
  formatQuickBetLoading: state => get(state, 'betSlip.formatQuickBetLoading'),
  isChangeOdds: selectBetSlipIsChangeOdds,
});

@withRouter
@connect(
  mapStateToProps,
  mapDispatchToProps
)
@Form.create()
class Footer extends Component {
  state = {
    changeSP: false,
    title: '',
    links: [],
  };

  componentDidMount() {
    const {
      location: {
        query: { isBetSlipBet },
      },
    } = this.props;
    const isBetSlipBetFlg = isBetSlipBet && +isBetSlipBet === 1;
    this.props.setIsFb(!isBetSlipBetFlg);
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.isSelectOptionClose &&
      nextProps.isSelectOptionClose !== this.props.isSelectOptionClose
    ) {
      this.props.closeBetModule();
    }
    return true;
  }
  handleCloseBetModule = () => {
    this.props.closeBetModule();
    this.props.clearInputKeyboardInfo();
  };
  handelBetInputFocusInput = () => {
    const { setBetInputKeyboardInfo } = this.props;
    setBetInputKeyboardInfo({ isShowKeyboard: true });
  };
  handelCloseKeyboard = () => {
    this.props.setBetInputKeyboardInfo({ isShowKeyboard: false });
  };
  handleKeyboardChange = value => {
    this.props.inputKeyboard(value);
  };
  handleBet = () => {
    this.props.submitBet();
  };
  handelChangeHandicap = sp => {
    if (Number(sp) < 1.01) {
      this.props.closeBetModule();
      return;
    }
    this.props.setBetInputKeyboardInfo({ isChangeHandicap: true });
  };
  handelChangeSp = sp => {
    if (Number(sp) < 1.01) {
      this.props.closeBetModule();
      return;
    }
    this.props.setBetInputKeyboardInfo({ isChangeSp: true });
  };
  handleAllIn = allAmount => {
    this.handleKeyboardChange(allAmount);
    this.props.onSetBetInputKeyboardInfoAllInDisabled(true);
  };
  handleFillIn = fillAmount => {
    this.handleKeyboardChange(fillAmount);
    this.props.onSetBetInputKeyboardInfoFillInDisabled(true);
  };
  changLang = () => {
    this.showHidden(true);
  };

  onOpenKeyboard = () => {
    this.props.onChangeQuickBetKeyboard(!this.props.isOpenQuickBetKeyboard);
  };
  handelCloseHorseQuickBet = () => {
    this.props.onCloseHorseQuickBet();
  };
  showHidden = e => {
    this.setState(
      {
        visible: e,
      },
      () => {
        if (!this.state.visible) {
          this.props.form.resetFields();
        }
      }
    );
  };
  handleSubmit = () => {
    const { validateFields } = this.props.form;
    validateFields((error, value) => {
      const { language } = value;
      if (language) {
        const locale = getLocale();
        const setLang = lang => {
          setLocale(lang);
          moment.locale(lang);
          window.localStorage.setItem('user_locale', lang);
        };
        if (language !== locale) {
          setLang(language);
        } else {
          this.showHidden();
        }
      }
    });
  };
  render() {
    const { title, links } = this.props.footerDataSource;
    const {
      location: {
        query: { isBetSlipBet },
      },
    } = this.props;
    const isBetSlipBetFlg = isBetSlipBet && +isBetSlipBet === 1;
    const {
      onCloseAddBetSlipVisibled,
      betFeedModalData,
      isBetPendingLoading,
      currencySymbol,
      isOpenQuickBet,
      isOpenQuickBetKeyboard,
      onSetHorseBetAmount,
      horseSpareAmount,
      onCloseHorseQuickBet,
      betSlips,
      onSetbetSlipDataSource,
      betSlipsAoumt,
      betSlipsDisabledBet,
      isLogin,
      isAcceptChange,
      onAcceptChange,
      onBetSlipBet,
      betSlipModalVisible,
      onBetSlipModalClose,
      betSlipResult,
      minBetAmount,
      loaddingEffect,
      onSetIsRememberAmount,
      pendingWS,
      processBetSlips,
      betUnit,
      initConfig,
      userConfig,
      effectPassModalInfo,
      formatQuickBetLoading,
      isChangeOdds,
      onSetIsChangeOdds,
    } = this.props;

    // const currencyType = getStatus('currencyType', userInfo.currencyType + '');
    const currencyType = get(userConfig, 'currencyName'); // 20190625修改
    const showFooter = get(initConfig, 'showFooter', '0');
    const product = get(initConfig, 'product', '1');
    const { getFieldDecorator } = this.props.form;

    return (
      <footer>
        <Loading
          isShow={isBetPendingLoading || (processBetSlips || (processBetSlips && pendingWS))}
          texts={
            processBetSlips || (processBetSlips && pendingWS)
              ? []
              : [formatMessage({ id: 'Wiki.0038' })]
          }
        />

        <div className={styles.wrap}>
          {/* showFooter === '1' */}
          {false && (
            <>
              {product === '1' && <div className={styles.title} />}
              <div className={styles.links}>
                {links.map((v, k) => {
                  return (
                    <Link key={k} to={`/cms/page?id=${v.id}`}>
                      {v.title}
                    </Link>
                  );
                })}
              </div>
            </>
          )}
          <div className={styles.links}>
            {initConfig.showLanguageSwitch === '1' && (
              <a
                onClick={() => {
                  this.changLang();
                }}
                className={styles.languageStyle}
              >
                {/* {formatMessage({ id: 'Wiki.0086' })}：{formatMessage({ id: 'lang' })} */}
                {formatMessage({ id: 'Wiki.0086' })}
              </a>
            )}
            {initConfig.showAddToHomeScreen === '1' && !isPwa() && (
              <a onClick={this.state.showAddToHomeScreen}>{formatMessage({ id: 'addToScreen' })}</a>
            )}
          </div>
          <Modal
            wrapClassName="wrapModal"
            title={formatMessage({ id: 'Wiki.0086' })}
            visible={this.state.visible}
            transparent
            closable={true}
            onClose={() => {
              this.showHidden(false);
            }}
            maskClosable={false}
            footer={[
              {
                text: <div>{formatMessage({ id: 'Wiki.0132' })}</div>,
                onPress: () => {
                  this.handleSubmit();
                },
              },
            ]}
          >
            <Form>
              {getFieldDecorator('language', {
                initialValue: getLocale(),
              })(
                <RadioGroup size="large81">
                  <Radio value={'zh-CN'}>{formatMessage({ id: 'Wiki.0131' })}</Radio>
                  <Radio value={'en-US'}>{formatMessage({ id: 'Wiki.0130' })}</Radio>
                </RadioGroup>
              )}
            </Form>
          </Modal>
        </div>
        {/* TODO: s02 date:2019.9.19 本期先不做，下期在优化(和产品已经沟通过了) */}
        {/* <BackTop /> */}

        <FeedbackModal {...betFeedModalData} />
        {/* 快速投注 */}
        <QuickBetPanel
          formatQuickBetLoading={formatQuickBetLoading}
          visabled={!isBetSlipBetFlg && isOpenQuickBet}
          isOpenQuickBetKeyboard={isOpenQuickBetKeyboard}
        >
          <QuickBetInfo
            loading={get(loaddingEffect, 'betSlip/getBetSlipList')}
            isAcceptChange={isAcceptChange}
            dataSource={transformBetInfo(betSlips, isOpenQuickBet)}
            visabled={isOpenQuickBet}
            onDelete={v => {
              onSetbetSlipDataSource(`0.ishandicapChange`, false);
              onCloseHorseQuickBet();
              onCloseAddBetSlipVisibled();
              onSetIsChangeOdds(false);
            }}
            currencyType={currencyType}
            onEmitChangeSP={change => {
              onSetIsChangeOdds(change);
            }}
            onSetDataSource={onSetbetSlipDataSource}
          />
          <InputPanel
            changeSP={isChangeOdds}
            currencySymbol={currencySymbol}
            currencyType={currencyType}
            minBetAmount={minBetAmount}
            spChangeTxt={formatMessage({ id: 'Wiki.0125' })}
            minBetLimitTxt={formatMessage({ id: 'Wiki.0106' })}
            maxLength={8}
            value={get(transformBetInfo(betSlips, isOpenQuickBet), '0.input')}
            spareValue={horseSpareAmount}
            placeholder={formatMessage({ id: 'Wiki.0102' })}
            onResetValue={() => {
              // onSetHorseBetAmount();
            }}
            toReturnText={formatMessage({ id: 'Wiki.0110' })}
            totalStakeText={formatMessage({ id: 'Wiki.0095' })}
            betText={formatMessage({ id: 'Wiki.0035' })}
            acceptChangeText={formatMessage({ id: 'Wiki.0104' })}
            onBetSlipBet={onBetSlipBet}
            onAcceptChange={() => {
              onSetbetSlipDataSource(`0.ishandicapChange`, false);
              onAcceptChange();
            }}
            isAcceptChange={isAcceptChange}
            isShowBetMax={isLogin}
            onSetDataSource={onSetbetSlipDataSource}
            isFocus={isOpenQuickBetKeyboard}
            onOpenKeyboard={this.onOpenKeyboard}
            betSlipsDisabledBet={betSlipsDisabledBet}
            betSlipsAoumt={betSlipsAoumt}
            {...get(transformBetInfo(betSlips, isOpenQuickBet), '0')}
          />
          <KeyboardPanel
            betUnit={betUnit}
            value={get(transformBetInfo(betSlips, isOpenQuickBet), '0.input')}
            visabled={isOpenQuickBetKeyboard}
            onChangeRememberFun={checked => {
              onSetIsRememberAmount(checked);
            }}
            addToBetSlipText={formatMessage({ id: 'Wiki.0099' })}
            doneText={formatMessage({ id: 'Wiki.0101' })}
            rememberStakeText={formatMessage({ id: 'Wiki.0100' })}
            minBetAmount={minBetAmount}
            isClearInput={horseSpareAmount && isOpenQuickBetKeyboard}
            disabled={get(transformBetInfo(betSlips, isOpenQuickBet), '0.inputDisabled')}
            onChange={value => {
              onSetHorseBetAmount(value);
              onSetbetSlipDataSource(
                `0.prevInput`,
                get(transformBetInfo(betSlips, isOpenQuickBet), '0.input')
              );
              onSetbetSlipDataSource(`0.input`, value);
            }}
            onAddToBetSlipFun={onCloseHorseQuickBet}
            onDoneFun={this.onOpenKeyboard}
          />
        </QuickBetPanel>
        {!isEmpty(effectPassModalInfo) && (
          <BetSlipModal
            title={formatMessage({ id: 'Wiki.0107' })}
            visible={betSlipModalVisible}
            onClose={onBetSlipModalClose}
            onPress={onBetSlipModalClose}
            effectPassModalInfo={effectPassModalInfo}
            dataSource={betSlipResult}
          />
        )}
        {initConfig.showAddToHomeScreen === '1' && (
          <AddToScreen parentThis={this} firstTime={30000} secondTime={180000} />
        )}
      </footer>
    );
  }
}

export default Footer;
