import { useState, useEffect } from 'react';
import { InputNumber, Select } from 'antd';
import monedas from '../../data/monedas.json';

const Currency = ({ handlenChange }) => {
  const initialState = {
    code: '',
    name: '',
    symbol: '',
  };
  const [values, setValues] = useState(initialState);

  const onChange = (e, type) => {
    const data = monedas.filter(c => c.code === e)[0];
    setValues({ ...values, [type]: e, name: data.name, symbol: data.symbol });
  };

  useEffect(() => {
    handlenChange(values, 'currency');
  }, []);

  return (
    <span className="form-item--lg ant-form-item">
      <label>Moneda:</label>
      <Select showSearch onChange={e => onChange(e, 'code')}>
        {monedas
          ? monedas.map(b => (
              <Select.Option
                key={b.code}
                value={b.code}
              >{`${b.symbol_native} - ${b.name} (${b.code})`}</Select.Option>
            ))
          : null}
      </Select>
    </span>
  );
};

export default Currency;
