import React from 'react';
import styles from './index.less';
import { Loading } from '@/components/loading';

const EntranceGroup = ({ backgroundImage, onClick, isLoading, ...res }) => (
  <div
    {...res}
    className={isLoading ? styles.loading : styles.entrance}
    style={{
      backgroundImage: `url(${backgroundImage})`,
    }}
    onClick={() => {
      !isLoading && onClick();
    }}
  >
    {isLoading && <Loading />}
  </div>
);

export default EntranceGroup;
