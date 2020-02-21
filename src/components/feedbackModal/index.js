import React from 'react';
import Modal from 'react-modal';
import { isFunction } from 'lodash';

import styles from './index.less';
import CLOSE from '../../assets/close-inactive.png';

const customStyles = {
  content: {
    width: '6.7rem',
    background: '#FFFFFF',
    padding: 0,
    borderRadius: '0.24rem',
    border: 'none',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    position: 'fixed',
    zIndex: 99999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.60)',
  },
};

export class FeedbackModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: !!props.isOpen };
  }

  // TODO: Use `static getDerivedStateFromProps` instead of `componentWillReceiveProps`
  // static getDerivedStateFromProps(props, state) {
  //   if (props.isOpen !== state.isOpen) {
  //     return { isOpen: props.isOpen };
  //   }
  //   return null;
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }
  }

  openOrCloseModal = () => {
    const { feedbackModalClose } = this.props;
    this.setState(preState => {
      preState.isOpen && isFunction(feedbackModalClose) && feedbackModalClose(true);
      return { isOpen: !preState.isOpen };
    });
  };

  render() {
    const {
      logo,
      footerText,
      showCloseIcon,
      texts,
      shouldCloseOnOverlayClick = true,
      showLogo = true,
      callbackWhenConfirm,
      callbackWhenCancel,
      callbackWhenOverlayClick,
      customContentStyle = {},
      customOverlayStyle = {},
      labelText,
      additionalText,
    } = this.props;
    return (
      <Modal
        isOpen={this.state.isOpen}
        ariaHideApp={false}
        onRequestClose={() => {
          typeof callbackWhenOverlayClick === 'function' && callbackWhenOverlayClick();
          this.openOrCloseModal();
        }}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        style={{
          overlay: Object.assign(customStyles.overlay, customOverlayStyle),
          content: Object.assign(customStyles.content, customContentStyle),
        }}
      >
        <div className={styles['modal-header']}>
          {showCloseIcon && (
            <img
              src={CLOSE}
              alt=""
              onClick={() => {
                this.openOrCloseModal();
                typeof callbackWhenCancel === 'function' && callbackWhenCancel();
              }}
            />
          )}
        </div>
        {showLogo && (
          <div className={styles['modal-logo']}>
            <img src={logo} alt="" />
          </div>
        )}

        <div className={styles['modal-content']}>
          <div className={styles['content-body']}>
            <p>{labelText}</p>
            {texts.map((v, k) => (
              <div key={k}>{v}</div>
            ))}
          </div>

          {footerText && (
            <div
              className={styles['modal-footer']}
              onClick={() => {
                this.openOrCloseModal();
                typeof callbackWhenConfirm === 'function' && callbackWhenConfirm();
              }}
            >
              {footerText}
            </div>
          )}
          {additionalText && (
            <div className={styles.additionalModules}>
              {/* // TODO:银行卡管理弹出特殊要求 */}
              <div
                onClick={() => {
                  this.openOrCloseModal();
                  typeof callbackWhenCancel === 'function' && callbackWhenCancel();
                }}
              >
                {additionalText}
              </div>
              <div />
            </div>
          )}
        </div>
      </Modal>
    );
  }
}
