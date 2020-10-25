import { useEffect, useState } from 'react';
import { Select } from 'antd';

const AreaJob = ({ value, onChange }) => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('career')));
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
      {data
        ? data
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((e, idx) => {
              if (e.parent === null || e.parent === '') {
                return (
                  <Select.Option key={idx} value={e.id}>
                    {e.name}
                  </Select.Option>
                );
              }
            })
        : null}
    </Select>
  );
};

export default AreaJob;
