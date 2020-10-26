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
      {data && data.career ? (
        data.career.map(e =>
          e.children ? (
            <Select.OptGroup key={e.id} label={e.name}>
              {e.children
                ? e.children.map((c, i) => (
                    <Select.Option key={c.id + '-' + i} value={c.id}>
                      {c.name}
                    </Select.Option>
                  ))
                : null}
            </Select.OptGroup>
          ) : null,
        )
      ) : (
        <Option>No data</Option>
      )}
    </Select>
  );
};

export default AreaJob;
