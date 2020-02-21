import React from 'react';

export const SwitchTabContext = React.createContext({
  showCategory: () => {},
  hideCategory: () => {},
  toggleActiveTab: () => {},
  currentTabIndex: 0,
  activeCategory: {},
});
