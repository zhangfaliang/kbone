import styles from './style.less';
import IconFont from '../../iconFont';
import React from 'react';
import { formatMessage } from 'umi/locale';
import Item from './item';
export default function VerticalItem(props) {
  const { data, keys, viewDetail } = props;
  return (
    <>
      {data && (
        <div className={styles.container}>
          <div className={styles.title}>
            <span>
              {formatMessage({ id: 'Wiki.2002' })} {data[keys['raceNum']]}{' '}
              {data[keys['title']] || ''}
            </span>
            <span onClick={() => viewDetail(data)} className={styles.iconColor}>
              <IconFont type="mycopy" />
            </span>
          </div>
          <>
            {data[keys['arryData']].length > 0 &&
              data[keys['arryData']].map((val, index) => {
                if (index > 2) {
                  return false;
                }
                return (
                  <React.Fragment key={`${JSON.stringify(val)}${index}`}>
                    <Item {...props} val={val} />
                  </React.Fragment>
                );
              })}
          </>
        </div>
      )}
    </>
  );
}
