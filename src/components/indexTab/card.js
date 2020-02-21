import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import basketball_tab from '../../assets/game/index/basketball-tab.png';

class Card extends Component {
  static COMPONENT_NAME = 'CARD';
  render() {
    const { cardId, text, matchCount, className, backgroundImg, handleCard } = this.props;
    const cardCls = classnames(
      {
        [styles.card]: true,
      },
      className
    );
    return (
      <div
        onClick={() => {
          handleCard(cardId);
        }}
        style={{ backgroundImage: `url(${backgroundImg})` }}
        className={cardCls}
      >
        <span className={styles.text}>{text}</span>
        <span className={styles.count}>{matchCount}</span>
      </div>
    );
  }
}
Card.defaultProps = {
  text: '篮球',
  matchCount: 2,
  backgroundImg: basketball_tab,
  handleCard: () => {},
  cardId: '',
};

export default Card;
