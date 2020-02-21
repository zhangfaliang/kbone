import React, { Component } from 'react';
import styles from './index.less';
class Containers extends Component {
  constructor(props) {
    super(props);
    this.divNode = React.createRef();
    this.state = {
      height: window.screen.availHeight,
      defaultValue: false,
    };
  }
  componentDidMount() {
    if (this.divNode.current.offsetHeight < this.state.height) {
      this.setHeight();
    }
  }
  setHeight = value => {
    this.setState(state => {
      return {
        height: state.height + 70,
        defaultValue: true,
      };
    });
  };
  render() {
    const { defaultValue, height } = this.state;
    return (
      <div
        className={styles.containers}
        ref={this.divNode}
        style={defaultValue ? { height: 'auto', minHeight: height } : {}}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Containers;
