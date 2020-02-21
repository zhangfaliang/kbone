import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import Card from './card';

class LabelCard extends Component {
  static Card = Card;
  static defaultProps = {
    label: 'Label',
  };

  render() {
    const { label, padding } = this.props;
    const children = React.Children.toArray(this.props.children);
    const wrapCls = classnames({
      [styles.padding]: padding,
      [styles.wrap]: true,
    });
    return (
      <div className={wrapCls}>
        {/* <div className={styles.label}>{label}</div> */}
        {children.map((v, k) => {
          return (
            <div className={styles.body} key={k}>
              {v}
            </div>
          );
        })}
      </div>
    );
  }
}

export default LabelCard;
