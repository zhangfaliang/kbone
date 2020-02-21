import styles from './index.less';

function Button({
  prefixCls = 'default',
  click = () => {
    // console.log('default');
  },
  texts = '',
}) {
  return (
    <div className={styles[`${prefixCls}-button`]} onClick={click}>
      {texts}
    </div>
  );
}

export default Button;
