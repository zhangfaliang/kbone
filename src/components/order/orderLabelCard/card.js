import React, { Component } from 'react';

class Card extends Component {
  render() {
    const { onClick, itemIsVerticalCenter } = this.props;
    const children = React.Children.toArray(this.props.children);
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        itemIsVerticalCenter,
      })
    );
    return childrenWithProps.map((v, k) => {
      return (
        <div onClick={onClick} key={k}>
          {v}
        </div>
      );
    });
  }
}

export default Card;
