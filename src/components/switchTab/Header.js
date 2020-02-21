import React, { Component } from 'react';
import { formatMessage } from 'umi/locale';
import classnames from 'classnames';
import styles from './Header.less';
import { HeaderItem } from './HeaderItem';
import DATE_ACTIVE from '../../assets/date-active.png';
import DATE_INACTIVE from '../../assets/date-inactive.png';
import LEAGUE_INACTIVE from '../../assets/league-inactive.png';
import LEAGUE_ACTIVE from '../../assets/league-active.png';
import { SwitchTabContext } from './SwitchTabContext';

const TAB_INDEXES = [0, 1];
const TITLES = [formatMessage({ id: 'Wiki.0024' }), formatMessage({ id: 'Wiki.0023' })];

export class Header extends Component {
  state = { activeIndex: 0 };

  handleActiveTab = activeIndex => this.setState({ activeIndex });

  render() {
    const { isWithPopup } = this.props;
    const wrapperClass = isWithPopup
      ? classnames(styles['wrapper'], styles['without-bottom-radius'])
      : styles['wrapper'];

    return (
      <SwitchTabContext.Consumer>
        {({ showCategory, toggleActiveTab, currentTabIndex, activeCategory }) => (
          <div className={wrapperClass}>
            {isWithPopup ? (
              <React.Fragment>
                <HeaderItem
                  showCloseIcon={currentTabIndex === TAB_INDEXES[0]}
                  logo={currentTabIndex === TAB_INDEXES[0] ? DATE_ACTIVE : DATE_INACTIVE}
                  text={
                    activeCategory.tabIndex === TAB_INDEXES[0]
                      ? activeCategory.title
                      : TITLES[TAB_INDEXES[0]]
                  }
                  isActive={currentTabIndex === TAB_INDEXES[0]}
                  handleClick={() => {
                    toggleActiveTab(TAB_INDEXES[0]);
                  }}
                />
                <HeaderItem
                  showCloseIcon={currentTabIndex === TAB_INDEXES[1]}
                  logo={currentTabIndex === TAB_INDEXES[1] ? LEAGUE_ACTIVE : LEAGUE_INACTIVE}
                  text={
                    activeCategory.tabIndex === TAB_INDEXES[1]
                      ? activeCategory.title
                      : TITLES[TAB_INDEXES[1]]
                  }
                  handleClick={() => {
                    toggleActiveTab(TAB_INDEXES[1]);
                  }}
                  isActive={currentTabIndex === TAB_INDEXES[1]}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <HeaderItem
                  logo={activeCategory.tabIndex === TAB_INDEXES[0] ? DATE_ACTIVE : DATE_INACTIVE}
                  text={
                    activeCategory.tabIndex === TAB_INDEXES[0]
                      ? activeCategory.title
                      : TITLES[TAB_INDEXES[0]]
                  }
                  isActive={activeCategory.tabIndex === TAB_INDEXES[0]}
                  handleClick={() => {
                    toggleActiveTab(TAB_INDEXES[0]);
                    showCategory();
                  }}
                />
                <HeaderItem
                  logo={
                    activeCategory.tabIndex === TAB_INDEXES[1] ? LEAGUE_ACTIVE : LEAGUE_INACTIVE
                  }
                  text={
                    activeCategory.tabIndex === TAB_INDEXES[1]
                      ? activeCategory.title
                      : TITLES[TAB_INDEXES[1]]
                  }
                  handleClick={() => {
                    toggleActiveTab(TAB_INDEXES[1]);
                    showCategory();
                  }}
                  isActive={activeCategory.tabIndex === TAB_INDEXES[1]}
                />
              </React.Fragment>
            )}
          </div>
        )}
      </SwitchTabContext.Consumer>
    );
  }
}
