import React, { Component } from 'react';
import { Header } from './Header';
import styles from './Popup.less';
import { CategoryByLeague } from './CategoryByLeague';
import { CategoryByDate } from './CategoryByDate';
import { SwitchTabContext } from './SwitchTabContext';

export class SwitchTabPopup extends Component {
  render() {
    return (
      <SwitchTabContext.Consumer>
        {({ currentTabIndex, gameCategoryByDate, gameCategoryByLeague, gameCategoryFocus }) => (
          <div className={styles['popup-wrapper']}>
            <div className={styles['popup-inner']}>
              <Header isWithPopup />
              <div className={styles['popup-main']}>
                {currentTabIndex === 0 ? (
                  <CategoryByDate categoryList={gameCategoryByDate} />
                ) : (
                  <CategoryByLeague
                    categoryList={gameCategoryByLeague}
                    focusCategories={gameCategoryFocus}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </SwitchTabContext.Consumer>
    );
  }
}
