import { useState } from 'react';
import { Input, InputNumber, Select } from 'antd';

const { Option } = Select;

const Salary = ({ value = {}, onChange }) => {
  const initVal =
    Object.keys(value).length > 0
      ? value
      : {
          currency: '',
          baseMin: 0,
          baseMax: 0,
        };

  const [values, setValues] = useState(initVal);

  const triggerOnChange = val => {
    if (onChange) {
      onChange({
        ...values,
        ...val,
      });
    }
  };

  const handleChange = (e, type) => {
    setValues({
      ...values,
      [type]: e,
    });

    triggerOnChange({
      [type]: e,
    });
  };

  return (
    <div className="umana-form--group" style={{ paddingBottom: 0 }}>
      <div className="form-item--sm">
        <label htmlFor="currency">Moneda</label>
        <Select onChange={e => handleChange(e, 'currency')} value={values.currency} size="large">
          <Option value="GTQ">Quetzal</Option>
          <Option value="USD">Dólar</Option>
        </Select>
      </div>
      <div className="form-item--sm">
        <label htmlFor="baseMin">Mínimo deseado</label>
        <InputNumber
          onChange={e => handleChange(e, 'baseMin')}
          value={values.baseMin}
          min={0}
          size="large"
        />
      </div>
      <div className="form-item--sm">
        <label htmlFor="baseMax">Máximo deseado</label>
        <InputNumber
          onChange={e => handleChange(e, 'baseMax')}
          value={values.baseMax}
          min={0}
          size="large"
        />
      </div>
    </div>
  );
};

export default Salary;
