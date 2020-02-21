import React from 'react';
import styles from './index.less';

const Activity = ({ backgroundImage, href, title, subtitle, picUseHost, ...res }) => (
  <div
    {...res}
    className={styles.activity}
    style={{
      backgroundImage: `url(${
        picUseHost === '1' ? `${window.location.origin}/${backgroundImage}` : backgroundImage
      })`,
    }}
    onClick={() => {
      if (href && href.trim() !== '') {
        window.location.href = href;
      }
    }}
  >
    <div className={styles.text}>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  </div>
);

export default Activity;
