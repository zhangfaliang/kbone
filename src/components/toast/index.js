import classnames from 'classnames';
import styles from './index.less';

const notice = ({
  prefixCls = 'bet',
  content = 'Connection lost, please check "My Bets" to see whether the order is confirmed',
  closeFn = () => {},
  duration = '2000',
}) => {
  const clickObscuration = e => {
    e.stopPropagation;
    closeFn && closeFn();
  };

  const toastCls = classnames({
    [styles[`${prefixCls}-toast`]]: true,
  });
  const toastComponent = document.getElementById('toast-component');
  const ROOT = document.getElementById('root');

  //    if(toastComponent){
  //        debugger
  //     ROOT.removeChild(DIV)
  //    }
  const DIV = document.createElement('DIV');
  const SPAN = document.createElement('SPAN');
  DIV.className = toastCls;
  DIV.id = 'toast-component';
  DIV.onclick = clickObscuration;
  SPAN.className = styles.content;
  SPAN.innerText = content;
  DIV.appendChild(SPAN);
  ROOT.appendChild(DIV);
  setTimeout(() => {
    const toastComponent = document.getElementById('toast-component');
    ROOT.removeChild(toastComponent);
    closeFn && closeFn();
  }, duration);
};

export default {
  show: function show(content, duration, closeFn) {
    notice({ content, duration, closeFn });
  },
};
