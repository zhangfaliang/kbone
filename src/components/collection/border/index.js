import styles from './style.less';

function Border({ prefixCls = 'default' }) {
  return <div className={styles[`${prefixCls}-border`]} />;
}

export default Border;
