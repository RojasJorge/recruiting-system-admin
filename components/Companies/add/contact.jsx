import { useState } from 'react';
import { Input, InputNumber, Select } from 'antd';

const ContactInfo = ({ value = {}, onChange }) => {
  const initialState = {
    name: '',
    email: '',
    phone: '',
  };
  const [info, setinfo] = useState(initialState);

  const initialData = {
    departments: [],
    municipalities: [],
  };
  const [data, setData] = useState(initialData);

  const triggerChange = changedValue => {
    if (onChange) {
      onChange({
        ...info,
        ...value,
        ...changedValue,
      });
    }
  };
  const change = ContactInfo => {
    return (value = ContactInfo);
  };

  const infoValue = {
    name: info.name,
    email: info.email,
    phone: info.phone,
  };

  const ContactInfoProps = {
    value: infoValue,
    onChange: change(ContactInfo),
  };

  const handlenChange = (e, type) => {
    setinfo({ ...info, [type]: e });
    triggerChange({ [type]: e });
  };

  return (
    <div className="umana-form--group" style={{ paddingBottom: 0 }}>
      <span className="form-item--md ant-form-item">
        <label>Nombre:</label>
        <Input onChange={e => handlenChange(e.target.value, 'name')} />
      </span>
      <span className="form-item--md ant-form-item">
        <label>Teléfono:</label>
        <Input onChange={e => handlenChange(e.target.value, 'phone')} />
      </span>
      <span className="form-item--lg ant-form-item">
        <label>Correo Electrónico:</label>
        <Input onChange={e => handlenChange(e.target.value, 'email')} />
      </span>
    </div>
  );
};

export default ContactInfo;
