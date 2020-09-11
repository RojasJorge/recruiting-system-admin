import { useState } from 'react';
import { Select } from 'antd';

const Speciality = ({ value = {}, onChange, level }) => {
  const initialState = {
    id: 0,
    name: '',
  };
  const [values, setValues] = useState(initialState);

  const triggerChange = changedValue => {
    if (onChange) {
      onChange({
        ...value,
        ...values,
        ...changedValue,
      });
    }
  };
  const change = Speciality => {
    return (value = Speciality);
  };

  const ValueSpeciality = {
    id: values.id,
    name: values.name,
  };

  const SpecialityProps = {
    value: ValueSpeciality,
    onChange: change(Speciality),
  };

  const handlenChange = (e, type) => {
    const data = level.children.filter(c => c.id === e)[0];
    const objdata = {
      id: e,
      name: data.name,
    };
    setValues(objdata);

    triggerChange(objdata);
  };

  return (
    <Select showSearch onChange={e => handlenChange(e, 'id')}>
      {level && level.children
        ? level.children.map((e, idx) => (
            <Select.Option key={idx} value={e.id}>
              {e.name}
            </Select.Option>
          ))
        : null}
    </Select>
  );
};

export default Speciality;
