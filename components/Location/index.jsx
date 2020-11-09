import { useState } from 'react';
import { Input, InputNumber, Select } from 'antd';
import countries from '../../data/countries.json';
import { isEmpty } from 'lodash';

const { Option } = Select;

const Locations = ({ value = {}, onChange }) => {
  let initialState = {
    country: '',
    province: '',
    city: '',
    zone: 0,
    address: '',
  };

  if (!_.isEmpty(value)) {
    initialState = value;
  }
  const [location, setLocation] = useState(initialState);

  const initialData = {
    departments: [],
    municipalities: [],
  };
  const [data, setData] = useState(initialData);

  const triggerChange = changedValue => {
    if (onChange) {
      onChange({
        ...location,
        ...value,
        ...changedValue,
      });
    }
  };
  const change = Locations => {
    return (value = Locations);
  };

  const LocationValue = {
    country: location.country,
    province: location.province,
    city: location.city,
    zone: location.zone,
    address: location.address,
  };

  const LocationsProps = {
    value: LocationValue,
    onChange: change(Locations),
  };

  const handlenChange = (e, type) => {
    if (type === 'country') {
      const dp = countries.find(c => c.country === e);
      setData({ ...data, province: dp.departments, municipalities: [] });
      setLocation({ ...location, [type]: e, province: '', city: '' });
    }
    if (type === 'province') {
      const mn = data.province.find(d => d.department === e);
      setData({ ...data, municipalities: mn ? mn.municipalities : [] });
      setLocation({ ...location, [type]: e, city: '' });
    }
    if (type === 'city') {
      setLocation({ ...location, [type]: e });
    }
    if (type === 'zone') {
      setLocation({ ...location, [type]: e });
    }
    if (type === 'address') {
      setLocation({ ...location, [type]: e });
    }
    triggerChange({ [type]: e });
  };

  return (
    <div className="umana-form--group" style={{ paddingBottom: 0 }}>
      <span className="form-item--sm ant-form-item">
        <label>
          <span className="required">*</span>País:
        </label>
        <Select showSearch onChange={e => handlenChange(e, 'country')} value={location.country}>
          {countries.map((c, idx) => (
            <Select.Option key={c.id} value={c.country}>
              {c.country}
            </Select.Option>
          ))}
        </Select>
      </span>
      <span className="form-item--sm ant-form-item">
        <label>
          <span className="required">*</span>Departamento:
        </label>
        <Select showSearch onChange={e => handlenChange(e, 'province')} value={location.province} disabled={!location.country ? true : false}>
          {data.province
            ? data.province.map((d, idx) => (
                <Select.Option key={d.department} value={d.department}>
                  {d.department}
                </Select.Option>
              ))
            : null}
        </Select>
      </span>
      <span className="form-item--sm ant-form-item">
        <label>
          <span className="required">*</span>
          Ciudad:
        </label>
        <Select showSearch onChange={e => handlenChange(e, 'city')} value={location.city} allowClear={true} disabled={!location.country ? true : !location.province ? true : false}>
          {data.municipalities
            ? data.municipalities.map((c, idx) => (
                <Select.Option key={idx} value={c}>
                  {c}
                </Select.Option>
              ))
            : null}
        </Select>
      </span>
      <span className="form-item--sm ant-form-item">
        <label>Zona:</label>
        <InputNumber max={25} min={1} onChange={e => handlenChange(e, 'zone')} value={location.zone} />
      </span>
      <span className="form-item--md ant-form-item">
        <label>
          <span className="required">*</span>Dirección:
        </label>
        <Input onChange={e => handlenChange(e.target.value, 'address')} value={location.address} />
      </span>
    </div>
  );
};

export default Locations;
