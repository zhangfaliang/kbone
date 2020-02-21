import React from 'react';
import styles from './index.less';

const GameTypeList = ({
  footerText = '',
  gamePlays = [],
  prefixCls = 'default',
  handleItem = (item, gamePlayKey) => {
    console.log(item, gamePlayKey);
  },
}) => {
  const clsName = `${prefixCls || 'default'}-game-type-list`;
  return (
    <div
      className={styles[clsName]}
      onClick={e => {
        e.stopPropagation();
      }}
    >
      {Object.keys(gamePlays).map(gamePlayKey => {
        const item = gamePlays[gamePlayKey];
        return (
          <span
            key={item}
            onClick={e => {
              e.stopPropagation();
              handleItem(item, gamePlayKey);
            }}
            className={styles.item}
          >
            {item}
          </span>
        );
      })}

      <div
        onClick={e => {
          e.stopPropagation();
        }}
        className={styles.footer}
      >
        {footerText}
      </div>
    </div>
  );
};
GameTypeList.COMPONENT_NAME = 'GAMETYPELIST';
export default GameTypeList;
