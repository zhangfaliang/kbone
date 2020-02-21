import React from 'react';
import Entrance from './entrance';
import styles from './index.less';
import entrance321 from '@/assets/guide/entrance-321.png';
import entrancesango from '@/assets/guide/entrance-sango.png';
import router from 'umi/router';

const EntranceGroup = ({ getGameUrl, isLogin, setIsLoading, isLoading }) => (
  <div className={styles.wrapper}>
    <Entrance
      backgroundImage={entrance321}
      onClick={() => {
        if (!isLogin) {
          router.push('/login/index?returnTo=/guide/index');
          return;
        }
        const search = window.location.search;
        router.push(`/game/index${search}`);
      }}
    />
    <Entrance
      backgroundImage={entrancesango}
      isLoading={isLoading}
      onClick={() => {
        if (!isLogin) {
          router.push('/login/index?returnTo=/play/index');
          return;
        }
        setIsLoading({ isLoading: !!1 });
        getGameUrl({ gameKey: 'sango' });
      }}
    />
  </div>
);

export default EntranceGroup;
