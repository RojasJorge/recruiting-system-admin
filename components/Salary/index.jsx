import { useState } from 'react';
import { InputNumber, Select } from 'antd';
import { isEmpty } from 'lodash';
import monedas from '../../data/monedas.json';

const Salary = ({ value = {}, onChange }) => {
  let initialState = {
    currency: { code: '' },
    base_min: 0,
    base_max: 0,
    commission_min: 0,
    commission_max: 0,
  };

  if (!_.isEmpty(value)) {
    initialState = {
      currency: value.currency,
      base_min: value.base_min,
      base_max: value.base_max,
      commission_min: value.commission_min,
      commission_max: value.commission_max,
    };
  }
  const [values, setValues] = useState(initialState);
  const [salary, setSalary] = useState({ salary_min: 0, salary_max: 0 });

  const triggerChange = changedValue => {
    if (onChange) {
      onChange({
        ...value,
        ...values,
        ...salary,
        ...changedValue,
      });
    }
  };
  const change = Salary => {
    return (value = Salary);
  };

  const ValueSalary = {
    currency: values.currency,
    base_min: values.base_min,
    base_max: values.base_max,
    commission_min: values.commission_min,
    commission_max: values.commission_max,
    salary_min: salary.salary_min,
    salary_max: salary.salary_max,
  };

  const SalaryProps = {
    value: ValueSalary,
    onChange: change(Salary),
  };

  const handlenChange = (e, type) => {
    switch (type) {
      case 'base_min':
        console.log(e + values.commission_min);
        setSalary({
          ...salary,
          salary_min: e + values.commission_min,
        });

        break;
      case 'base_max':
        setSalary({
          ...salary,
          salary_min: e + values.commission_max,
        });
      case 'commission_min':
        setSalary({
          ...salary,
          salary_min: e + values.base_min,
        });
      case 'commission_max':
        setSalary({
          ...salary,
          salary_min: e + values.base_max,
        });

        break;
      default:
        break;
    }
    setValues({ ...values, [type]: e });
    triggerChange({ [type]: e });
  };

  const hajndleCurrency = (e, type) => {
    const data = monedas.filter(c => c.code === e)[0];
    const objdata = {
      code: e,
      name: data.name,
      symbol: data.symbol,
    };
    setValues({ ...values, [type]: objdata });
    triggerChange({ [type]: objdata });
  };

  return (
    <div className="umana-form--group" style={{ paddingBottom: 0 }}>
      <span className="form-item--lg ant-form-item">
        <label>Moneda:</label>
        <Select showSearch onChange={e => hajndleCurrency(e, 'currency')} value={values.currency.code}>
          {monedas ? monedas.map(b => <Select.Option key={b.code} value={b.code}>{`${b.symbol_native} - ${b.name} (${b.code})`}</Select.Option>) : null}
        </Select>
      </span>
      <span className="form-item--md ant-form-item">
        <label>Salario mínimo:</label>
        <InputNumber name="base_min" onChange={e => handlenChange(e, 'base_min')} value={values.base_min} min={0} />
      </span>
      <span className="form-item--md ant-form-item">
        <label>Salario máximo:</label>
        <InputNumber onChange={e => handlenChange(e, 'base_max')} value={values.base_max} min={0} />
      </span>
      <span className="form-item--md ant-form-item">
        <label>Comisión mínimo:</label>
        <InputNumber onChange={e => handlenChange(e, 'commission_min')} value={values.commission_min} min={0} />
      </span>
      <span className="form-item--md ant-form-item">
        <label>Comisión máximo:</label>
        <InputNumber onChange={e => handlenChange(e, 'commission_max')} value={values.commission_max} min={0} />
      </span>
      <span className="form-item--md ant-form-item">
        <label>Salario mínimo:</label>
        <InputNumber value={values.base_min + values.commission_min} min={0} disabled={true} />
      </span>
      <span className="form-item--md ant-form-item">
        <label>Salario máximo:</label>
        <InputNumber value={values.base_max + values.commission_max} min={0} disabled={true} />
      </span>
    </div>
  );
};

export default Salary;
