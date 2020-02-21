import React, { Component } from 'react';
import styles from './index.less';
import { createForm } from 'rc-form';

class Form extends Component {
  static create = () => WrappedComponent => {
    class Node extends Component {
      render() {
        return (
          <>
            <WrappedComponent {...this.props} />
          </>
        );
      }
    }
    return createForm()(Node);
  };

  render() {
    const { label, renderOther, className } = this.props;
    return (
      <div className={styles.wrap}>
        {label && <div className={styles.label}>{label}</div>}
        {renderOther}
        <div className={className}>{this.props.children}</div>
      </div>
    );
  }
}

export default Form;
