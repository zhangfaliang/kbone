import React, { Component } from 'react';
import SportType from '@/components/collection/sportType';
import OnTouch from '@/components/horseList/ontouch/index';
import styles from './index.less';
class Collection extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      checked: 0,
    };
  }
  componentDidMount() {}
  handleChecked = data => {
    const { sportType } = data;
    this.setState(
      {
        checked: sportType,
      },
      () => {
        this.props.handleChecked(data);
      }
    );
  };
  render() {
    const { data, keys, checked, idStr, numSrcoll } = this.props;
    const setStyle = data.length > 3;
    return (
      <div className={styles.container}>
        <OnTouch
          data={data}
          id={idStr}
          numSrcoll={numSrcoll}
          item={(value, index, clickStatus) => (
            <SportType
              data={value}
              checked={checked} //选中
              keys={keys}
              setStyle={setStyle}
              lastChild={index === data.length - 1}
              handleChecked={this.handleChecked} //
              clickStatus={clickStatus}
            />
          )}
        />
      </div>
    );
  }
}

export default Collection;
