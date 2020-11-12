import { useState } from 'react';
import { Select } from 'antd';
import { useStoreState } from 'easy-peasy';

const AreaJob = ({ value, onChange }) => {
  const data = useStoreState(state => state.collections);
  const [val, setVal] = useState('');

  const triggerChange = e => {
    if (onChange) {
      onChange(e);
    }
  };
  const handlenChange = e => {
    setVal(e);
    triggerChange(e);
  };

  return (
    <Select
      onChange={e => handlenChange(e)}
      showSearch
      optionFilterProp="label"
      value={value}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      {data && data.career
        ? data.career
            .sort((a, b) => (a.order > b.order ? 1 : -1))
            .map((e, i) => (
              <Select.Option key={e.id + '-' + i} value={e.id}>
                {e.name}
              </Select.Option>
            ))
        : null}
    </Select>
  );
};

export default AreaJob;
