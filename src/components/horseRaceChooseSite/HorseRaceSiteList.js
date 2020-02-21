import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { get } from 'lodash';
import { offset } from '../../utils/commonFn.js';

class HorseRaceSiteList extends React.Component {
  static COMPONENT_NAME = 'HORSERACESITELIST';
  constructor(props) {
    super(props);
    this.state = { activeKey: props.activeKey };
    this.maxLength = 8;
    this.siteWrap = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.activeKey !== state.activeKey) {
      return { activeKey: props.activeKey };
    }
    return null;
  }
  setHeight = () => {
    const siteWrap = this.siteWrap.current;
    const bodyHeight = document.querySelector('body').clientHeight;
    const maxHeight = bodyHeight - offset(siteWrap).top;
    if (maxHeight < siteWrap.clientHeight) {
      siteWrap.style.height = `${maxHeight}px`;
      siteWrap.style.overflow = 'scroll';
    }
  };

  scrollTopFn = isDidMount => {
    const { sites } = this.props;
    const siteWrap = this.siteWrap.current;
    let activeIndex, minChildrenHeight;
    for (let i = 0; i < sites.length; i++) {
      const site = sites[i];
      if (site.key == this.props.activeKey) {
        activeIndex = i;
        break;
      }
    }
    minChildrenHeight = get(siteWrap, 'children.0.clientHeight', 0);
    const maxChildrenHeight = minChildrenHeight * (activeIndex + 1);
    if (maxChildrenHeight > siteWrap.clientHeight) {
      siteWrap.scrollTop = maxChildrenHeight - siteWrap.clientHeight;
    }
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this.props.sites.length > this.maxLength) {
      return true;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      this.setHeight();
      this.scrollTopFn();
    }
  }

  componentDidMount() {
    this.setHeight();
    this.scrollTopFn();
  }

  handleItem = site => {
    const { handleItem } = this.props;
    this.setState({ activeKey: site.key });
    handleItem && handleItem(site.value, site.key);
  };
  render() {
    const { sites, prefixCls } = this.props;
    return (
      <div ref={this.siteWrap} className={styles[`${prefixCls}-site-block`]}>
        {sites.map(site => {
          const clsStr = classnames({
            [styles.site]: true,
            [styles.active]: this.state.activeKey == site.key,
          });
          return (
            <span
              onClick={() => {
                this.handleItem(site);
              }}
              className={clsStr}
              key={site.key}
            >
              {site.value}
            </span>
          );
        })}
      </div>
    );
  }
}
HorseRaceSiteList.defaultProps = {
  prefixCls: 'default',
  activeKey: '',
  sites: [],
  handleItem: key => {
    console.log(key);
    return 'handleItem';
  },
};

export default HorseRaceSiteList;
