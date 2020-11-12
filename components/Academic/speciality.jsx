import { useState } from 'react';
import { Select } from 'antd';
import { isEmpty } from 'lodash';
const Speciality = ({ value = {}, onChange, level }) => {
  let initialState = {
    id: 0,
    name: '',
  };
  if (!_.isEmpty(value)) {
    initialState = value;
  }
  const [values, setValues] = useState(initialState);
  // console.log(value);
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
    <Select
      showSearch
      onChange={e => handlenChange(e, 'id')}
      value={values.name}
      optionFilterProp="label"
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      {level && level.children
        ? level.children.map((e, idx) =>
            e.status ? (
              <Select.Option key={idx} value={e.id}>
                {e.name}
              </Select.Option>
            ) : null,
          )
        : null}
    </Select>
  );
};

export default Speciality;
