import React, { Component } from 'react';
import { get } from 'lodash';
import { Header } from './Header';
import { SwitchTabContext } from './SwitchTabContext';
import { SwitchTabPopup } from './Popup';

export class SwitchTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldShowCategory: false,
      currentTabIndex: 0,
    };
  }

  handleSelectCategory = selectedCategory => {
    const { currentTabIndex } = this.state;
    const { changeGroup } = this.props;

    this.hideCategory();

    changeGroup({
      groupName: selectedCategory.value,
      groupType: selectedCategory.groupType,
      tabIndex: this.state.currentTabIndex,
      title: currentTabIndex === 0 ? selectedCategory.formatTitle : selectedCategory.value,
    });
  };

  showCategory = () => {
    this.props.changeCategory(true);
  };

  hideCategory = () => {
    this.props.changeCategory(false);
  };

  toggleActiveTab = currentTabIndex => this.setState({ currentTabIndex });

  render() {
    const { activeCategory, sportType, showCategoryFlag } = this.props;

    return (
      <React.Fragment>
        <SwitchTabContext.Provider
          value={{
            showCategory: this.showCategory,
            hideCategory: this.hideCategory,
            currentTabIndex: this.state.currentTabIndex,
            toggleActiveTab: this.toggleActiveTab,
            activeCategory: get(activeCategory, sportType, {}),
            handleSelectCategory: this.handleSelectCategory,
            gameCategoryByLeague: this.props.gameCategoryByLeague,
            gameCategoryByDate: this.props.gameCategoryByDate,
            gameCategoryFocus: this.props.gameCategoryFocus,
          }}
        >
          {showCategoryFlag ? <SwitchTabPopup /> : <Header />}
        </SwitchTabContext.Provider>
      </React.Fragment>
    );
  }
}

export * from './Popup';
