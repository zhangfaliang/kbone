import React, { useState } from 'react';
import classnames from 'classnames';
import { BackHeader } from '@/components/header';
import styles from './index.less';

function Label({
  title,
  isEdit: propsIsEdit,
  desc,
  isLogin,
  onChangeEdit,
  className,
  loginRender,
  noLoginRender,
  onClose,
  betCount,
}) {
  const wrapCls = classnames(className, {
    [styles.wrap]: true,
  });

  const [isEdit, setIsEdit] = useState(propsIsEdit);

  return (
    <div className={wrapCls}>
      <div className={styles.header}>
        <BackHeader
          title="串关投注"
          onClose={onClose}
          rightContent={[isLogin ? loginRender : noLoginRender]}
        />
      </div>
      <div className={styles.action}>
        <div className={styles.a}>
          <div className={styles.a_a}>
            <span>{betCount}</span>项
          </div>
          <div
            className={styles.a_b}
            onClick={() => {
              setIsEdit(!isEdit);
              onChangeEdit(!isEdit);
            }}
          >
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}

Label.defaultProps = {
  isLogin: true,
  loginRender: 'loginRender',
  noLoginRender: 'noLoginRender',
  onClose: () => {},
};

export default Label;
