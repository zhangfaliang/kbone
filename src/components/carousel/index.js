import React from 'react';
import { Carousel as AntdCarousels } from 'antd-mobile';
import styles from './index.less';
import router from 'umi/router';

export class Carousel extends React.PureComponent {
  handleBanner = targetTo => {
    window.location.href = targetTo;
  };
  render() {
    const { imgSets = [], autoplay, picUseHost } = this.props;
    const imgWidth = Math.ceil(
      document.querySelector('html').style.fontSize.replace('px', '') * 7.5
    );
    return (
      <div className={styles['wrapper']}>
        <AntdCarousels autoplay={autoplay} dots={imgSets.length > 1} infinite>
          {imgSets.map(item => (
            <div
              className={styles.bannerImg}
              key={item.bannerId}
              style={{
                backgroundImage: ` url(${
                  // item.imageUrl
                  picUseHost === '1'
                    ? `${window.location.origin}/${
                        item.imageUrl
                      }?x-oss-process=image/resize,w_${imgWidth},limit_0/quality,q_60`
                    : `${
                        item.imageUrl
                      }?x-oss-process=image/resize,w_${imgWidth},limit_0/quality,q_60`
                })`,
              }}
              onClick={this.handleBanner.bind(this, item.targetTo)}
            />
          ))}
        </AntdCarousels>
      </div>
    );
  }
}
