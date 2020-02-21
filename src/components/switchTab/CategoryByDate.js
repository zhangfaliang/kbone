import React from 'react';
import styles from './CategoryByDate.less';
import { SwitchTabContext } from './SwitchTabContext';

const Row = ({ props }) => (
  <SwitchTabContext.Consumer>
    {({ handleSelectCategory }) => (
      <div
        className={styles['row']}
        onClick={e => {
          e.stopPropagation();
          handleSelectCategory({
            value: props.groupName,
            groupType: props.groupType,
            formatTitle: props.formatTitle,
          });
        }}
      >
        <div>{props.formatGroupName}</div>
        <div>{props.preCount}</div>
      </div>
    )}
  </SwitchTabContext.Consumer>
);

export class CategoryByDate extends React.PureComponent {
  render() {
    return (
      <div className={styles['content-wrapper']}>
        {this.props.categoryList.map((item, index) => (
          <Row key={index} props={item} />
        ))}
      </div>
    );
  }
}

CategoryByDate.defaultProps = {
  categoryList: [],
};
