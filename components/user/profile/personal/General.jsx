import { DatePicker, Form, InputNumber, Select } from 'antd';
import religion from '../../../../data/religion.json';
import moment from 'moment';
import { useStoreActions } from 'easy-peasy';

const { Item } = Form;
const { Option } = Select;

const nationality = [
  {
    code: 'gt',
    title: 'Guatemala',
    nicename: 'Guatemalteco',
  },
  {
    code: 'co',
    title: 'Colombia',
    nicename: 'Colombiano',
  },
  {
    code: 've',
    title: 'Venezuela',
    nicename: 'Venezolano',
  },
];

const gender = [
  {
    title: 'Masculino',
    slug: 'male',
  },
  {
    title: 'Femenino',
    slug: 'female',
  },
];

const General = ({ birthday, setBirthday }) => {
  /** Date handler */
  const dateHandler = d => setBirthday(d);

  const disabledDate = current => {
    return current && current > moment().subtract(18, 'years');
  };

  /** Calculate age */
  const calculateAge = useStoreActions(actions => actions.tools.calculateAge)

  const dateFormat = 'DD/MM/YYYY';

  return (
    <div className="umana-form--section">
      <h2 style={{ width: '100%' }}>Información general</h2>
      <Item
        name="nationality"
        label="Nacionalidad"
        className="form-item--sm"
        rules={[{ required: true, message: 'El campo Nacionalidad es requerido.' }]}
      >
        <Select name="nationality" size="large" style={{ width: '100%' }}>
          {nationality.map((o, i) => (
            <Option key={i} value={o.code}>
              {o.nicename} (a)
            </Option>
          ))}
        </Select>
      </Item>

      <Item
        label={`* Fecha de nacimiento`}
        rules={[{ required: true, message: 'Debes específicar tu fecha de nacimiento.' }]}
        className="form-item--sm"
      >
        <DatePicker
          size="large"
          style={{ width: '100%' }}
          onChange={dateHandler}
          defaultValue={moment(
            moment(birthday || moment().subtract(18, 'years')).format('DD/MM/YYYY'),
            dateFormat,
          )}
          format={dateFormat}
          disabledDate={disabledDate}
        />
        <p className="note">Debes ser mayor de 18 años</p>
      </Item>

      <Item
        label="Edad"
        rules={[{ required: true, message: 'El campo Edad es requerido.' }]}
        className="form-item--sm"
      >
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          size="large"
          value={calculateAge(birthday)}
          disabled
        />
      </Item>

      <Item
        label="Sexo"
        name="gender"
        rules={[{ required: true, message: 'El campo Sexo es requerido.' }]}
        className="form-item--sm"
      >
        <Select name="gender" size="large" placeholder="Seleccione" style={{ width: '100%' }}>
          {gender.map((o, i) => (
            <Option key={i} value={o.slug}>
              {o.title}
            </Option>
          ))}
        </Select>
      </Item>
      <Item
        label="Religión"
        name="religion"
        rules={[{ required: true, message: 'El campo Religión es requerido.' }]}
        className="form-item--sm"
      >
        <Select name="religion" size="large" placeholder="Seleccione" style={{ width: '100%' }}>
          {religion.map((o, i) => (
            <Option key={i} value={o}>
              {o}
            </Option>
          ))}
        </Select>
      </Item>

      <Item
        className="form-item--sm"
        label="Estado civíl"
        name="maritalStatus"
        rules={[{ required: true, message: 'El campo Estado civil es requerido.' }]}
      >
        <Select size="large" placeholder="Seleccione" style={{ width: '100%' }}>
          <Option value="single">Soltero (a)</Option>
          <Option value="married">Casado (a)</Option>
        </Select>
      </Item>

      <Item
        className="form-item--sm"
        label="Hijos"
        name="children"
        rules={[{ required: true, message: 'El campo Hijos es requerido.' }]}
      >
        <InputNumber min={0} max={20} placeholder="0" style={{ width: '100%' }} size="large" />
      </Item>
    </div>
  );
};

export default General;
