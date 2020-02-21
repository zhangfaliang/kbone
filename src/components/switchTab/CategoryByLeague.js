import React from 'react';
import styles from './CategoryByLeague.less';
import { SwitchTabContext } from './SwitchTabContext';

const Row = ({ props }) => (
  <SwitchTabContext.Consumer>
    {({ handleSelectCategory }) => (
      <div
        className={styles['row']}
        onClick={e => {
          e.stopPropagation();
          handleSelectCategory({ value: props.groupName, groupType: props.groupType });
        }}
      >
        <div>{props.groupName}</div>
        <div>{props.preCount}</div>
      </div>
    )}
  </SwitchTabContext.Consumer>
);

const TitleRow = ({ title }) => (
  <div id={title.toLowerCase()} className={styles['title']}>
    {title}
  </div>
);

export class CategoryByLeague extends React.PureComponent {
  render() {
    return (
      <div className={styles['content-wrapper']}>
        {/* TODO:第一期不需要 Focus */}
        {/* <TitleRow title="Focus" />
        <div className={styles['rowWrapper']}>
          {this.props.focusCategories.map((item, index) => (
            <Row key={index} props={item} />
          ))}
        </div> */}

        {Object.keys(this.props.categoryList).map((key, index) => (
          <React.Fragment key={index}>
            <TitleRow title={key} />
            <div className={styles['rowWrapper']}>
              {this.props.categoryList[key].map((x, i) => (
                <Row key={i} props={x} />
              ))}
            </div>
          </React.Fragment>
        ))}

        <div className={styles['scrollSidebar']}>
          {Object.keys(this.props.categoryList).map(key => (
            <a href={`#${key.toLowerCase()}`} key={key}>
              {key}
            </a>
          ))}
        </div>
      </div>
    );
  }
}

CategoryByLeague.defaultProps = {
  categoryList: {},
  focusCategories: [],
};
