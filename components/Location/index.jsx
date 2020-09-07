import { useState } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import countries from '../../data/countries.json';

const { Option } = Select;

const Locations = props => {
  const initialState = {
    country: '',
    department: '',
    city: '',
  };
  const [location, setLocation] = useState(initialState);

  const initialData = {
    departments: [],
    municipalities: [],
  };
  const [data, setData] = useState(initialData);

  const handlenChange = (e, type) => {
    if (type === 'country') {
      const dp = countries.find(c => c.id === e);
      setData({ ...data, departments: dp.departments, municipalities: [] });
      setLocation({ ...location, [type]: e, department: '', city: '' });
    }
    if (type === 'department') {
      const mn = data.departments.find(d => d.department === e);
      setData({ ...data, municipalities: mn ? mn.municipalities : [] });
      setLocation({ ...location, [type]: e, city: '' });
    }
    if (type === 'city') {
      setLocation({ ...location, [type]: e });
    }
  };

  return (
    <div className="umana-form--group">
      {props.title ? <h2 style={{ width: '100%' }}>{props.title}</h2> : null}
      {props.subtitle ? (
        <h4 style={{ width: '100%', paddingLeft: 10, color: '#666', marginBottom: 10 }}>
          {props.subtitle}
        </h4>
      ) : null}
      <br />
      <Form.Item
        label="País"
        name="country"
        rules={[
          {
            required: true,
            message: 'El país es requerido.',
          },
        ]}
      >
        <Select showSearch onChange={e => handlenChange(e, 'country')} value={location.country}>
          {countries.map((c, idx) => (
            <Option key={c.id} value={c.id}>
              {c.country}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Departamento"
        name="department"
        rules={[
          {
            required: true,
            message: 'El departamento es requerido.',
          },
        ]}
      >
        <Select
          showSearch
          onChange={e => handlenChange(e, 'department')}
          value={location.department}
          disabled={!location.country ? true : false}
        >
          {data.departments
            ? data.departments.map((d, idx) => (
                <Option key={d.department} value={d.department}>
                  {d.department}
                </Option>
              ))
            : null}
        </Select>
      </Form.Item>
      <Form.Item
        label="Municipio"
        name="city"
        rules={[
          {
            required: true,
            message: 'El municipio es requerido.',
          },
        ]}
      >
        <Select
          showSearch
          onChange={e => handlenChange(e, 'city')}
          value={location.city}
          allowClear={true}
          disabled={!location.country ? true : !location.department ? true : false}
        >
          {data.municipalities
            ? data.municipalities.map((c, idx) => (
                <Option key={idx} value={c}>
                  {c}
                </Option>
              ))
            : null}
        </Select>
      </Form.Item>
      <Form.Item
        className="form-item--sm"
        label="Zona"
        name="zone"
        rules={[
          {
            required: true,
            message: 'La zona es requerida.',
          },
        ]}
      >
        <InputNumber max={25} min={1} />
      </Form.Item>
      <Form.Item
        className="form-item--fx"
        label="Dirección"
        name="address"
        rules={[
          {
            required: true,
            message: 'La dirección es requerida.',
          },
        ]}
      >
        <Input />
      </Form.Item>
    </div>
  );
};

export default Locations;
