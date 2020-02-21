import React from 'react';
import ChooseTitle from './ChooseTitle';
import { GamePlayModule } from '../matchListTitle';
import styles from './index.less';

class HorseRaceChooseSite extends React.Component {
  onClickBack = () => {
    const { onClickBack } = this.props;
    onClickBack && onClickBack();
  };
  handleChoose = closeFlag => {
    const { handleChooseSite } = this.props;
    handleChooseSite && handleChooseSite(closeFlag);
  };
  handleSiteLayer = closeFlag => {
    const { handleSiteLayer } = this.props;
    handleSiteLayer && handleSiteLayer(closeFlag);
  };
  handleSiteItem = (item, siteKey) => {
    const { handleSiteItem } = this.props;
    handleSiteItem && handleSiteItem(item, siteKey);
  };
  render() {
    const { children, prefixCls } = this.props;
    const childrens = React.Children.map(children, option => {
      const { ...other } = option.props;
      if (option.type.COMPONENT_NAME === 'CHOOSETITLE') {
        return (
          <ChooseTitle {...other} onClickBack={this.onClickBack} handleChoose={this.handleChoose} />
        );
      } else if (option.type.COMPONENT_NAME === 'GAMEPLAYMODULE') {
        return (
          <GamePlayModule
            {...other}
            handleItem={this.handleSiteItem}
            handleLayer={this.handleSiteLayer}
          />
        );
      }
    });
    return <div className={styles[`${prefixCls}-choose-site`]}>{childrens}</div>;
  }
}
HorseRaceChooseSite.defaultProps = {
  prefixCls: 'default',
  handleSiteLayer: () => {
    console.log('handleLayer');
    return 'handleLayer';
  },
  handleSiteItem: (item, siteKey) => {
    console.log(item, siteKey);
    return 'handleItem';
  },
  onClickBack: () => {
    console.log('onClickBack');
  },
  handleChooseSite: flg => {
    console.log('flg');
    return 'handleChooseSite';
  },
};
export default HorseRaceChooseSite;
