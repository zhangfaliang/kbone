import React from 'react';
import { formatMessage } from 'umi/locale';
// import { Select as AntDefaultSelect } from 'antd';
import AntDefaultSelect from 'antd/lib/select';
import Modal from 'antd-mobile/lib/modal/index';
import List from 'antd-mobile/lib/list/index';
import { RadioGroup, Radio } from '../radio/index';

import 'antd/lib/select/style/index.css';
import 'antd-mobile/lib/modal/style/index.css';
import 'antd-mobile/lib/list/style/index.css';
import styles from './index.less';

class Select extends React.Component {
  state = {
    modal: false,
  };
  handleChange = e => {
    const value = e.target.value;
    const { options } = this.props;
    this.setState({
      selected: {
        value: value,
        label: options.find(item => item.value === value).label,
      },
    });
  };

  handleFocus = () => {
    this.showModal('modal');
  };

  showModal = key => e => {
    e && e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  };

  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  };

  render() {
    const { showSearch, placeholder, options, ...res } = this.props;
    const { selected } = this.state;
    return [
      <AntDefaultSelect
        key="AntDefaultSelect"
        dropdownStyle={{
          display: 'none',
          opacity: 0,
        }}
        className={styles.default}
        showSearch={showSearch}
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={this.handleChange}
        onFocus={this.showModal('modal')}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        value={
          <span>
            <span>{placeholder}</span>
            <span className={styles.selected}>{selected && selected.label}</span>
          </span>
        }
        {...res}
      />,
      <Modal
        key="Modal"
        popup
        visible={this.state.modal}
        onClose={this.onClose('modal')}
        animationType="slide-up"
        wrapClassName="select-modal"
      >
        <List
          renderHeader={() => (
            <div>{`${formatMessage({ id: 'Select.choose' })} ${placeholder}`}</div>
          )}
          className="popup-list"
        >
          <RadioGroup name="select" onChange={this.handleChange} value={selected && selected.value}>
            {options.map(item => (
              <Radio vertical={!!1} key={item.value} value={item.value} style={{ color: '#fff' }}>
                {item.label}
              </Radio>
            ))}
          </RadioGroup>
          <List.Item onClick={this.onClose('modal')}>
            {formatMessage({ id: 'Select.close' })}
          </List.Item>
        </List>
      </Modal>,
    ];
  }
}

Select.defaultProps = {
  placeholder: 'ID Type',
  options: [
    {
      label: 'ID card',
      value: 1,
    },
    {
      label: 'Passport',
      value: 2,
    },
    {
      label: 'Driver License',
      value: 3,
    },
    {
      label: 'International bank card account',
      value: 4,
    },
  ],
};

export { Select as default };
